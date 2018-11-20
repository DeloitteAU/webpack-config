const { createConfig } = require('@deloitte-digital-au/webpack-config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const outputPath = path.resolve(__dirname, 'dist-custom-dir');

module.exports = createConfig({
	entry: {
		main: [
			'./src/script.js',
			'./src/style.css',
			'./src/style.scss',
		],
	},
	output: {
		path: outputPath,
	},
	plugins: [
		new CleanWebpackPlugin(outputPath),
	],
});
