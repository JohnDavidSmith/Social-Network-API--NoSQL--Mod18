
const { User, Thought } = require('../models');

const userController = {
  // GET /api/users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET /api/users/:userId
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST /api/users
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // PUT /api/users/:userId
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE /api/users/:userId
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      await Thought.deleteMany({ username: user.username });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // POST /api/users/:userId/friends/:friendId
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE /api/users/:userId/friends/:friendId
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = userController;

