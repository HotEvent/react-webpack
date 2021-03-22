import { makeAutoObservable } from 'mobx';

export class FooService {
  name = '123';

  constructor() {
    makeAutoObservable(this);
  }

  updateName(name: string) {
    this.name = name;
  }
}
