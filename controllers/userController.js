// ObjectId() method for converting userId string into an ObjectId for querying database
// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      // .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
      //     : res.json({ message: 'User successfully deleted' })
      // )
          : Thought.findOneAndRemove(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    if ((req.body.friends && req.body.username) || (req.body.friends && req.body.email)) {
      res.status(404).json({message: 'Please seperate account updates from friend additions'})
    } else {
      let updateAction;
      if (req.body.friends) {
        updateAction = { $push: req.body }; // Add a friend if a friendId is provided
        // adding this section to put the reciprocal friend relationship in place
        User.findOneAndUpdate(
          {_id: req.body.friends},
          {$push: {"friends": req.params.userId}},
          { new: true, runValidators: true }
        )
        .catch((err) => res.status(500).json(err));
      } else {
        updateAction = { $set: req.body}; // Update user information if no friendId is provided
      };
      User.findOneAndUpdate(
        { _id: req.params.userId },
        updateAction,
        { new: true, runValidators: true }
      )
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    }
  }
};
