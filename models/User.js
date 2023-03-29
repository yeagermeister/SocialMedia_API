const { Schema, Types, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

// Schemal to create the User model
const userSchema = new Schema(
  {
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
      // Using regex to validate an email address
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
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);  
// Create the friendCount virtual to retrieve the length of the users friends array
userSchema
  .virtual('friendCount')
  .get(function() {
    return this.friends.length;
  })

const User = model('user', userSchema)

module.exports = User;
