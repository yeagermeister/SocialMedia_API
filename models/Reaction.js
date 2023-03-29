const { Schema, Types } = require('mongoose');

// Schema for reactions.  This is not a model, but a sub doc.
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
    id: false
  }
);

module.exports = reactionSchema;
