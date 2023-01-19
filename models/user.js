const mongoose = require('mongoose');

const socialNetworkSchema = new mongoose.Schema({
    user: {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //add email validation 
        },
        thoughts: {
            //add array of _id values referencing the Thought model
        },
        friends: {
          //add array of _id values referncing the user model (self-reference)
        }
    }
});

const User = mongoose.model('User', socialNetworkSchema);

const handleError = (err) => console.error(err);

User.create(
    {
        username: 'throwingicicles',
        email: 'sam@test.com',
        thoughts: 'derp',
        friends: "none"
    },
    (err) => (err ? handleError(err) : console.log('Created new user'))
);

module.exports = User;