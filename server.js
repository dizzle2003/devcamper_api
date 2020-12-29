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

app.use(bootcamp);
app.use(course);
app.use(errorhandler);



const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

//Handle unhandled promise rejections
<<<<<<< HEAD
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
=======
// process.on('unhandledRejection', (err) => {
//   console.log(`Error: ${err}`).red;
//   server.close(() => process.exit(1));
// });
>>>>>>> c0c4a0a629380cae016f8e45d524dfbf3cab6654
