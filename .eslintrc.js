module.exports = {
	extends: [
		'eslint-config-deloitte',
	],
	overrides: [
		{
			files: [
				'test/test.js',
			],
			env: {
				node: true,
				mocha: true,
			},
		},
	],
};
