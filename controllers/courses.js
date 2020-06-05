const courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get Courses
//route GET base_url
//route GET base_url/:bootcampId/courses
//@access public

exports.allCourses = asyncHandler(async (req, res) => {
    let query;
  

	if (req.params.bootcampId) {
		query = await courses.find({ bootcamp: req.params.bootcampId });
	} else {
		query = await courses.find();
	}
	const course = query;
	res.status(200).json({
		success: true,
		count: course.length,
		data: course,
	});
});
