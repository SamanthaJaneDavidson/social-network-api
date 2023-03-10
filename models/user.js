const { Schema, model } = require('mongoose');

// Schema for user model 
const userSchema = new Schema({
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
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual for friend count 
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });


//Initialize model 
const User = model('User', userSchema);

module.exports = User;