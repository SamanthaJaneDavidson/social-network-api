const { Schema, Model } = require('mongoose');

// Schhema for user model 
const userSchema = new Schema({
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ],
    }
});

// Virtual for friend count 
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });


//Initialize model 
const User = model('User', userSchema);

module.exports = User;