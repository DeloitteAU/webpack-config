module.exports = function() {

	const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
	const isTest = env === 'test';
	const isDevelopment = env === 'development';
	const isProduction = env === 'production';

	if (!isTest && !isDevelopment && !isProduction) {
		throw new Error(`Please specify BABEL_ENV or NODE_ENV to either "test", "development" or "production". Received "${JSON.stringify(env)}".`);
	}

	return {

		presets: [
			isTest && [
				require('@babel/preset-env').default,
				{
					target: {
						node: 'current',
					},
				},
			],
			!isTest && [
				require('@babel/preset-env').default,
				{
					// Lets not transform modules to commons js
					modules: false,
					// replaces the statement import "@babel/polyfill" or require("@babel/polyfill")
					// with individual requires for @babel/polyfill based on browser environment.
					useBuiltIns: 'usage',
				},
			],
		].filter(Boolean),

		plugins: [
			// destrucuring plugin is required until https://github.com/babel/babel/issues/7215 is resolved
			// then we can deprecate in favour for env
			require('@babel/plugin-transform-destructuring').default,

			// enable class properties transform
			[
				require('@babel/plugin-proposal-class-properties').default,
				{
					// Use assignment expression instead of Object.defineProperty to develop against spec.
					// when env targets "latest chrome version"
					loose: true,
				},
			],

			// Transform rest spreads plugin
			// This assumes Object.assign is available
			[
				require('@babel/plugin-proposal-object-rest-spread').default,
				{
					useBuiltIns: true,
				},
			],

			// Polyfills the runtime needed for async/await and generators
			// This assumes Object.assign is available
			[
				require('@babel/plugin-transform-runtime').default,
				{
					helpers: false,
					regenerator: true,
				},
			],

			// Adds syntax support for import()
			require('@babel/plugin-syntax-dynamic-import').default,

			// Transform generator functions
			// however async functions are converted to generators by @babel/preset-env
			[
				require('@babel/plugin-transform-regenerator').default,
				{
					async: false,
				},
			],

			isTest &&
				// Transform dynamic import to require
				require('babel-plugin-dynamic-import-node'),
		].filter(Boolean),
	};
};
