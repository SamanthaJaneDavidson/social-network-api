const { User, Thoughts } = require('../models');

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
            .select('-__v') //I dont know whwat I'm doing here...
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                        thoughts: await thoughts(req.aparams.userId), //???
                        friends: await friends(req.params.userId)
                    })
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
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.user(404).json({ message: 'No user with that ID' })
                    : Thoughts.deleteMany({_id: { $in: user.thoughts}})
            )
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


//post to add new friend to user's friends list

//delete to remove a friend from a user's friends list 

};