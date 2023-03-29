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
          : Thought.findOneAndRemove(
              { users: req.params.userId },
              { $pull: { username: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
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
// Update a username and/or email address
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: {email: req.body.email, username: req.body.username}},
      { new: true, runValidators: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  // add a friend
  addFriend(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {'friends' : req.params.friendId}},
      { new: true, runValidators: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json(user)
   )
    .catch((err) => res.status(500).json(err));
  },
  // delete a friend
  deleteFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  }
};
