![Deloitte Digital](https://raw.githubusercontent.com/DeloitteDigitalAPAC/eslint-config-deloitte/master/dd-logo.png)

# Webpack Config [![Build Status](https://travis-ci.org/DeloitteDigitalAPAC/webpack-config.svg?branch=master)](https://travis-ci.org/DeloitteDigitalAPAC/webpack-config)

Upgradeable collection of Webpack plugins, loaders and configuration for Deloitte Digital projects.

Rather than installing and configuring many different build tools, such as Webpack, React/Vue, Babel, Sass, and PostCSS,
you can simply use this *single* package and get these tools up and running in a flash, in a way that is consistent with
other Deloitte Digital FED projects.

**Guiding principles:**

- Build tools should be consistent across similar projects; this helps maintainability, on-boarding, and knowledge-sharing.
- Build tools should be maintained and continually improved in a central location.
- A workflow should be available to pull build tooling improvements into ongoing projects.

**The following project types are supported:**

- Web standards projects
- Vue.js projects
- React projects

## Table of contents

- [Included Packages](#included-packages)
	- [Core packages](#core-packages)
	- [Vue.js packages](#vuejs-packages)
	- [React packages](#react-packages)
- [Installation](#installation)
	- [Install for a standard js project](#install-for-a-standard-js-project)
	- [Install for a Vue.js project](#install-for-a-vuejs-project)
	- [Install for a React project](#install-for-a-react-project)
	- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
	- [npm start](#npm-start)
	- [npm run build](#npm-run-build)
	- [npm run lint](#npm-run-lint)
- [Options](#options)
	- [How to customise the webpack config](#how-to-customise-the-webpack-config)
	- [SASS](#sass)
- [Examples](#examples)
- [To do](#to-do)
- [FAQs](#faqs)
- [License information](#license-bsd-3-clause)

## Included Packages

### Core packages

| Name | Description |
|------|-------------|
| [**webpack**][1] | Webpack is the engine that allows us to process files and bundle them into packages according to rules that we specify. |
| [**babel-core**][2] | Babel is a JavaScript compiler. We write our JavaScript according to the latest spec (ESNext), and Babel compiles it into a specified format (see babel-preset-env). This package is the core compiler for Babel. |
| [**node-sass**][3] | The engine of the popular stylesheet preprocessor, Sass. |
| [**post-css**][4] | A tool for applying transformations to CSS, such as adding browser prefixes with Autoprefixer. |
| [**eslint-config-deloitte**][5] | Deloitte Digital's JavaScript code standards as an ESLint extensible config. Also includes the ESLint package. |
| [**stylelint-config-deloitte**][6] | Deloitte Digital's Sass code standards as a Stylelint extensible config. Also includes the Stylelint package. |

[1]: https://www.npmjs.com/package/webpack
[2]: https://www.npmjs.com/package/babel-core
[3]: https://www.npmjs.com/package/node-sass
[4]: https://github.com/postcss/postcss
[5]: https://www.npmjs.com/package/eslint-config-deloitte
[6]: https://www.npmjs.com/package/stylelint-config-deloitte

### Plugins and Loaders

| Name | Description |
|------|-------------|
| [**autoprefixer**][7] | A PostCSS plugin for adding browser prefixes to CSS. |
| [**babel-loader**][8] | The integration between Babel and Webpack. |
| [**babel-preset-env**][9] | Presets specify the output format for Babel. This preset allows us to generate ES5 output that will run on whichever browsers we specify. To specify which browsers are supported, add a `browserslist` entry to your project's `package.json` file. |
| [**clean-webpack-plugin**][10] | Cleans out the `dist` folder before starting a new build. |
| [**css-loader**][11] | A Webpack loader which allows us to load CSS files with `@import` and `url()`. |
| [**mini-css-extract-plugin**][12] | Webpack's architecture is built around JavaScript. Support has been added for CSS, however it results in CSS being embedded inside JavaScript files. This package allows us to export CSS into standalone files. |
| [**sass-loader**][13] | The integration between Sass and Webpack. |
| [**style-loader**][14] | Allows us to embed CSS into JavaScript. This is useful for functional CSS that is specifically related to a JavaScript module, for example the `.shade-bg` rule in [DD Shade](https://hub.deloittedigital.com.au/stash/projects/FED/repos/dd-shade/browse) |
| [**webpack-cli**][15] | The command line interface for Webpack allows us to enter Webpack commands into our project's `package.json` file. |
| [**webpack-serve**][16] | A lean, modern, and flexible Webpack development server which supports live reloading. |

[7]: https://www.npmjs.com/package/autoprefixer
[8]: https://www.npmjs.com/package/babel-loader
[9]: https://www.npmjs.com/package/babel-preset-env
[10]: https://www.npmjs.com/package/clean-webpack-plugin
[11]: https://www.npmjs.com/package/css-loader
[12]: https://www.npmjs.com/package/mini-css-extract-plugin
[13]: https://www.npmjs.com/package/sass-loader
[14]: https://www.npmjs.com/package/style-loader
[15]: https://www.npmjs.com/package/webpack-cli
[16]: https://www.npmjs.com/package/webpack-serve

### Vue.js packages

| Name | Description |
|------|-------------|
| [**vue-loader**][17] | A Webpack loader which allows us to use `*.vue` files. |
| [**vue-template-compiler**][18] 	| Used to pre-compile Vue templates into render functions |

[17]: https://www.npmjs.com/package/vue-loader
[18]: https://www.npmjs.com/package/vue-template-compiler

### React packages

| Name | Description |
|------|-------------|
| [**babel-preset-react**][19] 	| Strip flow types and transform JSX into createElement calls |

[19]: https://www.npmjs.com/package/babel-preset-react

**[⬆ back to top](#table-of-contents)**


## Installation

- [Install for a standard js project](#install-for-a-standard-js-project)
- [Install for a Vue.js project](#install-for-a-vuejs-project)
- [Install for a React project](#install-for-a-react-project)
- [Getting Started](#getting-started)

### Install for a standard js project

1. Add the package as a **dev dependency**, by running:

```bash
npm install @deloitte-digital-au/webpack-config --save-dev
```

2. Add a `webpack.config.js` file which imports **Webpack config**:

```js
const config = require('@deloitte-digital-au/webpack-config'); 

config.entry = {
    main: [
        './src/index.js',
    ],
};

module.exports = config;
```

3. Complete the [Getting Started](#getting-started) guide.


### Install for a Vue.js project

1. Add the package as a **dev dependency**, by running:

```bash
npm install @deloitte-digital-au/webpack-config-vuejs --save-dev
```

2. Add a `webpack.config.js` file which imports **Webpack Config Vue js**:

```js
const config = require('@deloitte-digital-au/webpack-config-vuejs');

config.entry = {
    main: [
        './src/index.js',
    ],
};

module.exports = config;
```

3. Complete the [Getting Started](#getting-started) guide.


### Install for a React project

1. Add the package as a **dev dependency**, by running:

```bash
npm install @deloitte-digital-au/webpack-config-react --save-dev
```

2. Add a `webpack.config.js` file which imports **Webpack Config React**:

```js
const config = require('@deloitte-digital-au/webpack-config-react');

config.entry = {
    main: [
        './src/index.js',
    ],
};

module.exports = config;
```

3. Complete the [Getting Started](#getting-started) guide.


### Getting Started

#### 1. Browsers

Add a `browserslist` property to your project's `package.json` file to define supported browsers:

```json
"browserslist": [
  "last 3 versions",
  "IE 11",
  "iOS >= 8"
]
```

Autoprefixer and Babel will refer to this `browserslist` property to determine the output format for CSS and JavaScript.

> ℹ️ Alternatively you can choose to specify your supported browsers in a `.browserslistrc` file.

#### 2. Babel

Add a `babel` property to your project's `package.json` file to specify Babel options.

It is recommended to use the `env` preset, which tells Babel to generate ES5 output that will run on whichever browsers 
we specify as supported browsers.

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

> ℹ️ Alternatively you can choose to specify your Babel config in a `.babelrc` file.

#### 3. Linters

3.1 Add an ESLint configuration file called `.eslintrc.js` to your project:

```js
module.exports = {
    extends: [
        'eslint-config-deloitte',
    ],
};
```

3.2 Add a Stylelint configuration file called `.stylelint.js` to your project:

```js
module.exports = {
    extends: [
        'stylelint-config-deloitte',
    ],
};
```

#### 4. Scripts

Add `build`, `start`, and `lint` scripts to your project's `package.json` file:

```json
"scripts": {
  "build": "webpack --mode production",
  "start": "webpack-serve --config webpack.config.js --open",
  "lint": "lint:js && lint:styles",
  "lint:js": "eslint \"**/*.js\"",
  "lint:styles": "stylelint \"**/*.scss\"",
}
```

**[⬆ back to top](#table-of-contents)**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs a local development server, rebuilds bundles when the source files change, and live-reload in the browser.

### `npm run build`

Builds the app for production to the dist folder.
It correctly bundles in production mode and optimizes the build for the best performance.

### `npm run lint`

Lint's the JavaScript and Scss files in the src directory.

If errors are reported, ESLint may be able to fix them automatically for you. Just run:

```bash
./node_modules/.bin/eslint --fix "./src/**/*.js"
```

> ℹ️ Make sure you review the changes ESLint made before you commit them.

You can run the linters individually with: `npm run lint:js` and `npm run lint:styles`.

**[⬆ back to top](#table-of-contents)**

## Options

### How to customise the webpack config

`@deloitte-digital-au/webpack-config` returns a [preconfigured Webpack configuration](https://github.com/DeloitteDigitalAPAC/webpack-config/blob/master/packages/webpack-config/src/index.js). 
You can modify this as you need, 
for example by adding an [entry](https://webpack.js.org/configuration/entry/) property.

You can put multiple source files into one bundle:

```js
config.entry = {
    main: [
        './src/index.js',
        './src/style.scss',
    ],
};
```

Or add a new plugin

```js
config.plugins.push(/* NEW PLUGIN HERE*/);
```

### SASS

Stylesheets will be extracted into standalone CSS files by default. If you would like them to be embedded into 
the JavaScript file, use an extension of `.js.scss`.

**[⬆ back to top](#table-of-contents)**

## Examples

Refer to the demo folders in the 
[packages folder](https://github.com/DeloitteDigitalAPAC/webpack-config/tree/master/packages).

**[⬆ back to top](#table-of-contents)**

## To do

- Publish to npm
- Add SVG optimisation pipeline with SVGO
- Add prettier.io (first create prettier-config-deloitte package)

**[⬆ back to top](#table-of-contents)**

## FAQs

**Q: What if I want to install a newer version of `eslint-config-deloitte`, which has not yet been released in 
`@deloitte-digital-au/webpack-config`?**

A: You can still `npm install eslint-config-deloitte` in your project. Then your project will use this version of 
`eslint-config-deloitte` instead of the version that is installed via `@deloitte-digital-au/webpack-config`.

**[⬆ back to top](#table-of-contents)**

## Known issues

**Incorrect URLs in some source maps**

Source maps for SCSS files embedded inside JS files have incorrect URLs 
https://github.com/webpack-contrib/css-loader/issues/652

**Webpack generates extraneous JavaScript for CSS files**

If you define an entry with CSS but no JavaScript, Webpack will still output a (useless) JavaScript file for the entry 
along with the CSS. For example if you did this:

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

**[⬆ back to top](#table-of-contents)**

## Who is Deloitte Digital?

**Part Business. Part Creative. Part Technology. One hundred per cent digital.**

Pioneered in Australia, Deloitte Digital is committed to helping clients unlock the business value of emerging 
technologies. We provide clients with a full suite of digital services, covering digital strategy, user experience, 
content, creative, engineering and implementation across mobile, web and social media channels.

[http://www.deloittedigital.com/au](http://www.deloittedigital.com/au)

## LICENSE (BSD-3-Clause)
[View License](LICENSE)

**[⬆ back to top](#table-of-contents)**
