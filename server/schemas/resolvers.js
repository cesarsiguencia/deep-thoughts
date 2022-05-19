const { User, Thought } = require('../models');

//actual requests being made
// this page is similar to a controller in RESTful APIs

const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
          },
          // place this inside of the `Query` nested object right after `thoughts`
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
    }
};

// for the entire model
// const resolvers = {
//     Query: {
//       thoughts: async () => {
//         return Thought.find().sort({ createdAt: -1 });

//       }
//     }
// };
//  sort({ createdAt: -1 }) returns data in decending order

module.exports = resolvers;


// const resolvers = {
//     Query: {
//       helloWorld: () => {
//         return 'Hello world!';
//       }
//     }
//   };
  
//   module.exports = resolvers;