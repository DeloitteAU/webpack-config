module.exports = {
	extends: [
		'@deloitte-digital-au/eslint-config',
	],
	env: {
		node: true,
	},
	overrides: [
		{
			files: [
				'test/test.js',
			],
			env: {
				mocha: true,
			},
		},
	],
};
