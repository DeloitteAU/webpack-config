const config = require('@deloitte-digital-au/webpack-config');
const merge = require('webpack-merge');
const path = require('path');

const mergedConfig = merge.smart(config, {
	entry: {
		main: [
			'./src/script.js',
			'./src/style.css',
			'./src/style.scss',
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist-custom-dir'),
	},
});

module.exports = mergedConfig;
