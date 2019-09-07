import { BaseBloc } from "./BaseBloc";

export class Item {
    item = 'item';
}
export class ItemBloc extends BaseBloc<Item>{
    constructor(public initState: Item) {
        super(initState);
    }
    changeName(name: string) {
        this.updateState({ item: name })
    }
}