const express = require('express');
const router = express.Router();
const courseRouter = require('../routes/courses');
const base_url = require('../baseURLs/bootcampURL');
const {
	getbootCamp,
	getbootCampbyId,
	createbootCamp,
	updatebootCamp,
	deletebootCamp,
	getbootCampbyRadius,
} = require('../controllers/bootcamps');

//Re-route into other resource routers
router.use(`${base_url}/:bootcampId/courses`, courseRouter);

router.route(base_url).get(getbootCamp).post(createbootCamp);

router
	.route(`${base_url}/:id`)
	.get(getbootCampbyId)
	.put(updatebootCamp)
	.delete(deletebootCamp);

router.route(`${base_url}/radius/:zipcode/:distance`).get(getbootCampbyRadius);

module.exports = router;
