const express = require('express');
const router = express.Router();
const base_url = require('../baseURLs/coursesURL');
const {allCourses} = require('../controllers/courses');


router.route(base_url).get(allCourses);


module.exports = router