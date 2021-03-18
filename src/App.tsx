import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@/styles/style.scss';
import { AppState } from '@/reducers';
import { Login } from '@/layouts/Login';
import { Main } from '@/layouts/Main';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<AppState, { name: string }[]>(
    (state) => state.table,
  );
  useEffect(() => {
    dispatch({ type: 'table_start' });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/app">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};
