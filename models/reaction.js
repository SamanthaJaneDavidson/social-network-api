const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reaction: {
        reactionId: {
            
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        },
        createdAt: {
            //date - default to current time stamp, use getter method to format timestamp
        },
});

const Reaction = mongoose.model('Reaction', thoughtSchema);


module.exports = Reaction;