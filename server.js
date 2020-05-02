'use strict';

const express = require('express');
const { config } = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorhandler = require('./middleware/error');

//Load environment variables
config({ path: './config/config.env' });

connectDB();

const app = express();
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
  console.log(`Error: ${err}`);
  server.close(() => process.exit(1));
});
