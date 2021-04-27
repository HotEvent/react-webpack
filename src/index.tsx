import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { App } from './App';
import { epicMiddleware, rootEpic } from './reducers';
import configureStore from './configureStore';
const store = configureStore();
epicMiddleware.run(rootEpic);

const root = {
  current: null,
  workInProgress: null,
  dom: null,
  hook: null,
};

const findEventHandle = (element) => {
  if (element?.props.onClick) {
    element.props.onClick();
  } else {
    if (element.props.children) {
      if (Array.isArray(element.props.children)) {
        for (const c of element.props.children) {
          findEventHandle(c);
        }
      } else if (typeof element.props.children === 'object') {
        findEventHandle(element.props.children);
      }
    }
  }
};

const MRender = (
  element: React.ReactElement<any, any>,
  domElement: HTMLElement,
) => {
  domElement.addEventListener('click', (e) => {
    findEventHandle(root.current);
  });

  root.dom = domElement;
  const { type, props } = element;
  const tree = type(props);
  root.workInProgress = tree;
  effectTree(tree, domElement);
  root.current = tree;
};

export const useState = (action: any) => {
  root.hook = { state: action };
  const dispatchAction = (action) => {
    root.hook.state = action;
    console.log('update');
  };
  return [root.hook.state, dispatchAction];
};

const effectTree = (
  element: React.ReactElement<any, any>,
  domElement: HTMLElement,
) => {
  const { type, props } = element;
  if (typeof type === 'function') {
    const tree = element.type(props);
    effectTree(tree, domElement);
  } else if (typeof type === 'string') {
    const delement = document.createElement(type);
    domElement.appendChild(delement);
    const children = props.children;
    if (Array.isArray(children)) {
      for (const c of props.children) {
        effectTree(c, delement);
      }
    } else if (typeof children === 'string') {
      delement.textContent = children;
    } else if (typeof children === 'object') {
      effectTree(children, delement);
    }
  }
};

MRender(
  // <Provider store={store}>
  <App />,
  // </Provider>
  document.getElementById('root'),
);
// if (module.hot) {
//   module.hot.accept('./App', function () {
//     MRender(
//       // <Provider store={store}>
//       <App />,
//       // </Provider>
//       document.getElementById('root'),
//     );
//   });
// }
