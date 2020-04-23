const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

exports.getbootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();

  res.status(200).json({
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
    data: `${bootcamp} with id ${id} has been updated`,
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
  const { distance, zipcode, state  } = req.params;
  
  //Get latitude and longitude from geocoder
	await Bootcamp.findByIdAndDelete(id);

	res.status(200).json({
		deleted: true,
		data: `bootcamp with id ${id} has been deleted`,
	});
});