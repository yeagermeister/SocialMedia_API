const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  // addFriend,
  // deleteFriend,
  // addThought,
  // deleteThought
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  // //  /api/users/:userid/friends/friendId
  // router.route('/:userId/friends/:friendId').put(addFriend).delete(deleteFriend);

  //   //  /api/users/:userid/thoughts/thoughtId
  // router.route('/:userId/thoughts/:thoughtId').put(addThought).delete(deleteThought);


module.exports = router;
