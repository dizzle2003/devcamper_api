const express = require('express');
const base_url = require('../baseURLs/courses')
const { allCourses } = require('../controllers/courses');
const router = express.Router({ mergeParams: true });


router.route(base_url).get(allCourses);

module.exports = router;
