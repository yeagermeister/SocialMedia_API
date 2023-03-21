const { Schema, Types, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    thoughts:[{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friends:[{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);  // Create the friendCount virtual to retrieve the length of the users friends array

userSchema
  .virtual('friendCount')
  .get(function() {
    return this.friends.length;
  })

const User = model('user', userSchema)
module.exports = User;
