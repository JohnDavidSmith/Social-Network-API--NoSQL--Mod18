const { Thought, User } = require('../models');

const thoughtController = {
  // GET /api/thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET /api/thoughts/:thoughtId
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST /api/thoughts
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findById(thought.userId);
      user.thoughts.push(thought._id);
      await user.save();
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // PUT /api/thoughts/:thoughtId
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE /api/thoughts/:thoughtId
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // POST /api/thoughts/:thoughtId/reactions
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.pull(req.params.reactionId);
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;

