module.exports = {
	extends: [
		'eslint-config-deloitte',
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
