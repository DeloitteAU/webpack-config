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
				'tests/**/*.js',
			],
			env: {
				mocha: true,
			},
			globals: {
				cy: true,
				expect: true,
			}
		},
	],
};
