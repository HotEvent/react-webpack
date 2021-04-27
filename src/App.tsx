import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@/styles/style.scss';
import { AppState } from '@/reducers';
import { Login } from '@/layouts/Login';
import { Main } from '@/layouts/Main';
import { useState } from '.';

export const App: React.FC = () => {
  // const dispatch = useDispatch();
  // const table = useSelector<AppState, { name: string }[]>(
  //   (state) => state.table,
  // );
  // useEffect(() => {
  //   dispatch({ type: 'table_start' });
  // }, []);
  const [age, setAge] = useState('foo');
  return (
    <div>
      <div>{age}</div>
      <button
        onClick={(e) => {
          setAge(2);
        }}
      >
        update
      </button>
      <button
        onClick={(e) => {
          // setAge((age) => age + 1);
        }}
      >
        update2
      </button>
    </div>
  );
};
