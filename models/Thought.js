const { Schema, Types, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughID:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [userSchema],
    reactions: [reactionSchema],

  },
  {
    toJSON: {
      getters: true,
    },
  }
  // create a reactionCount virtual to retrieve the length of the reactions array.
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
