import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { epicMiddleware, rootEpic } from './reducers';
import configureStore from './configureStore';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const store = configureStore();
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5000/graphql',
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export { client };
epicMiddleware.run(rootEpic);
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
if (module.hot) {
  module.hot.accept('./App', function () {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>,
      document.getElementById('root'),
    );
  });
}
