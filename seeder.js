const fs = require('fs');
const { config } = require('dotenv');
const connectDB = require('./config/db');

//Load environmental variables
config({ path: './config/config.env' });

//Load models
const bootcamp = require('./models/Bootcamp');

//DB connection
connectDB();

//Read JSON files
const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'),
);

//Import JSON files into DB
const importData = async function () {
	try {
		await bootcamp.create(bootcamps);
		console.log(`Data imported successfully`);
	} catch (error) {
		console.log(error);
	}
};

const deleteData = async function () {
	try {
		await bootcamp.deleteMany();
		console.log(`Data deleted successfully`);
	} catch (error) {
		console.log(error);
	}
};

if (process.argv[2] === '-i'){
	importData();
} else if(process.argv[2] === '-d'){
	deleteData(); 
}