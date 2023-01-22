const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
//   deleteThought,
} = require('../../controllers/userController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);
router.route('/:thoughtId').put(updateThought);
// router.route('/:thoughtId').delete(deleteThought);

module.exports = router;