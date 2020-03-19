const express = require('express');
const router = express.Router();
const base_url = require('../baseURLs/bootcampURL');
const {
  getbootCamp,
  getbootCampbyId,
  createbootCamp,
  updatebootCamp,
  deletebootCamp
} = require('../controllers/bootcamps');

router.route(base_url).get(getbootCamp);

router
  .route(`${base_url}/:id`)
  .get(getbootCampbyId)
  .post(createbootCamp)
  .put(updatebootCamp)
  .delete(deletebootCamp);

module.exports = router;
