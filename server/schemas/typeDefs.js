// import the gql tagged template function
// TYPEDEFS first, then create resolvers
// we limit our data in this file
const { gql } = require('apollo-server-express');// a tagged template function from the package

// create our typeDefs, the tagged template function where the definitions will go
//type Query {} is a function from graphql
//the model is defined before the query
const typeDefs = gql`

type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
  `;

// export the typeDefs
// for the entire query model, replace query definitiom
// thoughts: [Thought]
// for just one user, replace query definition
// thoughts(username: String): [Thought]
module.exports = typeDefs;

// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Query {
//     helloWorld: String
//   }
// `;

// module.exports = typeDefs;

// Keira.Marquardt