import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '.';
import { Button } from 'antd';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import BaseLayout from './components/BaseLayout';
// import Login from './pages/Login';
import '@/styles/style.scss';
const Node: React.FC<{ text: string }> = (props) => {
  return <div>{props.text}</div>;
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<AppState, { name: string }[]>(
    (state) => state.table,
  );
  useEffect(() => {}, []);
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="foo">
            123
            <span>456</span>
          </div>
        </Route>
        {/* <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <BaseLayout />
        </Route> */}
      </Switch>
    </Router>
  );
};
