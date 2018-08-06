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
// so we have to manually update the CSS post loader
mergedConfig.module.rules.find(rule => {
	return (String(rule.test) === '/(\\.css)|(\\.scss)$/' && rule.hasOwnProperty('oneOf'));
}).oneOf.splice(0, 0, {
	issuer: /\.vue$/,
	use: 'vue-style-loader',
});

// Object.defineProperty(RegExp.prototype, 'toJSON', {
// 	value: RegExp.prototype.toString,
// });
// console.log(JSON.stringify(mergedConfig, null, ' '));

module.exports = mergedConfig;
