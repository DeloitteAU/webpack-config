const path = require('path');
const config = require('@deloitte-digital-au/webpack-config');

config.module.rules.push({
	test: /\.jsx?$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
});

config.resolve = {
	alias: {
		'~': path.resolve(process.cwd(), 'src'),
	},
	extensions: ['.js', '.jsx', '.json', '.scss'],
};

module.exports = config;
