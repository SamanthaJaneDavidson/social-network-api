const { Thoughts, Users, Friends, Thought } = require('../models');

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
    getSingleUser(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }) //I dont know whwat I'm doing here...
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({thought})
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //Create new thought 
    createUser(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
            //how do I get this attached to the user? 
    },

    //Update a thought 
    updateUser(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Delete a thought 
    // deleteUser(req, res) {
    //     Thought.findOneAndRemove({ _id: req.params.userId })
    //         .then((thought) =>
    //             !thought
    //                 ? res.thought(404).json({ message: 'No thought with that ID' })
    //         ) //whats my syntax error here? 
    //         .then(() => res.json({ message: 'User deleted!' }))
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // },

};