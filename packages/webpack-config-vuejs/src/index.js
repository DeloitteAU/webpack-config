const { baseConfig, mergeConfig } = require('@deloitte-digital-au/webpack-config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const vueConfig = mergeConfig(baseConfig, ({ mode }) => {
	return {
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: ['vue-loader'],
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
	};
});

// webpack-merge does not support merging rules with the `oneOf` property,
// so we have to manually update the CSS post loader
vueConfig.module.rules.find(rule => {
	return (String(rule.test) === '/(\\.css)|(\\.scss)$/' && rule.hasOwnProperty('oneOf'));
}).oneOf.splice(0, 0, {
	issuer: /\.vue$/,
	use: 'vue-style-loader',
});

// Object.defineProperty(RegExp.prototype, 'toJSON', {
// 	value: RegExp.prototype.toString,
// });
// console.log(JSON.stringify(vueConfig, null, ' '));

const createConfig = userConfig => {
	return mergeConfig(vueConfig, userConfig);
};

module.exports = {
	baseConfig: vueConfig,
	createConfig,
	mergeConfig,
};
