const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// const userSchema = require('./User');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
      mutable: true
    },    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,

  }
);
  //reactionCount virtual to retrieve the length of the reactions array.
thoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
