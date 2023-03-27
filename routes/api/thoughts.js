const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
// router.route('/:thoughtId/reactions/:reactionId');

module.exports = router;
