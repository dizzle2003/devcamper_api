const courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get Courses
//route GET base_url
//route GET base_url/:bootcampId/courses
//@access public

exports.allCourses = asyncHandler(async (req, res) => {
	let query;
	const { bootcampId } = req.params;

	if (bootcampId) {
		query = await courses.find({ bootcamp: bootcampId });
	} else {
		query = await courses.find().populate({
			path: 'bootcamp',
			select: 'name description',
		});
	}
	const course = query;
	res.status(200).json({
		success: true,
		count: course.length,
		data: course,
	});
});
