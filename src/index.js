const autoprefixer = require('autoprefixer')();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const dd = require('./dd.js');

dd();
console.log('dd-fed-build');
console.log('Current working directory:', process.cwd());

const production = (!process.env.WEBPACK_SERVE);
const mode = (production ? 'production' : 'development');

const cssLoaders = [{
	loader: 'css-loader',
	options: {
		sourceMap: true,
		minimize: production,
	},
}, {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		plugins: () => [
			autoprefixer,
		],
	},
}, {
	loader: 'sass-loader',
	options: {
		sourceMap: true,
	},
}];

const config = {
	mode,
	output: {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'dist'),
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				oneOf: [
					{
						// If the extension is .js.scss, leave the CSS embedded in the JS file
						test: /\.js\.scss$/,
						use: ['style-loader', ...cssLoaders],
					}, {
						// Otherwise, extract the CSS into its own file
						use: [MiniCssExtractPlugin.loader, ...cssLoaders],
					},
				],
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
};

config.plugins = [
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[id].css',
	}),
];

if (production) {
	config.devtool = '#source-map'; // Slow to generate, but keeps JS and CSS small because Sourcemap is in separate file

	config.plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production'),
	}));

	config.plugins.push(new CleanWebpackPlugin(['*'], {
		get root() {
			// CleanWebpackPlugin does not provide an option for reading from output.path
			const pathToDelete = config.output.path;
			const root = process.cwd();
			if (pathToDelete.indexOf(root) === -1) {
				throw 'output.path must be inside the project root';
			} else {
				return pathToDelete;
			}
		},
		set root(val) {
			// CleanWebpackPlugin root is linked to output.path and cannot be modified
		},
	}));
} else {
	config.devtool = '#eval-source-map'; // Fast to generate

	config.serve = {
		dev: {
			get publicPath() { return config.output.publicPath; },
			set publicPath(val) {
				console.warn('serve.dev is linked to output.publicPath and cannot be modified.');
			},
		},
	};
}

module.exports = config;
