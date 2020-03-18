const express = require('express');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();
const bootcamp = require('./Routes/bootcamps');

app.use(bootcamp);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
