const config = require('@deloitte-digital-au/webpack-config-react');
const merge = require('webpack-merge');

const mergedConfig = merge.smart(config, {
	entry: {
		main: [
			'./src/index.jsx',
		],
	},
});

module.exports = mergedConfig;
