import { combineReducers } from 'redux';
import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';
const tableReducer = (
  state: any[] = [],
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case 'table_success':
      return action.payload;
    case 'reset':
      return [];
    case 'remove':
      return state;
    default:
      return state;
  }
};

const tableEpic: Epic = (action$) =>
  action$.ofType('table_start').pipe(
    switchMap((action) =>
      ajax.getJSON('/zh.json').pipe(
        map((rs: any) => ({ type: 'table_success', payload: rs })),
        catchError((e) => of({ type: 'error', payload: e })),
      ),
    ),
  );

const nameReducer = (
  state: string = '',
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case 'remove':
      return state + 'remove';
    default:
      return state;
  }
};
const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(tableEpic);
const rootReducer = combineReducers({
  table: tableReducer,
  name: nameReducer,
});

export { rootReducer, rootEpic, epicMiddleware };

export interface AppState {
  name: string;
  age: number;
  table: any[];
}
