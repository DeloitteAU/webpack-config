const config = require('webpack-config-deloitte');
const path = require('path');

config.output.path = path.resolve(__dirname, 'dist-custom-dir');

config.entry = {
	main: [
		'./src/script.js',
		'./src/style.scss',
	],
};

module.exports = config;
