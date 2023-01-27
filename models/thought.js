const { Schema, model } = require('mongoose');

// Create schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reaction",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        timestamps: true,
        toJSON: { getters: true, virtuals: true },
    }
);


// Virtual for reaction count 
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });


//Initialize model 
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;