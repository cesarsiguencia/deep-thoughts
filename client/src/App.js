import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; //for React to use the Apollo

import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//this creates the link to graphql server with createHttplink, 
// the server is running in the next localhost +1 for production, but when the app is done, change the uri to '/graphql', uri = uniform resource identifier
const httpLink = createHttpLink({
  uri: '/graphql',
});

// create Apollo Client with the endpoint link, cache is optional
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

//Apollo Provider is now a component
// the client prop takes in the data from above
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
