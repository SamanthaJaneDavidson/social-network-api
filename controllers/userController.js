const { User, Thoughts, Friends } = require('../models');

module.exports = {
    //Get all users 
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },

    //Get one user 
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId }) //I dont know whwat I'm doing here...
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({user})
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //Create new user 
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //Update a user 
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Delete a user 
    // deleteUser(req, res) {
    //     User.findOneAndRemove({ _id: req.params.userId })
    //         .then((user) =>
    //             !user
    //                 ? res.user(404).json({ message: 'No user with that ID' })
    //         ) //whats my syntax error here? 
    //         .then(() => res.json({ message: 'User deleted!' }))
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // },

};