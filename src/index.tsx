import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { App } from './App';
import { epicMiddleware, rootEpic } from './reducers';
import configureStore from './configureStore';
const store = configureStore();
epicMiddleware.run(rootEpic);

class Fiber {
  constructor(
    public type: Function | string,
    public stateNode: HTMLElement,
    public memoizedState: any,
    public pendingState: any,
    public child: Fiber,
    public parent: Fiber,
    public sibling: Fiber,
    public memoizedProps: any,
    public pendingProps: { children: string | React.ReactElement },
  ) {}
}

const root: {
  current: Fiber;
  workInProgress: Fiber;
} = {
  current: null,
  workInProgress: null,
};

let currentEventHandle = null;

const findEventHandle = (fiber: Fiber, target: EventTarget) => {
  do {
    if (fiber.stateNode === target) {
      currentEventHandle = fiber.memoizedProps.onClick;
    }
    if (fiber.child != null) {
      fiber = fiber.child;
    }
    if (fiber.sibling) {
      findEventHandle(fiber.sibling, target);
    }
  } while (fiber.child && currentEventHandle == null);
};

const MRender = (
  element: React.ReactElement<any, any>,
  domElement: HTMLElement,
) => {
  domElement.addEventListener('click', (e) => {
    currentEventHandle = null;
    findEventHandle(root.current, e.target);
    console.log(currentEventHandle);
    currentEventHandle();
  });

  // root.dom = domElement;

  // const { type, props } = element;

  // const fiber = new Fiber(type,)

  // root.type = type;
  // const tree = type(props);
  // root.workInProgress = tree;
  // effectTree(element, domElement, null);
  // root.current = root.workInProgress;
  // root.workInProgress = null;
  // console.log(root);
  // root.current = tree;
  const rootFiber = new Fiber(
    'root',
    null,
    element,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  root.workInProgress = rootFiber;
  workLoopSync();
};

const workLoopSync = () => {
  while (root.workInProgress !== null) {
    performUnitWork(root.workInProgress);
  }
};

const performUnitWork = (fiber: Fiber) => {
  beginWork(fiber);
};

const beginWork = (fiber: Fiber) => {
  const child = getFiberChild(fiber);
  if (child) {
    fiber.child = child;
    root.workInProgress = child;
  } else {
    completeWork(fiber);
  }
};

const getFiberChild = (fiber: Fiber) => {
  if (fiber.type === 'root') {
    const child = elementToFiber(fiber.memoizedState, fiber);
    return child;
  } else {
    if (typeof fiber.type === 'function') {
      const element = fiber.type(fiber.pendingProps);
      const child = elementToFiber(element, fiber);
      return child;
    } else if (typeof fiber.type === 'string') {
      const childElement = fiber.pendingProps.children;
      if (Array.isArray(childElement)) {
        let preFiber: Fiber = null;
        let firstFiber: Fiber = null;
        for (let index = 0; index < childElement.length; index++) {
          const element = childElement[index];
          const childFiber = elementToFiber(element, fiber);
          if (preFiber) {
            preFiber.sibling = childFiber;
            preFiber = childFiber;
          } else {
            firstFiber = childFiber;
            preFiber = childFiber;
          }
        }
        return firstFiber;
      } else if (typeof childElement === 'object') {
        const child = elementToFiber(childElement, fiber);
        return child;
      }
    }
  }
};

const completeWork = (fiber: Fiber) => {
  if (fiber.sibling) {
    root.workInProgress = fiber.sibling;
  } else {
    do {
      fiber = fiber.parent;
    } while (fiber.type !== 'root');

    root.current = fiber;
    console.log(root.current);
    root.workInProgress = null;
  }
};

const elementToFiber = (element: React.ReactElement, parent: Fiber) => {
  const { type, props } = element;
  return new Fiber(type, null, null, null, null, parent, null, null, props);
};

// const effectTree = (
//   element: React.ReactElement<any, any>,
//   domElement: HTMLElement,
//   parent: Fiber,
// ) => {
//   const { type, props } = element;
//   if (typeof type === 'function') {
//     const fiber = new Fiber(type, null, null, null, parent, null, props);
//     if (root.workInProgress === null) {
//       root.workInProgress = fiber;
//       // root.currentFiber = fiber;
//     } else {
//     }
//     if (root.currentFiber === null) {
//     } else {
//       if (root.currentFiber === parent) {
//         parent.child = fiber;
//       } else if (root.currentFiber !== parent) {
//         root.currentFiber.sibling = fiber;
//       }
//     }
//     root.currentFiber = fiber;
//     const tree = element.type(props);
//     effectTree(tree, domElement, fiber);
//   } else if (typeof type === 'string') {
//     const delement = document.createElement(type);
//     const fiber = new Fiber(type, delement, null, null, parent, null, props);
//     if (root.currentFiber === null) {
//     } else {
//       if (root.currentFiber === parent) {
//         parent.child = fiber;
//         root.currentFiber.child = fiber;
//       } else if (root.currentFiber !== parent) {
//         root.currentFiber.sibling = fiber;
//       }
//     }
//     root.currentFiber = fiber;
//     domElement.appendChild(delement);
//     const children = props.children;
//     if (Array.isArray(children)) {
//       for (let i = 0; i < children.length; i++) {
//         if (i > 0) {
//           effectTree(children[i], delement, fiber);
//         } else {
//           effectTree(children[i], delement, fiber);
//         }
//       }
//     } else if (typeof children === 'string') {
//       delement.textContent = children;
//     } else if (typeof children === 'object') {
//       effectTree(children, delement, fiber);
//     }
//   }
// };

// const update = () => {
//   root.dom.removeChild(root.dom.children[0]);
//   const tree = root.current;
//   root.workInProgress = tree;
//   effectTree(tree, root.dom, null);
//   root.current = root.workInProgress;
//   root.workInProgress = null;
// };

// export const useState = (init: any) => {
//   if (root.currentFiber.memoizedState === null) {
//     root.currentFiber.memoizedState = { state: init };
//   } else {
//   }

//   let dispatchAction = (fiber: Fiber, hook, action) => {
//     fiber.memoizedState.state = action;
//     update();
//   };
//   dispatchAction = dispatchAction.bind(
//     null,
//     root.currentFiber,
//     root.currentFiber.hook,
//   );
//   return [root.currentFiber.memoizedState.state, dispatchAction];
// };

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
