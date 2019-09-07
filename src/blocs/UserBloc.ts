// import { User } from "./User";
import { BaseBloc } from "./BaseBloc";

export class User {
    name = '123';
}

export class UserBloc extends BaseBloc<User>{
    constructor(public initState: User) {
        super(initState)
    }

    changeName(name:string) {
        this.patchState({ name });
    }
}