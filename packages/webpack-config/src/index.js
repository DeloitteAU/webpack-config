const autoprefixer = require('autoprefixer')();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const dd = require('./dd.js');

dd();
console.log('Webpack Config Deloitte');
console.log('Current working directory:', process.cwd());

// Use the server mode variable to determine config settings
const isProduction = (!process.env.WEBPACK_SERVE);

// style loaders
const cssLoaders = [
	// 'css' loader resolves paths in CSS and adds assets as dependencies.
	{
		loader: 'css-loader',
		options: {
			sourceMap: !isProduction,
			minimize: isProduction,
		},
	},
	// 'postcss' loader automatically applies browser prefixes to our css.
	{
		loader: 'postcss-loader',
		options: {
			sourceMap: !isProduction,
			plugins: () => [
				autoprefixer,
			],
		},
	},
	// 'sass' loader converts our sass to css
	{
		loader: 'sass-loader',
		options: {
			sourceMap: !isProduction,
			// Set scss debug flag
			data: `$IS_DEBUG: ${!isProduction};`,
		},
	},
];

// Base config
// https://webpack.js.org/configuration/#options
const config = {

	// Chosen mode tells webpack to use its built-in optimizations accordingly.
	mode: isProduction ? 'production' : 'development', // or 'none'

	// Output options related to how webpack emits results
	// https://webpack.js.org/configuration/output/
	output: {
		// name of each output bundle
		filename: '[name].bundle.js',
		// the name of non-entry chunk files.
		chunkFilename: '[name].[chunkhash].chunk.js',
		// The output directory as an absolute path.
		// Resolve the path from the cwd. This is so everything resolves correctly
		// when being executed as a node_modules dependency
		path: path.resolve(process.cwd(), 'dist'),
		// path to resolve dynamic resources
		publicPath: '/dist/',
	},

	// Resolve options
	// https://webpack.js.org/configuration/resolve/
	resolve: {
		// Automatically resolve these extensions
		extensions: ['.js', '.json', '.css', '.scss'],
		// Create alias to src folder
		alias: {
			'~': path.resolve(process.cwd(), 'src'),
		},
	},

	// Module options
	// These options determine how the different types of modules within a project will be treated.
	// https://webpack.js.org/configuration/module/
	module: {
		// Make missing exports throw an error
		strictExportPresence: true,
		rules: [
			// Disable require.ensure as it's not a standard language feature.
			{
				parser: { requireEnsure: false },
			},

			// Style loaders
			{
				test: /\.scss$/,

				// 'oneOf' will traverse all following loaders until one will
				// match the requirements.
				oneOf: [
					{
						// If the extension is .js.scss, leave the CSS embedded in the JS file
						test: /\.js\.scss$/,
						use: ['style-loader', ...cssLoaders],
					},
					{
						// Otherwise, extract the CSS into its own file
						use: [MiniCssExtractPlugin.loader, ...cssLoaders],
					},
				],
			},

			// 'babel' loader transpiles our javascript to ensure browser compatability
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},

	plugins: [
		// Extract the styles into their own file
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],

};


if (isProduction) {

	// Makes some environment variables available to the JS code, for example:
	config.plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production'),
	}));

	// Clean the output directory before a build
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

	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	config.devtool = 'cheap-module-source-map';

	// Makes some environment variables available to the JS code, for example:
	config.plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development'),
	}));

	// Add module names to factory functions so they appear in browser profiler.
	config.plugins.push(new webpack.NamedModulesPlugin());

	config.serve = {
		// Silence WebpackServer's own logs since they're generally not useful.
		logLevel: 'error',

		hot: true,

		dev: {
			get publicPath() { return config.output.publicPath; },
			set publicPath(val) {
				throw new Error('serve.dev is immutable. Please modify "output.publicPath" instead.');
			},
		},
	};
}

module.exports = config;
