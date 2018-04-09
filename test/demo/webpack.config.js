const config = require('dd-fed-build');

config.entry = {
	main: [
		'./src/script.js',
		'./src/style.scss',
	],
};

module.exports = config;
