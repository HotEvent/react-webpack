import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link, BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import BaseLayout from './components/BaseLayout';
import Login from './pages/Login';
import { Button } from 'antd';
import { AppState } from './redux.config';

const Node: React.FC<{ text: string }> = (props) => {
  return (
    <div>{props.text}</div>
  )
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<AppState, { name: string }[]>(state => state.table);
  useEffect(() => {

  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <BaseLayout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
