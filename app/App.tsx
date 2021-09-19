import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import Router from './Routing';
import {Provider as PaperProvider} from 'react-native-paper';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.1.105:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ApolloProvider>
    </PaperProvider>
  );
};

export default App;
