const config = require('@deloitte-digital-au/webpack-config-react-typescript');

module.exports = {
	...config,
	entry:{
		...(config.entry || {}),
		main: [
			'./src/index.tsx',
		],
	}
}
