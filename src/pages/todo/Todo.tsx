import React from 'react';
import { Route } from 'react-router-dom';
import { TodoList } from './TodoList';

export const Todo: React.FC = (props) => {
  return (
    <>
      <Route path="/app/todo">
        <TodoList />
      </Route>
    </>
  );
};
