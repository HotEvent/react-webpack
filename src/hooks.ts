import { BehaviorSubject } from "rxjs";
import { useState, useEffect } from "react";
import { filter } from "rxjs/operators";

function useBehaviorSubject<T>(behaviorSubject: BehaviorSubject<T>) {
    const [state, setState] = useState(behaviorSubject.value);
    useEffect(() => {
        let sub = behaviorSubject
            .pipe(
                filter(value => value !== state)
            )
            .subscribe(value => setState(value));
        return () => sub.unsubscribe();
    }, [])
    return state;
}

interface Bloc<S = any> {
    // initState: S
    state: S
    state$: BehaviorSubject<S>
    // updateState: Function
}

function useBloc<T = any>(bloc: Bloc<T>) {
    const [state, setState] = useState(bloc.state$.value);
    useEffect(() => {
        let sub = bloc.state$.pipe(
            filter(value => value !== state)
        ).subscribe(value => setState(value));
        return () => sub.unsubscribe();
    }, [])
    return state;
}


export { useBehaviorSubject, useBloc }