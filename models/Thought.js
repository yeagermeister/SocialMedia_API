const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const userSchema = require('./User');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    // thoughID:{
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
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
    username: {
      // type: Schema.Types.String,
      // ref: 'User',
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
    //   {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Reaction',
    // }],

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
