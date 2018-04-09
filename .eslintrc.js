module.exports = {
	extends: [
		'eslint-config-deloitte',
	],
	overrides: [
		{
			files: [
				'src/**/*.js',
			],
			env: {
				node: true,
			},
		},
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
