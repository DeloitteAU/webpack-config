# Deloitte Digital Webpack Config [![Build Status](https://travis-ci.org/DeloitteDigitalAPAC/webpack-config.svg?branch=master)](https://travis-ci.org/DeloitteDigitalAPAC/webpack-config)

Upgradeable collection of Webpack plugins, loaders and configuration for Deloitte Digital projects.

Rather than installing and configuring many different build tools, such as Webpack, Babel, Sass, and PostCSS, you can simply `npm install @deloitte-digital-au/webpack-config --save-dev`, and get these tools up and running in a flash, in a way that is consistent with other Deloitte Digital FED projects.

**Guiding principles:**

- Build tools should be consistent across similar projects; this helps maintainability, on-boarding, and knowledge-sharing.
- Build tools should be maintained and continually improved in a central location.
- A workflow should be available to pull build tooling improvements into ongoing projects.

**The following project types are supported:**

- Web standards projects
- Vue.js projects
- React projects

## Example repositories using this configuration

Refer to the demo folders in the [packages folder](https://github.com/DeloitteDigitalAPAC/webpack-config/tree/master/packages).

## Packages included with Deloitte Digital Webpack Config

### Core packages

| Name                            | Description                                                                                                                                                                                                                                                |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **webpack**                     | Webpack is the engine that allows us to process files and bundle them into packages according to rules that we specify.                                                                                                                                    |
| **babel-core**                  | Babel is a JavaScript compiler. We write our JavaScript according to the latest spec (ESNext), and Babel compiles it into a specified format (see babel-preset-env). This package is the core compiler for Babel.                                          |
| **node-sass**                   | The engine of the popular stylesheet preprocessor, Sass.                                                                                                                                                                                                   |
| **post-css**                    | A tool for applying transformations to CSS, such as adding browser prefixes with Autoprefixer.                                                                                                                                                             |
| **eslint-config-deloitte**      | Deloitte Digital's JavaScript code standards as an ESLint extensible config. Also includes the ESLint package.                                                                                                                                             |
| **stylelint-config-deloitte**   | Deloitte Digital's Sass code standards as a Stylelint extensible config. Also includes the Stylelint package.                                                                                                                                              |

### Helper packages

| Name                            | Description                                                                                                                                                                                                                                                |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **autoprefixer**                | A PostCSS plugin for adding browser prefixes to CSS.                                                                                                                                                                                                       |
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

### React packages

| Name 						| Description 													|
| ------------------------- | ------------------------------------------------------------- |
| **babel-preset-react** 	| Strip flow types and transform JSX into createElement calls 	|

## Installation

1. Add the package as a **dev dependency**, by running:

**Web standards projects**

```bash
npm install @deloitte-digital-au/webpack-config --save-dev
```

**Vue.js projects**

```bash
npm install @deloitte-digital-au/webpack-config-vuejs --save-dev
```

**React projects**

```bash
npm install @deloitte-digital-au/webpack-config-react --save-dev
```

2. Add a `webpack.config.js` file which imports **Webpack Config Deloitte**:

```js
const config = require('@deloitte-digital-au/webpack-config'); 
// const config = require('@deloitte-digital-au/webpack-config-vuejs'); // For Vue.js projects use this instead
// const config = require('@deloitte-digital-au/webpack-config-react'); // For React projects use this instead

config.entry = {
	main: [
		'./src/index.js',
	],
};

module.exports = config;
```

`@deloitte-digital-au/webpack-config` returns a Webpack configuration. You can modify this as you need, for example by adding an [entry](https://webpack.js.org/configuration/entry/) property.

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

3. Add a `browserslist` property to your project's `package.json` file to define supported browsers:

```json
"browserslist": [
  "last 3 versions",
  "IE 11",
  "iOS >= 8"
]
```

Autoprefixer and Babel will refer to this `browserslist` property to determine the output format for CSS and JavaScript.

Alternatively you can choose to specify your supported browsers in a `.browserslistrc` file.

4. Add a `babel` property to your project's `package.json` file to specify Babel options.

It is recommended to use the `env` preset, which tells Babel to generate ES5 output that will run on whichever browsers we specify as supported browsers.

```json
"babel": {
  "presets": [
    "env"
  ]
}
```

For React projects, use:

```json
"babel": {
  "presets": [
	"react"
    "env"
  ]
}
```

Alternatively you can choose to specify your Babel config in a `.babelrc` file.

5. Add an ESLint configuration file called `.eslintrc.js` to your project:

```js
module.exports = {
	extends: [
		'eslint-config-deloitte',
	],
};
```

6. Add a Stylelint configuration file called `.stylelint.js` to your project:

```js
module.exports = {
	extends: [
		'stylelint-config-deloitte',
	],
};
```

7. Add `build`, `start`, `eslint` and `stylelint` scripts to your project's `package.json` file:

```json
"scripts": {
  "build": "webpack --mode production",
  "start": "webpack-serve --config webpack.config.js --open",
  "eslint": "eslint \"**/*.js\"",
  "stylelint": "stylelint \"**/*.scss\""
}
```

## Usage

### Dev

To run a local development server, rebuild bundles when the source files change, and live-reload in the browser, run:

```bash
npm start
```

### Build

To generate an artefact for production, run:

```bash
npm run build
```

### Linting

To lint the JavaScript files, run:

```bash
npm run eslint
```

If errors are reported, ESLint may be able to fix them automatically for you. Just run:

```bash
./node_modules/.bin/eslint --fix "./src/**/*.js"
```

Make sure you review the changes ESLint made before you commit them.

To lint the SCSS files, run:

```bash
npm run stylelint
```


## To do

- Publish to npm
- Add SVG optimisation pipeline with SVGO
- Add prettier.io (first create prettier-config-deloitte package)

## FAQ

### What if I want to install a newer version of `eslint-config-deloitte`, which has not yet been released in `@deloitte-digital-au/webpack-config`?

You can still `npm install eslint-config-deloitte` in your project. Then your project will use this version of `eslint-config-deloitte` instead of the version that is installed via `@deloitte-digital-au/webpack-config`.


## Known issues

**Incorrect URLs in some source maps**

Source maps for SCSS files embedded inside JS files have incorrect URLs https://github.com/webpack-contrib/css-loader/issues/652

**Webpack generates extraneous JavaScript for CSS files**

If you define an entry with CSS but no JavaScript, Webpack will still output a (useless) JavaScript file for the entry along with the CSS. For example if you did this:

```js
config.entry = {
	main: [
		'./script.js',
	],
	style: [
		'./style.scss', // Not recommended to have an entry with just CSS
	],
};
```

Then three files would be generated:

- `main.js` (good)
- `style.css` (good)
- `style.js` (useless)

To avoid this it is recommended to attach your CSS to an entry that also has JavaScript. For example:

```js
config.entry = {
	main: [
		'./script.js',
		'./style.scss',
	],
};
```

This will only generate two files:

- `main.js` (good)
- `main.css` (good)
