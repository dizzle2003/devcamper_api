const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

exports.getbootCamp = asyncHandler(async (req, res, next) => {
	//Declare query to allow for multiple definitions based on search parameters
	let query;

	//Copy of req.query
	const reqQuery = { ...req.query };

	//Fields to exclude
	const removeFields = ['select'];

	//Loop to remove the 'select' param from the removeFields array
	removeFields.forEach((param) => delete reqQuery[param]);
	//

	//Create Operators/modifiers for gt, gte, lt, lte and in query searches
	const queryString = JSON.stringify(reqQuery).replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`,
	);

	//Retrieve Query Resource with queryString
	query = Bootcamp.find(JSON.parse(queryString));


	//Retrieve select fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	//Finding resource
	const bootcamp = await query;
	return res.status(200).json({
		success: true,
		count: bootcamp.length,
		data: bootcamp,
	});
});

exports.getbootCampbyId = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const bootcamp = await Bootcamp.findById(id);

	res.status(200).json({
		success: true,
		data: bootcamp,
	});
});

exports.createbootCamp = asyncHandler(async (req, res) => {
	const bootcamp = await Bootcamp.create(req.body);
	res.status(201).json({
		created: true,
		msg: `${bootcamp.name} has been created`,
		data: bootcamp,
	});
});

exports.updatebootCamp = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(302).json({
		updated: true,
		msg: `${bootcamp} with id ${id} has been updated`,
		data: bootcamp
	});
});

exports.deletebootCamp = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await Bootcamp.findByIdAndDelete(id);

	res.status(200).json({
		deleted: true,
		data: `bootcamp with id ${id} has been deleted`,
	});
});

exports.getbootCampbyRadius = asyncHandler(async (req, res) => {
	const { distance, zipcode } = req.params;

	//Get latitude and longitude from geocoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;

	//calculate radius
	//Divide distance by earth's radius (3963 mi/ 6,378 km)
	const earthRadius = 6378;
	const radius = distance / earthRadius;

	const bootcamps = await Bootcamp.find({
		location: { $geowithin: { $centersphere: [[lng, lat], radius] } },
	});

	res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps,
	});
});
