import { BaseBloc } from "./BaseBloc";

export interface Item {
    item: string;
}
export class ItemBloc extends BaseBloc<Item>{
    constructor(public initState: Item) {
        super(initState);
    }
    changeName(name: string) {
        this.updateState({ item: name })
    }
}