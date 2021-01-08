import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable';
import { switchMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of, TimeoutError } from 'rxjs';
import 'antd/dist/antd.less';
// import './styles/style.scss';
import Foo from './Foo';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Pro from './Pro';
import { Test } from "./Test";
import { Heap, Stack } from './origin';
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only'
        },
        watchQuery: {
            fetchPolicy: 'network-only'
        }
    },
    cache: new InMemoryCache()
});

export { client }

export interface AppState {
    name: string
    age: number
    table: any[]
}

const tableReducer = (state: any[] = [], action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'table_success': return action.payload;
        case 'reset': return [];
        case 'remove': return state;
        default:
            return state;
    }
};

const tableEpic: Epic = action$ => action$.ofType('table_start').pipe(
    switchMap(action =>
        ajax.getJSON('/list.json').pipe(
            map((rs: any) => ({ type: 'table_success', payload: rs })),
            catchError(e => of({ type: 'error', payload: e }))
        ),
    )
)

const nameReducer = (state: string = '', action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'remove': return state + 'remove';
        default:
            return state;
    }
};

const rootEpic = combineEpics(tableEpic);
const rootReducer = combineReducers({ table: tableReducer, name: nameReducer });

const epicMiddleware = createEpicMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

let source = `
<div>
    <a><span class="mtextnodeclass"> 我是一个textnode </span></a>
    <button>click</button>
    <button/>
</div>
`
function parseTag(source: string) {
    const iterator = source[Symbol.iterator]();
    let theChar = iterator.next();
    let tagParseStack = new Stack([]);
    let tagNameArray = [];
    let tagName = '';
    while (!theChar.done) {
        let value: string = theChar.value;
        if (value === '<') {
            tagName = tagName + value;
            tagParseStack.push(value);
        } else if (value === '>') {
            let start = tagParseStack.pop();
            if (start === '<') {
                tagName = tagName + value;
                tagNameArray.push(tagName);
                tagName = '';
            } else {
                throw `没有正确的开始标签${start}`;
            }
        }

        else {
            tagName = tagName + value;
        }
        theChar = iterator.next();

    }
    return tagNameArray;
}

let tagNameArray = parseTag(source);
console.log(tagNameArray);

interface Node {
    tag?: string
    children: Node[]
    textNode?: string
    parent?: Node
    props?: any
    type?: 'start' | 'end' | 'single'
}

/**
 * 如何判断是否有父标签？按照栈的结构，如果有父标签，那么栈不为空
 * @param tagNameArray 
 */
function parseTagNameArray(tagNameArray: string[]) {
    let stack = new Stack<Node>([]);
    for (const item of tagNameArray) {
        if (stack.isEmpty()) {
            let node = parseTagText(item);
            if (node.type === "start") {
                stack.push(node);
            } else {
                throw 'boom!';
            }

        } else {
            let node = parseTagText(item);
            if (node.type === 'end') {
                let startNode = stack.pop();
                let startTag = startNode.tag;
                let endTag = node.tag;
                if (startTag === endTag) {
                    startNode.textNode = node.textNode;
                    if (stack.isEmpty()) {
                        return startNode;
                    } else {

                    }
                } else {
                    throw 'boom!';
                }

            } else if (node.type === 'start') {//如果栈不为空,那么有父标签
                node.parent = stack.top;
                stack.top.children.push(node);
                stack.push(node);
            } else if (node.type === 'single') {
                node.parent = stack.top;
                stack.top.children.push(node);
            } else {
                throw 'boom!';
            }
        }
    }
}

let tree = parseTagNameArray(tagNameArray);

console.log(tree);

let s = getCode(tree);
console.log(s);

