import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable';
import { switchMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from 'rxjs';
import 'antd/dist/antd.less';
// import './styles/style.scss';
import Foo from './Foo';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Pro from './Pro';
import { Test } from "./Test";
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
class Stack<T = any> {
    constructor(private array: T[]) {

    }

    get length() {
        return this.array.length;
    }

    isEmpty() {
        return this.array.length === 0;
    }
    push(item: T) {
        return this.array.push(item);
    }
    pop() {
        return this.array.pop();
    }
    get top() {
        return this.array[this.array.length - 1];
    }
}
let source = `
<div>
    <a><span></span></a>
    <button></button>
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
            tagParseStack.push(value);
        } else if (value === '>') {
            let start = tagParseStack.pop();
            if (start === '<') {
                tagNameArray.push(tagName);
                tagName = '';
            } else {
                throw `没有正确的开始标签${start}`;
            }
        } else if (value.match(/\r/)) {

        } else if (value.match(/\n/)) {

        } else if (value.match(/\s/)) {

        } else {
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
    parent?: Node
}

/**
 * 如何判断是否有父标签？按照栈的结构，如果有父标签，那么栈不为空
 * @param tagNameArray 
 */
function parseTagNameArray(tagNameArray: string[]) {
    let stack = new Stack<Node>([]);
    for (const item of tagNameArray) {
        if (stack.isEmpty()) {
            let node = { tag: item, children: [] };
            stack.push(node);
        } else {
            if (item.startsWith('/')) {
                let node = stack.pop();
                let startTag = node.tag;
                let tag = item.substring(1, item.length);
                if (startTag === tag) {
                    if (stack.isEmpty()) {
                        return node;
                    } else {
                        
                    }
                } else {
                    throw 'boom!';
                }

            } else {//如果栈不为空,那么有父标签
                let node: Node = { children: [], tag: item, parent: stack.top };
                stack.top.children.push(node);
                stack.push(node);
            }
        }
    }
}

let tree = parseTagNameArray(tagNameArray);

console.log(tree);

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

let tree2 = parseTagNameArray2(tagNameArray, new Stack<Node>([]));

console.log(tree2);


// // let tree =  <Test>1<div></div><div></div></Test>;
ReactDOM.render(<
    Provider store={store}>
    <ApolloProvider client={client}>
        <Foo />
    </ApolloProvider>
</Provider>, document.getElementById('root'));
if (module.hot) {
    module.hot.accept('./Foo', function() {
        // ReactDOM.render(<Test>1<div></div><div></div></Test>, document.getElementById('root'));

        ReactDOM.render(<
            Provider store={store}>
            <ApolloProvider client={client}>
                <Foo />
            </ApolloProvider>
        </Provider>, document.getElementById('root'));
    })
  }
