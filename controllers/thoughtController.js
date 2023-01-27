const { User, Friends, Thought } = require('../models');

module.exports = {
  //Get all thoughts 
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },

  //Get one thought 
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }) //I dont know whwat I'm doing here...
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Create new thought 
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thought: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
          })
          : res.json('Created the thought')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Update a thought 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true } //do i need this? 
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete a thought 
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thought: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Thought created but no user with this id!', //I'm confused by this one
          })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },


  //Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.params.reactionId } }, { new: true })
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).json({ message: 'No reaction with this id!' });
        }
        res.json(reaction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Delete a reaction from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionId } }, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};