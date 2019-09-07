import { UserBloc } from "./UserBloc";
import { ItemBloc } from "./ItemBloc";
import { BehaviorSubject, combineLatest } from "rxjs";

const rootBloc = {
  user: new UserBloc({ name: '123' }),
  item: new ItemBloc({ item: 'item' })
};

const keys = Object.keys(rootBloc);

const appState:any = keys.reduce((pre, current, currentIndex) => {
  pre[current] = rootBloc[current].state$.value;
  return pre;
}, {});

const states$ = keys.map(key => {
  return rootBloc[key].state$;
});

const state$ = combineLatest(states$, (...state) => {
  const root = keys.reduce((pre, current, currentIndex) => {
    pre[current] = state[currentIndex];
    return pre;
  }, {});
  return root;
});

const appState$ = new BehaviorSubject(appState);

state$.subscribe(appState$);

export { rootBloc, appState$ }



// @injectable()
// export class RootBloc {
//   state$ = new BehaviorSubject({})
//   constructor(
//     public userBloc: UserBloc,
//     public itemBloc: ItemBloc
//   ) {
//     const arguments$ = [...(arguments as any)].map(bloc => {
//       return bloc.state$;
//     });
//     combineLatest(arguments$, (...args) => {
//       return args
//     })
//       .subscribe();
//   }
// }