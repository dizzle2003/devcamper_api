const NodeGeocoder = require('node-geocoder');
const { config } = require('dotenv');
//Load environment variables
config({ path: './config/config.env' });
const options = {
	provider: process.env.GEOCODER_PROVIDER,
	apiKey: process.env.GEOCODER_API_KEY
};
const geoCoder = NodeGeocoder(options);

module.exports = geoCoder;
