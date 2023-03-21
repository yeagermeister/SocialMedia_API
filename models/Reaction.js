const { Schema, Types, model } = require('mongoose');
const userSchema = require('./User');

const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [userSchema],
      // {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;
