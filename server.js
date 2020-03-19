const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();
const bootcamp = require('./Routes/bootcamps');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bootcamp);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
