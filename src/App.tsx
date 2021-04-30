import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@/styles/style.scss';
import { AppState } from '@/reducers';
import { Login } from '@/layouts/Login';
import { Main } from '@/layouts/Main';
// import { useState } from '.';

export const App: React.FC = () => {
  console.log('start');
  // const dispatch = useDispatch();
  // const table = useSelector<AppState, { name: string }[]>(
  //   (state) => state.table,
  // );
  // useEffect(() => {
  //   dispatch({ type: 'table_start' });
  // }, []);
  // const [age, setAge] = useState('foo');
  return (
    <div>
      <span>age</span>
      <button
      // onClick={(e) => {
      //   setAge(age + 1);
      // }}
      >
        update
      </button>
      <button
      // onClick={(e) => {
      //   setAge(age + 2);
      // }}
      >
        update2
      </button>
    </div>
  );
};
