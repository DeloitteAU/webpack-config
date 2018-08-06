const config = require('@deloitte-digital-au/webpack-config-vuejs');
const merge = require('webpack-merge');

const mergedConfig = merge.smart(config, {
	entry: {
		main: [
			'./src/index.js',
			'./src/style.scss',
		],
	},
});

module.exports = mergedConfig;
