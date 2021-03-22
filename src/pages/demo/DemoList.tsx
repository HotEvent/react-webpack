import { foo } from '@/index';
import { observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import { FooService } from '../todo/foo.service';

export const DemoList: React.FC = observer((props) => {
  const fooService = useLocalObservable(() => new FooService());
  console.log(fooService);
  console.log(foo);
  return (
    <div>
      {fooService.name}
      <button onClick={() => fooService.updateName(fooService.name + 1)}>
        update
      </button>
    </div>
  );
});
