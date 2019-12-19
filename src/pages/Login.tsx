import React, { useEffect } from "react";
import { Epic } from "redux-observable";
import { switchMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux.config";


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const table = useSelector<AppState, { name: string }[]>(state => state.table);
    useEffect(()=>{
        dispatch({type:'table_start'});
    },[]);
    return (
    <div>{JSON.stringify(table)}</div>
    );
}

export default Login;