const generateConfig = require('dd-fed-build');

const config = generateConfig();

config.entry = {
	main: [
		'./src/script.js',
		'./src/style.scss',
	],
};

module.exports = config;
