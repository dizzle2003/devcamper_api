'use strict';

const express = require('express');
const app = express();
const { config } = require('dotenv');
//Logger for development purposes
const morgan = require('morgan');
//Connection to db imported from config files
const connectDB = require('./config/db');
//Error handling import for better error message declaration
const errorhandler = require('./middleware/error');
const colors = require('colors');

//Load environment variables
config({ path: './config/config.env' });

//Invoking DB connection
connectDB();


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true}));

const bootcamp = require('./routes/bootcamps');
const course = require('./routes/courses');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'you have reached the baseurl'
    })
})
app.use(bootcamp);
app.use(course);
app.use(errorhandler);

module.exports = app;