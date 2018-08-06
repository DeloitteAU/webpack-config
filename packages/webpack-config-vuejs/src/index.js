const config = require('@deloitte-digital-au/webpack-config');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mergedConfig = merge.smart(config, {
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['.vue'],
	},
});

// webpack-merge does not support merging rules with the `oneOf` property,
// so we have to manually update the SCSS loader to the merged config
mergedConfig.module.rules.find(rule => {
	return (String(rule.test) === '/\\.scss$/' && rule.hasOwnProperty('oneOf'));
}).oneOf.splice(0, 0, {
	issuer: /\.vue$/,
	use: 'vue-style-loader',
});

module.exports = mergedConfig;
