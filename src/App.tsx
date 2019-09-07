import React from "react";
// import { rootBloc } from ".";
// import emj from "./asserts/emj.jpg";
import { useBloc, useBehaviorSubject, useObservable } from "./hooks";
import { rootBloc, appState$ } from "./blocs/RootBloc";
export default function App() {
    // const { userBloc, itemBloc } = rootBloc;
    const { item, user } = useBehaviorSubject(appState$);
    return <div>
        {user.name}
        {item.item}
        <form>
            <input type="text" value={user.name} onChange={e => { rootBloc.userBloc.changeName(e.target.value) }} />
            <input type="text" value={item.item} onChange={e => { rootBloc.itemBloc.changeName(e.target.value) }}/>
        </form>
    </div>
}