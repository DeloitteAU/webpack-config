const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer')();
const path = require('path');
const dd = require('./dd.js');

dd();
console.log('dd-fed-build');
console.log('Current working directory:', process.cwd());

/**
 * Generate a Webpack configuration object.
 * @param {Object} options
 * @param {Object} options.output - This object will be used as the Webpack output configuration https://webpack.js.org/concepts/output/
 */
const generateConfig = (options = {}) => {
	const production = (!process.env.WEBPACK_SERVE);

	const output = {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'dist'),
		publicPath: '/dist/',
		...options.output,
	};

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
		mode: (production ? 'production' : 'development'),
		devtool: (production ? '#source-map' : '#eval-source-map'),
		output,
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
		plugins: [
			new CleanWebpackPlugin([output.path], {
				root: process.cwd(),
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
		],
	};

	if (!production) {
		config.serve = {
			dev: {
				publicPath: output.publicPath,
			},
		};
	}

	return config;
};

module.exports = generateConfig;
