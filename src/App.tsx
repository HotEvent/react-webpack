import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@/styles/style.scss';
import { AppState } from './reducers';
const Node: React.FC<{ text: string }> = (props) => {
  return <div>{props.text}</div>;
};

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
        <Route path="/">
          <div className="foo">
            12
            <span>456</span>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};
