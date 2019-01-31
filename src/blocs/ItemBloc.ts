import { BaseBloc } from "./BaseBloc";
import { injectable } from "tsyringe";

export class Item {
    item = 'item';
}
@injectable()
export class ItemBloc extends BaseBloc<Item>{
    constructor(public initState: Item) {
        super(initState);
    }
    update() {
        this.patchState({
            item: this.state.item + '1'
        })
    }
}