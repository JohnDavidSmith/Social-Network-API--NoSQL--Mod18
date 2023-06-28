
const { User, Thought } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [],
    friends: []
  },
  // Add more user data as needed
];

const thoughtData = [
  {
    thoughtText: 'Thought 1',
    username: 'user1',
    reactions: []
  },
  {
    thoughtText: 'Thought 2',
    username: 'user2',
    reactions: []
  },
  // Add more thought data as needed
];

module.exports = { userData, thoughtData };

