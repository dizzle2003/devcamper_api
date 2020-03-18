const express = require('express');
const router = express.Router();
const base_url = require('../baseURLs/bootcampURL');

router
  .get(base_url, (req, res) => {
    res.status(200).json({
      success: true,
      data: 'retrieved all bootcamps'
    });
  })
  .get(`${base_url}/:id`, (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      data: `retrieved bootcamp with ${id}`
    });
  })
  .post(base_url, (req, res) => {
    res.status(201).json({
      created: true,
      data: 'created a new bootcamp'
    });
  });

module.exports = router;
