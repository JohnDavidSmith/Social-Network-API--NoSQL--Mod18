const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  try {
    // Remove existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const users = await User.insertMany(userData);

    // Update thoughts with user references
    const populatedThoughtData = thoughtData.map(thought => {
      thought.username = users.find(user => user.username === thought.username)._id;
      return thought;
    });

    // Create thoughts
    await Thought.insertMany(populatedThoughtData);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

