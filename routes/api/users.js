const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  // updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/courses
router.route('/').get(getUsers).post(createUser);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getSingleUser)
  // .put(updateUser)
  .delete(deleteUser);

module.exports = router;
