const { ObjectID } = require('bson');
const { Schema, model } = require('mongoose');

//Create schema 
const reactionSchema = Schema({
    reaction: {
        reactionId: {
            type: ObjectID,
            default: new ObjectID,
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
            type: Date,
            default: Date.now,
        },
    },
        {
            timestamps: true,
            toJSON: { getters: true, virtuals: true },
        },
    );


// Initialize model    
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;