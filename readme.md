# DD FED build

This package defines a collection of build tools and a base Webpack configuration file. Rather than selecting and configuring many different npm dependencies to your project, you can simply add this one, and get up and running with Webpack in a way that is consistent with other Deloitte Digital FED projects.

It is not yet configured for React or Vue.js projects.

## Example repositories using this configuration

- [DD Shade](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-shade/browse)
- [DD Offscreen](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-offscreen/browse)

## Packages included with DD FED build

### Core packages

| Name                        | Description                                                                                                                                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| webpack                     | Webpack is the engine that allows us to process files and bundle them into packages according to rules that we specify.                                                                                                                                    |
| babel-core                  | Babel is a JavaScript compiler. We write our JavaScript according to the latest spec (ESNext), and Babel compiles it into a specified format (see babel-preset-env). babel-core is the core compiler for Babel.                                            |
| node-sass                   | The engine of the popular stylesheet preprocessor, Sass.                                                                                                                                                                                                   |

### Helper packages

| Name                        | Description                                                                                                                                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| babel-loader                | The integration between Babel and Webpack.                                                                                                                                                                                                                 |
| babel-preset-env            | Presets specify the output format for Babel. This preset allows us to generate ES5 output that will run on whichever browsers we specify. To specify which browsers are supported, add a `browserslist` entry to your project's package.json file.         |
| clean-webpack-plugin        | Cleans out the "dist" folder before starting a new build.                                                                                                                                                                                                  |
| css-loader                  | A Webpack loader which allows us to load CSS files with `@import` and `url()`.                                                                                                                                                                             |
| extract-text-webpack-plugin | Webpack's architecture is built around JavaScript. Support has been added for CSS, however it results in CSS being embedded inside JavaScript files. extract-text-webpack-plugin allows us to export CSS into standalone files.                            |
| sass-loader                 | The integration between Sass and Webpack.                                                                                                                                                                                                                  |
| style-loader                | Allows us to embed CSS into JavaScript. This is useful for functional CSS that is specifically related to a JavaScript module, for example the `.shade-bg` rule in [DD Shade](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-shade/browse) |
| webpack-cli                 | The command line interface for Webpack allows us to enter Webpack commands into our project's package.json file.                                                                                                                                           |
| webpack-serve               | A lean, modern, and flexible Webpack development server which supports live reloading.                                                                                                                                                                     |

## Installation

1. Add the package as a **dev dependency**, by running:

`npm install git+ssh://git@hub.deloittedigital.com.au:7999/fed/dd-fed-build --save-dev`

2. Add a `browserslist` property to your project's package.json file:

```
"browserslist": [
  "last 3 versions",
  "IE 11",
  "iOS >= 8"
]
```

3. Add a webpack.config.js file, which imports the default config file from **DD FED build** and extends it, specifying entry points:

```
const defaultConfig = require('dd-fed-build');

module.exports = defaultConfig;

module.exports.entry = {
	main: [
		'./src/index.js'
	]
};
```

You can put multiple source files into one bundle:

```
module.exports.entry = {
	main: [
		'./src/index.js',
		'./src/style.scss'
	]
};
```

Stylesheets will be extracted into standalone CSS files by default. If you would like them to be embedded into the JavaScript file, use an extension of `.js.scss`.

4. Add a `build` and `dev` script to your project's package.json file:

```
"scripts": {
  "build": "webpack --mode production",
  "dev": "webpack-serve --config webpack.config.js --open",
}
```

## Usage

To run a local development server, rebuild bundles when the source files change, and live-reload in the browser, run `npm run dev`.

To generate an artefact for production, run `npm run build`.


## To do

- Add the necessary packages for React and Vue.js
- Add linting tools, but make sure they only run on build, not watch
- Publish to npm
