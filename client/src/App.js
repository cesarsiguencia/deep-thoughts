import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; //for React to use the Apollo

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

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
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/profile/:username" 
                element={<Profile />} 
              />
              <Route 
                path="/thought/:id" 
                element={<SingleThought />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );

}

export default App;
