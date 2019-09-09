import { UserBloc, User } from "./UserBloc";
import { ItemBloc, Item } from "./ItemBloc";
import { BehaviorSubject, combineLatest } from "rxjs";

const rootBloc = {
  userBloc: new UserBloc({name:'123'}),
  itemBloc: new ItemBloc({item:'456'})
};

type AppState = {
  user: User,
  item: Item
}

const keys = Object.keys(rootBloc);

const appState = keys.reduce((pre, current, currentIndex) => {
  const key = current.replace('Bloc', '');
  pre[key] = rootBloc[current].state$.value;
  return pre;
}, {});

const states$ = keys.map(key => {
  return rootBloc[key].state$;
});

const state$ = combineLatest(states$, (...state) => {
  const root = keys.reduce((pre, current, currentIndex) => {
    const key = current.replace('Bloc', '');
    pre[key] = state[currentIndex];
    return pre;
  }, {});
  return root;
});

const appState$ = new BehaviorSubject(appState) as BehaviorSubject<AppState>;

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