import { UserBloc } from "./UserBloc";
import { injectable } from "tsyringe";
import { ItemBloc } from "./ItemBloc";
import { BehaviorSubject, combineLatest } from "rxjs";

@injectable()
export class RootBloc {
  state$ = new BehaviorSubject({
    user: this.userBloc.state,
    item: this.itemBloc.state
  })
  constructor(
    public userBloc: UserBloc,
    public itemBloc: ItemBloc
  ) {
    combineLatest(this.userBloc.state$, this.itemBloc.state$, (user, item) => {
      return {
        user,
        item
      }
    })
      .subscribe(this.state$);
  }
}