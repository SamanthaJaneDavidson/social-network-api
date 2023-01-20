const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thought: {
        thoughText: {
            type: String,
            required: true,
            //1-280 characters 
        },
        createdAt: {
            //date - default to current time stamp, use getter method to format timestamp
        },
        username: {
            type: String,
            required: true,
        },
        },
        reactions: {
          //add array of nested documents created with reactionsSchema
        }
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

Thought.create(
    {
        thoughText: 'blah blah blah',
        createdAt: //date
        username: 'Throwingicicles', //is this pulling from somewhere?? 
        reactions: "?"
    },
    (err) => (err ? handleError(err) : console.log('Created new thought'))
);

module.exports = Thought;