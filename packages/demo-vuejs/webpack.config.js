const { createConfig } = require('@deloitte-digital-au/webpack-config-vuejs');

module.exports = createConfig(({ mode }) => {
	return {
		entry: {
			main: [
				'./src/index.js',
				'./src/style.scss',
			],
		},
	};
});
