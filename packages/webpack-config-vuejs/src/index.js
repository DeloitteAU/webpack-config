const { config, loaders } = require('@deloitte-digital-au/webpack-config');

loaders.vueLoader = {
	loader: 'vue-loader',
};

config.module.rules.push({
	test: /\.vue$/,
	use: loaders.vueLoader,
});

config.resolve = {
	alias: {
		vue$: 'vue/dist/vue.esm.js',
	},
	extensions: ['*', '.js', '.vue', '.json'],
};

module.exports = {
	config,
	loaders,
};
