import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { App } from './App';
import { epicMiddleware, rootEpic } from './reducers';
import configureStore from './configureStore';
const store = configureStore();
epicMiddleware.run(rootEpic);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
if (module.hot) {
  module.hot.accept('./App', function () {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'),
    );
  });
}
