// import { User } from "./User";
import { BaseBloc } from "./BaseBloc";

export interface User {
    name: string;
}

export class UserBloc extends BaseBloc<User>{
    constructor(public initState: User) {
        super(initState)
    }

    changeName(name: string) {
        this.patchState({ name });
    }
}