function parseTagNameArray2(tagNameArray: string[], stack: Stack<Node>) {
    if (tagNameArray.length === 0) {
        return stack;
    } else {
        let tag = tagNameArray.shift();
        if (tag.startsWith('/')) {
            let node = stack.pop();
            if (tag.substring(1, tag.length) === node.tag) {
                if (stack.isEmpty()) {
                    return node;
                } else {
                    return parseTagNameArray2(tagNameArray, stack);
                }
            } else {
                throw 'boom!';
            }

        } else {
            if (stack.isEmpty()) {
                let node: Node = { tag, children: [] };
                stack.push(node);
                return parseTagNameArray2(tagNameArray, stack);
            } else {
                let node: Node = { tag, children: [], parent: stack.top };
                stack.top.children.push(node);
                stack.push(node);
                return parseTagNameArray2(tagNameArray, stack);
            }
        }
    }
}

// let tree2 = parseTagNameArray2(tagNameArray, new Stack<Node>([]));

// console.log(tree2);

function parseTagText(text: string) {
    let trimedText = text.trim();
    if (isStartTag(trimedText)) {
        let node: Node = parseStartTag(trimedText);
        let props = parseProps(trimedText);
        node.props = props;
        return node;
    } else if (isSingleTag(trimedText)) {
        let node: Node = parseSingleTag(trimedText);
        let props = parseProps(trimedText);
        node.props = props;
        return node;
    } else if (isEndTag(trimedText)) { //暂时是结束标签
        let node: Node = parseEndTag(trimedText);
        let textNode = parseTextNode(trimedText);
        if (textNode) {
            node.textNode = textNode;
            return node;
        } else {
            return node;
        }
    } else {
        throw trimedText;
    }
}

/**
 * `<div>`
 * `<div class="foo" data-name="someone">`
 * `<div 
 * class="foo" 
 * data-name="someone"
 * >`
 * 
 * @param text 
 */
function parseStartTag(text: string): Node {
    let tag = '';
    for (const char of text) {
        if (char === '<') {

        } else if (isSplitSymbol(char)) {
            if (tag) {
                return {
                    tag,
                    children: [],
                    type: 'start'
                };
            }
        } else if (char === '>') {
            if (tag) {
                return {
                    tag,
                    children: [],
                    type: 'start'
                };
            }
        } else {
            tag = tag + char;
        }
    }
}

function isStartTag(text: string) {
    if (isTag(text)) {
        if (text.endsWith('/>')) {
            return false;
        } else if (text.startsWith('</')) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }

}

