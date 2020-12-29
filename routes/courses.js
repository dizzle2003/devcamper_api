const express = require('express');
const base_url = require('../baseURLs/courses');
const {
	getAllCourses,
	getCourseById,
	addCourse,
	updateCourse
} = require('../controllers/courses');
const router = express.Router({ mergeParams: true });

router.route(base_url).get(getAllCourses).post(addCourse);
router.route(`${base_url}/:id`).get(getCourseById).put(updateCourse);

module.exports = router;
