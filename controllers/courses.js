const courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.allCourses = asyncHandler (async(req, res) => {
    const course = await courses.find()
    res.status(200).json({
        success: true,
        count: course.length,
        data: course
    })
})