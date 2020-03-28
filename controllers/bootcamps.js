const Bootcamp = require('../models/Bootcamp');

exports.getbootCamp = (req, res) => {
  res.status(200).json({
    success: true,
    data: 'retrieved all bootcamps'
  });
};
exports.getbootCampbyId = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    data: `retrieved bootcamp with ${id}`
  });
};
exports.createbootCamp = async (req, res) => {
  const bootcamp = await Bootcamp.create(req.body)
  try {
    res.status(201).json({
      created: true,
      data: bootcamp,
    })
    }
  catch (error) {
    res.status(404).json({
      created: false,
      data: error
    })

  }
  
};
exports.updatebootCamp = (req, res) => {
  const { id } = req.params;
  res.status(302).json({
    updated: true,
    data: `updated bootCamp with id ${id}`
  });
};
exports.deletebootCamp = (req, res) => {
  const { id } = req.params;
  if (id) {
    return res.status(200).json({
      deleted: true,
      data: `deleted bootCamp with id ${id}`
    });
  }
  return res.status(404).json({
    deleted: false,
    error: `no bootcamp with this ${id} exists`
  });
};
