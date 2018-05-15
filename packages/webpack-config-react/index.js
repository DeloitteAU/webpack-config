const path = require('path');
const { config, loaders } = require('@deloitte-digital-au/webpack-config');

config.module.rules.push({
	test: /\.jsx?$/,
	use: loaders.babelLoader,
	exclude: /node_modules/,
});

config.resolve = {
	alias: {
		'~': path.resolve(process.cwd(), 'src'),
	},
	extensions: ['.js', '.jsx', '.json', '.scss'],
};

module.exports = {
	config,
	loaders,
};
