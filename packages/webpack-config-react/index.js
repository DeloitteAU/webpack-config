const config = require('@deloitte-digital-au/webpack-config');
const merge = require('webpack-merge');

const mergedConfig = merge.smart(config, {
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.jsx'],
	},
});

module.exports = mergedConfig;
