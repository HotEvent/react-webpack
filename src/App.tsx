import React from "react";
import { rootBloc } from ".";
// import emj from "./asserts/emj.jpg";
import { useBloc, useBehaviorSubject } from "./hooks";
export default function App() {
    const { userBloc, itemBloc } = rootBloc;
    const { item, user } = useBehaviorSubject(rootBloc.state$);
    return <div>
        <button onClick={() => userBloc.update()}>update user</button>
        <button onClick={() => itemBloc.update()}>update item</button>
        <div>{item.item}</div>
        <a href={`${process.env.PUBLIC_URL}/zh.json`}>download</a>
        {/* <img src={emj} alt="" /> */}
        <div>{user.name}</div>
    </div>
}