const config = require('webpack-config-deloitte');

config.module.rules.push({
	test: /\.vue$/,
	loader: 'vue-loader',
});

config.resolve = {
	alias: {
		vue$: 'vue/dist/vue.esm.js',
	},
	extensions: ['*', '.js', '.vue', '.json'],
};

module.exports = config;
