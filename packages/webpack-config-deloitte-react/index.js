const path = require('path');
const config = require('webpack-config-deloitte');

config.module.rules.push({
	test: /\.jsx?$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
});

config.resolve = {
	alias: {
		'~': path.resolve(__dirname, 'src')
	},
	extensions: ['.js', '.jsx', '.json', '.scss'],
};

module.exports = config;
