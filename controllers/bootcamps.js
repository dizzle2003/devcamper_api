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
exports.createbootCamp = (req, res) => {
  const { id } = req.params;
  res.status(201).json({
    created: true,
    data: `created a new bootcamp with ${id}`
  });
};