function isTag(text: string) {
    if (text.startsWith('<')) {
        if (text.endsWith('>')) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * `<div/>`
 * `<div
 * class="foo"
 * />`
 * `<div class="foo" />`
 * @param text 
 */
function isSingleTag(text: string) {
    if (isTag(text)) {
        if (text.endsWith('/>')) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * `<div/>`
 * `<div
 * class="foo"
 * />`
 * `<div class="foo" />`
 * @param text 
 */
function parseSingleTag(text: string): Node {
    let tag = '';
    for (const char of text) {
        if (char === '<') {

        } else if (isSplitSymbol(char)) {
            if (tag) {
                return {
                    tag,
                    children: [],
                    type: 'single'
                }
            }
        } else if (char === '/') {
            if (tag) {
                return {
                    tag,
                    children: [],
                    type: 'single'
                }
            }
        } else {
            tag = tag + char;
        }
    }
}

/**
 * `ffff</div>`
 * `ffff </div>`
 * `fff
 * </div>
 * `
 * `</div>`
 * @param text 
 */
function isEndTag(text: string) {
    if (text.includes('</')) {
        if (isTag(text)) {
            if (text.startsWith('</')) {
                return true;
            } else {
                return false;
            }
        } else {
            let array = text.split('</');
            let tagText = array[1];
            tagText = '</' + tagText;
            if (isEndTag(tagText)) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }

}

/**
 * `ffff</div>`
 * `ffff </div>`
 * `fff
 * </div>
 * `
 * `</div>`
 * @param text 
 */
function parseEndTag(text: string): Node {
    if (text.startsWith('</')) {
        let tag = text.replace('</', '').replace('>', '');
        if (tag) {
            return {
                tag,
                children: [],
                type: 'end'
            }
        } else {
            throw 'null tag!';
        }
    } else {
        let array = text.split('</');
        let tagText = array[1];
        tagText = '</' + tagText;
        return parseEndTag(tagText);
    }
}

function parseTextNode(text: string) {
    let array = text.split('</');
    let content = array[0].trim();
    return content;
}

function isSplitSymbol(char: string) {
    /**
     * 匹配一个空白字符，包括空格、制表符、换页符和换行符。等价于[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]。
     */
    if (char.match(/\s/)) {
        return true;
    } else {
        return false;
    }
}

function parseProps(text: string) {
    let propTextArray = parsePropsArray(text);
    let props = parsePropTextArray(propTextArray);
    return props;
}


/**
 * `<input type="text" class="foo"/>`
 * `<input type='text'/>`
 * `<div class="ffoo">`
 * `<div
 * class="foo"
 * >`
 * @param text 
 */
function parsePropsArray(text: string) {
    let propText = '';
    let splitStack = new Stack([]);
    let propTextArray = [];
    for (const char of text) {
        if (splitStack.isEmpty()) {
            if (isSplitSymbol(char)) {
                splitStack.push(char);
            } else {

            }
        } else {
            if (char === '/') {
                splitStack.pop();
                propTextArray.push(propText);
                propText = '';
            } else if (char === '>') {
                splitStack.pop();
                propTextArray.push(propText);
                propText = '';
            } else if (isSplitSymbol(char)) {
                splitStack.pop();
                propTextArray.push(propText);
                propText = '';
            } else if (char === '<') {

            } else {
                propText = propText + char;
            }
        }
    }

    return propTextArray;
}

function parsePropTextArray(propTextArray: string[]) {
    if (propTextArray.length > 0) {
        let props = {};
        for (const propText of propTextArray) {
            let array = propText.split('=');
            props[array[0]] = array[1];
        }
        return props;
    } else {
        return null;
    }

}

function getCode(node: Node) {
    let tag = node.tag;
    let propsCode = getPropsCode(node.props);
    let children = node.children;
    if (children.length > 0) {
        let cNodes = children.map(node => getCode(node)).join();
        return `React.createElement('${tag}',${propsCode},${cNodes})`;
    } else if (children.length === 0) {
        if (node.textNode) {
            return `React.createElement('${tag}',${propsCode},'${node.textNode}')`;
        } else {
            return `React.createElement('${tag}',${propsCode})`;
        }
    }
}

function getPropsCode(props: any) {
    if (props) {
        let keys = Object.keys(props);
        let code = '{';
        keys.forEach((key, index) => {
            code = code + `${key}:'${props[key]}'`;
            if (index === keys.length - 1) {
                code = code + '}';
            } else {
                code = code + ',';
            }
        });
        return code;
    } else {
        return null;
    }
}

// // let tree =  <Test>1<div></div><div></div></Test>;
ReactDOM.render(<
    Provider store={store}>
    <ApolloProvider client={client}>
        <Foo />
    </ApolloProvider>
</Provider>, document.getElementById('root'));
if (module.hot) {
    module.hot.accept('./Foo', function () {
        // ReactDOM.render(<Test>1<div></div><div></div></Test>, document.getElementById('root'));

        ReactDOM.render(<
            Provider store={store}>
            <ApolloProvider client={client}>
                <Foo />
            </ApolloProvider>
        </Provider>, document.getElementById('root'));
    })
}


const heap = new Heap<number>([], (a, b) => {
    return a > b;
});

heap.insert(5);
console.log(heap.peek() === 5)
heap.insert(1);
console.log(heap.peek() === 5)
heap.insert(2);
console.log(heap.peek() === 5)
heap.insert(10);
console.log(heap.peek() === 10)
heap.insert(3);
console.log(heap.peek() === 10)
heap.remove();
console.log(heap.peek() === 5)
heap.insert(5)
heap.insert(99)
console.log(heap.queue)
