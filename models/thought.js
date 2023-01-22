const { Schema, Model } = require('mongoose');

const thoughtSchema = new Schema({
    thought: {
        thoughText: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            //add array of nested documents created with reactionsSchema
        },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        },
        {
            timestamps: true,
            toJSON: { getters: true, virtuals: true },
        },
);

// Virtual for reaction count 
userSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });


//Initialize model 
const Thought = model('thought', thoughtSchema);

module.exports = Thought;