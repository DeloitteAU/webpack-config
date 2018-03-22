const config = require('../../webpack.config.js');

config.context = __dirname;

config.entry = {
	main: [
		'./script.js',
		'./style.scss',
	],
};

config.output = {
	path: `${__dirname}/dist`,
};

module.exports = config;
