const { baseConfig, mergeConfig } = require('@deloitte-digital-au/webpack-config');

const reactConfig = mergeConfig(baseConfig, ({ mode }) => {
	return {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					loader: ['babel-loader'],
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.jsx'],
		},
	};
});

const createConfig = userConfig => {
	return mergeConfig(reactConfig, userConfig);
};

module.exports = {
	baseConfig: reactConfig,
	createConfig,
	mergeConfig,
};
