// import the gql tagged template function
// TYPEDEFS first, then create resolvers
// we limit our data in this file
const { gql } = require('apollo-server-express');// a tagged template function from the package

// create our typeDefs, the tagged template function where the definitions will go
//type Query {} is a function from graphql
//the model is defined before the query
const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

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

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }



  `;
// the typeAuth means that a token must be returned and that it can optionally return any user data
//the mutations now accept Auth whenever we login or add a User, to add a session to each user
// for the entire query model, replace query definitiom
// thoughts: [Thought]
// for just one user, replace query definition
// thoughts(username: String): [Thought]
// THE ORDER OF THESE MATTER FOR IT TO WORK!!!
module.exports = typeDefs;

// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Query {
//     helloWorld: String
//   }
// `;

// module.exports = typeDefs;

// Keira.Marquardt

// jwt token
// {
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdGVyMiIsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJfaWQiOiI1ZWQ2OTIzOGY5MjllYjQzOGM2MjI0YmUifSwiaWF0IjoxNTkxMTMyMDM3LCJleHAiOjE1OTExMzkyMzd9.5TLfWZCsC7bzsmOQ58xHf5G6PCD8TQEkrdioBSkN2T4"
//   }

// for a thought
// {
//     "thoughtText": "I think GraphQL is pretty cool."
//   }

//for a reaction
// {
//     "thoughtId": "5ed7f1e96764053f245e9e92",
//     "reactionBody": "I agree!"
//   }

//=============
//Apollo tests
// mutation addFriend($friendId: ID!) {
//     addFriend(friendId: $friendId) {
//       _id
//       username
//       friendCount
//       friends {
//         _id
//         username
//       }
//     }
//   }

// mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
//     addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
//       _id
//       reactionCount
//       reactions {
//         _id
//         reactionBody
//         createdAt
//         username
//       }
//     }
//   }