const express = require('express');
const router = express.Router();
const base_url = require('../baseURLs/bootcampURL');
const {
  getbootCamp,
  getbootCampbyId,
  createbootCamp
} = require('../controllers/bootcamps');

router.route(base_url).get(getbootCamp);

router
  .route(`${base_url}/:id`)
  .get(getbootCampbyId)
  .post(createbootCamp);

module.exports = router;
