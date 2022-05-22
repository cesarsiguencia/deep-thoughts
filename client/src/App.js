import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; //for React to use the Apollo

import { setContext } from '@apollo/client/link/context'; // retrieve from local storage function, creeates middleware function that will retrive the token for us and combine it with the existing httpLink

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



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

// retrives session token from local storage, then with the http request headers, every request will include the token
// the place holder _ in the arguements shows that we don't need the first item from authLink, justt headers with the second one.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// create Apollo Client with the endpoint link, cache is optional,
//authLink is combined with httpLink so that every request retrieves the token and sets the request headers beforemaking the request to the API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
                path="/profile" 
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
