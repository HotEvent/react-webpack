import { BehaviorSubject } from "rxjs";
export class BaseBloc<T>{
    public state$ = new BehaviorSubject(this.initState);
    constructor(public initState: T) {

    }

    updateState(state: T) {
        this.state$.next(state);
    }

    patchState(state: Partial<T>) {
        this.updateState({
            ...this.state,
            ...state
        })
    }

    reset() {
        this.patchState(this.initState);
    }

    get state() {
        return this.state$.value;
    }
}