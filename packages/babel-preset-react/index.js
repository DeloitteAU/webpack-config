const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

module.exports = {
	presets: [
		// Extends base presets
		require("@deloitte-digital-au/babel-preset"),
		[
			// Transforms JSX
			require('@babel/preset-react').default,
			{
				// Show component stack to warning messages
				// Adds __self attribute to JSX which React will use for some warnings
				development: env !== 'production',
				// Will use the native built-in instead of trying to polyfill
				// behavior for any plugins that require one.
				useBuiltIns: true,
			},
		],
	],
	plugins: [
		(env === 'production') && [
			// Remove PropTypes from production build
			require('babel-plugin-transform-react-remove-prop-types').default,
			{
				removeImport: true,
			},
		],
	],
};
