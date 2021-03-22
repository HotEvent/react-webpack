import { foo } from '@/index';
import React from 'react';
import { Route } from 'react-router-dom';
import { DemoList } from './DemoList';

export const Demo: React.FC = (props) => {
  foo.name = 456;
  console.log(foo);
  return (
    <>
      <Route path="/app/demo">
        <DemoList />
      </Route>
    </>
  );
};
