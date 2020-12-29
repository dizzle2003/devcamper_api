const courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const Courses = require('../models/Courses');

//@desc Get Courses
//route GET base_url/:bootcampId/courses
//@access public

exports.getAllCourses = asyncHandler(async (req, res) => {
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

//@desc Get Courses
//route GET base_url/:bootcampId/courses
//@access public
exports.getCourseById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const course = await courses.findById(id).populate({
		path: 'bootcamp',
		select: 'name description',
	});
	if (!course) {
		return next(new ErrorResponse(`No course with this ${id} found`), 404);
	}
	res.status(200).json({
		success: true,
		msg: `course with id ${id} has been retrieved`,
		data: course,
	});
});

//@desc Add Courses
//route POST base_url/:bootcampId/courses
//@access private
exports.addCourse = asyncHandler(async (req, res) => {
	req.body.bootcamp = req.params.bootcampId;
	const bootcamp = await Bootcamp.findById(req.params.bootcampId);
	if (!bootcamp) {
		return next(
			new ErrorResponse(`No course with this ${req.params.bootcampId} found`),
			404,
		);
	}
	const course = await Courses.create(req.body);
	res.status(201).json({
		success: true,
		msg: `course with ${req.body.id} is created`,
		data: course,
	});
});

//@desc Update Course
//route PUT base_url/:bootcampId/courses
//@access private

exports.updateCourse = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const course = await Courses.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	})

	if (!course) {
		return next(new ErrorResponse(`No course with this ${id} found`), 404);
	}

	res.status(200).json({
		success: true,
		msg: `course with id ${id} has been updated`,
		data: course
	});
	
});

//@desc delete Courses
//route DELETE base_url/:bootcampId/courses
//@access private

exports.deleteCourse = asyncHandler(async (req, res) => {
	const {id} = req.params
	const course = await Courses.findById(id);
	if(!course){
		return next(new ErrorResponse (`No course with this ${id} found`), 404)
	}

	await course.remove()
	res.status(200).json({
		msg: `course with id ${id} no longer exists on database`,
		data: {}
	})
});
