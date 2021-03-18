import React from 'react';
import { Route } from 'react-router-dom';
import Foo from './Foo';
import Pro from './Pro';
import { TodoList } from './TodoList';

export const Todo: React.FC = (props) => {
  return (
    <>
      <Route path="/app/todo">
        <TodoList />
      </Route>
      <Route path="/app/todo/pro">
        <Pro />
      </Route>
      <Route path="/app/todo/foo">
        <Foo />
      </Route>
    </>
  );
};
