let code = `
foo()
function foo(){
    return 1;
}
foo()
`;
function parse(code: string) {

}

parse(code);


class Heap<T>{
    constructor(public array: T[]) {

    }

    getParent(index: number) {
        return this.array[this.getParentIndex(index)];
    }

    getParentIndex(index: number) {
        if (index > 0) {
            return Math.floor((index - 1) / 2);
        } else {
            return -1;
        }
    }

    getLeft(index: number) {
        return this.array[this.getLeftIndex(index)];
    }

    getLeftIndex(index: number) {
        return (2 * index) + 1;
    }

    getRight(index: number) {
        return this.array[this.getRightIndex(index)];
    }

    getRightIndex(index: number) {
        return this.getLeftIndex(index) + 1;
    }

    insert(element: T) {

    }

    remove(element: T) {

    }
}

interface A{
    name:string
}

interface B extends A{
    name:number
}

