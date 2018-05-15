const { config } = require('@deloitte-digital-au/webpack-config-react');

config.entry = {
	main: [
		'./src/index.jsx',
	],
};

module.exports = config;
