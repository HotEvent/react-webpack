import '@abraham/reflection';
import { container, Provider } from "tsyringe";
import { RootBloc } from "./blocs/RootBloc";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.scss";
const rootBloc = container.resolve(RootBloc);
export { rootBloc };
// document.querySelector('#user')
//     .addEventListener('click', function () {
//         rootBloc.userBloc.update();
//     })

// document.querySelector('#item')
//     .addEventListener('click', function () {
//         rootBloc.itemBloc.update();
//     })
rootBloc.state$.subscribe(value => {
    console.log(JSON.stringify(value));
})

ReactDOM.render(
    <App></App>,
    document.getElementById('root') as HTMLElement
);
// if (module['hot']) {
//     module['hot']['accept']('./router', () => {
//         ReactDOM.render(
//             <div></div>,
//             document.getElementById('root'),
//         )
//     })
// }