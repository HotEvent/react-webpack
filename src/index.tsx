import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable';
import { switchMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from 'rxjs';
import 'antd/dist/antd.css';
import './styles/style.scss';
export interface AppState {
    name: string
    age:number
    table:any[]
}

const tableReducer = (state: any[] = [], action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'table_success': return action.payload;
        case 'reset': return [];
        case 'remove': return state;
        default:
            return state;
    }
};

const tableEpic:Epic = action$ => action$.ofType('table_start').pipe(
    switchMap(action => 
        ajax.getJSON('/list.json').pipe(
            map((rs: any) => ({type:'table_success',payload:rs})),
            catchError(e => of({type:'error',payload:e}))
            ),
    )
)

const nameReducer = (state:string = '',action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'remove': return state+'remove';
        default:
            return state;
    }
};

const rootEpic = combineEpics(tableEpic);
const rootReducer = combineReducers({table:tableReducer,name:nameReducer});

const epicMiddleware = createEpicMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);
ReactDOM.render(<Provider store={store}>
    <div></div>
</Provider> , document.getElementById('root'));
