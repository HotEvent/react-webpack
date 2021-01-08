import { Heap, Scope, Stack } from "./datastc";

let code = `
function foo(){
    foo1();
}

function foo1(){

}

foo()
`;
function parse(code: string) {
    const heap = new Heap<any>([], (a, b) => {
        return a > b;
    });
    const stack = new Stack<any>([]);
    const callStack = new Stack<any>([]);
    const scope = new Scope();
    const messageQueue = [];
}



function parseFunction(code: string) {

}

function parseMethodCall(code: string) {

}

parse(code);






