const { createConfig } = require('@deloitte-digital-au/webpack-config-react');

module.exports = createConfig(({ mode }) => {
	return {
		entry: {
			main: [
				'./src/index.jsx',
			],
		},
	};
});
