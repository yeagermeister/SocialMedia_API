
const { User, Thought } = require('../models');
const { trimId } = require('../helpers/helpers');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
      // .select('-__v')
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    // let id;
    // User.findOne({username: req.body.username})
    //   .lean()
    //   .then(async (user) => {
    //     if (!user) {
    //       res.status(404).json({ message: 'No user with that ID' })
    //     }
    //     id = trimId(user._id);
    //     req.body['username'] = id;
        console.log(req.body);
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
      // .catch((err) => {
      //   console.log(err);
      //   return res.status(500).json(err);
      // });
    // delete req.body.username;
    // console.log(id)
    // const newId = {"username": id }
    // req.body = {...req.body,...newId}
    // console.log(req.body);
    // Thought.create(req.body)
    //   .then((thought) => res.json(thought))
    //   .catch((err) => res.status(500).json(err));
  
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
      //     : res.json({ message: 'Thought successfully deleted' })
      // )
          : Thought.findOneAndRemove(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Thought deleted, but no reactions found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    if ((req.body.friends && req.body.thoughtname) || (req.body.friends && req.body.email)) {
      res.status(404).json({message: 'Please seperate account updates from friend additions'})
    } else {
      let updateAction;
      if (req.body.friends) {
        updateAction = { $push: req.body }; // Add a friend if a friendId is provided
      } else {
        updateAction = { $set: req.body}; // Update thought information if no friendId is provided
      };
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        updateAction,
        { new: true, runValidators: true }
      )
      .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    }
  }
};
