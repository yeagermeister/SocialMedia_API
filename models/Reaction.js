const { Schema, Types } = require('mongoose');
// const userSchema = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
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
    username: {
      type: Schema.Types.String,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    _id: false
  }
);

// const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;
