# DD FED build

This project is a Deloitte Digital curated collection of Webpack plugins, loaders and configuration. Rather than installing and configuring many different npm dependencies on your project, you can simply add this one, and get up and running with Webpack in a way that is consistent with other Deloitte Digital FED projects.

The following project types are supported:

- Web standards projects
- Vue.js projects

Support for React has not yet been added. Other TODO tasks are listed at the bottom of the page.

## Example repositories using this configuration

- [DD Shade](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-shade/browse)
- [DD Offscreen](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-offscreen/browse)
- [Vue.js demo](https://hub.deloittedigital.com.au/stash/projects/FED/repos/vuejs-demo/browse)

## Packages included with DD FED build

### Core packages

| Name                            | Description                                                                                                                                                                                                                                                |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **webpack**                     | Webpack is the engine that allows us to process files and bundle them into packages according to rules that we specify.                                                                                                                                    |
| **babel-core**                  | Babel is a JavaScript compiler. We write our JavaScript according to the latest spec (ESNext), and Babel compiles it into a specified format (see babel-preset-env). This package is the core compiler for Babel.                                          |
| **node-sass**                   | The engine of the popular stylesheet preprocessor, Sass.                                                                                                                                                                                                   |
| **eslint-config-deloitte**      | Deloitte Digital's JavaScript code standards as an ESLint extensible config. Also includes the ESLint package.                                                                                                                                             |
| **stylelint-config-deloitte**   | Deloitte Digital's Sass code standards as a Stylelint extensible config. Also includes the Stylelint package.                                                                                                                                              |

### Helper packages

| Name                            | Description                                                                                                                                                                                                                                                |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **babel-loader**                | The integration between Babel and Webpack.                                                                                                                                                                                                                 |
| **babel-preset-env**            | Presets specify the output format for Babel. This preset allows us to generate ES5 output that will run on whichever browsers we specify. To specify which browsers are supported, add a `browserslist` entry to your project's `package.json` file.       |
| **clean-webpack-plugin**        | Cleans out the `dist` folder before starting a new build.                                                                                                                                                                                                  |
| **css-loader**                  | A Webpack loader which allows us to load CSS files with `@import` and `url()`.                                                                                                                                                                             |
| **mini-css-extract-plugin**     | Webpack's architecture is built around JavaScript. Support has been added for CSS, however it results in CSS being embedded inside JavaScript files. This package allows us to export CSS into standalone files.                                           |
| **sass-loader**                 | The integration between Sass and Webpack.                                                                                                                                                                                                                  |
| **style-loader**                | Allows us to embed CSS into JavaScript. This is useful for functional CSS that is specifically related to a JavaScript module, for example the `.shade-bg` rule in [DD Shade](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-shade/browse) |
| **webpack-cli**                 | The command line interface for Webpack allows us to enter Webpack commands into our project's `package.json` file.                                                                                                                                         |
| **webpack-serve**               | A lean, modern, and flexible Webpack development server which supports live reloading.                                                                                                                                                                     |

### Vue.js packages

| Name                            | Description                                                                                                                                                                                                                                                |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **vue-loader**                  | A Webpack loader which allows us to use `*.vue` files.                                                                                                                                                                                                     |
| **vue-template-compiler**       | Used to pre-compile Vue templates into render functions to avoid runtime-compilation overhead and CSP restrictions.                                                                                                                                        |

## Installation

1. Add the package as a **dev dependency**, by running:

**Web standards projects**

```bash
npm install git+ssh://git@hub.deloittedigital.com.au:7999/fed/dd-fed-build --save-dev
```

**Vue.js projects**

```bash
npm install git+ssh://git@hub.deloittedigital.com.au:7999/fed/dd-fed-build-vuejs --save-dev
```

2. Add a `webpack.config.js` file, which imports the default config file from **DD FED build** and extends it, specifying entry points:

```js
const config = require('dd-fed-build'); // For Vue.js projects use 'dd-fed-build-vuejs' instead

config.entry = {
	main: [
		'./src/index.js',
	],
};

module.exports = config;
```

You can put multiple source files into one bundle:

```js
config.entry = {
	main: [
		'./src/index.js',
		'./src/style.scss',
	],
};
```

Stylesheets will be extracted into standalone CSS files by default. If you would like them to be embedded into the JavaScript file, use an extension of `.js.scss`.

3. Add a `browserslist` property to your project's `package.json` file:

```json
"browserslist": [
  "last 3 versions",
  "IE 11",
  "iOS >= 8"
]
```

4. Add an ESLint configuration file called ``.eslintrc.js` to your project:

```js
module.exports = {
	extends: [
		'eslint-config-deloitte',
	],
};
```

5. Add a Stylelint configuration file called ``.stylelint.js` to your project:

```js
module.exports = {
	extends: [
		'stylelint-config-deloitte',
	],
};
```

6. Add `build`, `dev`, `eslint` and `stylelint` scripts to your project's `package.json` file:

```json
"scripts": {
  "build": "webpack --mode production",
  "dev": "webpack-serve --config webpack.config.js --open",
  "eslint": "eslint \"**/*.js\"",
  "stylelint": "stylelint \"**/*.scss\""
}
```

## Usage

To run a local development server, rebuild bundles when the source files change, and live-reload in the browser, run:

```bash
npm run dev
```

To generate an artefact for production, run:

```bash
npm run build
```


## To do

- Publish to npm
- Add the necessary packages for React
