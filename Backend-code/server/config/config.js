require('dotenv').config();

const path = require('path');
const config = {
	App_name: process.env.APP_NAME || 'Shushly',
	port: process.env.PORT || 4000,
	root_path: path.resolve(__dirname),
	GOOGLE_KEY: process.env.GOOGLE_KEY,
};

module.exports = config;
