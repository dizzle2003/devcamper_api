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

//Load environment variables
config({ path: './config/config.env' });

//Invoking DB connection
connectDB();


app.use(express.json({ extended: true }));
const bootcamp = require('./Routes/bootcamps');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bootcamp);
app.use(errorhandler);



const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
