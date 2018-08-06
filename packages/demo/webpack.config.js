const { createConfig } = require('@deloitte-digital-au/webpack-config');
const path = require('path');

module.exports = createConfig({
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
