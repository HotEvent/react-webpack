import { Heap, Scope, Stack, Function } from "./datastc";

let code = `
function foo(){
    foo1();
}

function foo1(){

}
`;
function parse(code: string) {
    const heap = new Heap<any>([], (a, b) => {
        return a > b;
    });
    const stack = new Stack<any>([]);
    const callStack = new Stack<any>([]);
    const scope = new Scope();
    const messageQueue = [];
    const array = parseCode(code);
}

function parseCode(code: string) {
    let text = '';

    let keywordStack = new Stack<string>([]);
    let codes: string[] = [];
    for (const char of code) {
        text = text + char;
        if (text.search('function') > 0) {
            keywordStack.push('function');
        } else if(char === '{'){
            
        } else if (char === '}') {
            let keyword = keywordStack.pop();
            if (keywordStack.isEmpty()) {
                
            } else {
                
            }
        } else {

        }
    }
}

function parseFunction(code: string) {

}

function parseMethodCall(code: string) {

}

parse(code);






