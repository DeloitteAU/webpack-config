# Changelog

## 1.0.1

- Added cssnano plugin to postcss-loader to optimise CSS
- Update dependency style-loader to ^0.22.0
- Update dependency webpack-cli to v3
- Update dependency postcss-loader to v3
- Update dependency css-loader to v1

## 1.0.0

- Upgraded API to expose `createConfig` function (see breaking changes below)
- Updated loaders for CSS delivery (`mini-css-extract-plugin-loader` vs `style-loader`) (see breaking changes below)
- Added loaders for CSS files (previously only SCSS files were supported)
- Improved unit tests for `build`
- Added functional tests for `watch`
- Updated dependency vue-loader to v15
- Update babel monorepo dependencies to v7.0.0-beta.55
- Update dependency autoprefixer to v9

### Breaking Changes

**1.**

Previously we exported a single config object. Now we export `{ baseConfig, createConfig, mergeConfig }`.

**Previously, the base config was extended like this:**

```js
const config = require('@deloitte-digital-au/webpack-config');

config.entry = {
    main: [
        './src/index.js',
    ],
};

module.exports = config;
```

**Now, the base config is extended like this:**

```js
const { createConfig } = require('@deloitte-digital-au/webpack-config');

module.exports = createConfig({
    entry: {
        main: [
            './src/index.js',
        ],
    },
});
```

**2.**

The module rule matching files with an extension of `.js.scss` has been removed. If you would like your CSS to be embedded into a JavaScript file and served with `style-loader`, simply `import` it into a JavaScript file. If you would like your CSS to be extracted to a CSS file, add it to an entry point or `@import` it into another CSS / SCSS file.

## 0.0.8

- Update babel monorepo dependencies to v7.0.0-beta.55
- Update dependency autoprefixer to v9

## 0.0.7

- Fixed missing `'@babel/runtime/regenerator'` issue

## 0.0.6

- Upgraded to Babel 7
- Added scoped babel preset packages
- Class properties is now supported out of the box
- Webpack dynamic imports is now supported out of the box [#23](https://github.com/DeloitteDigitalAPAC/webpack-config/issues/23)
- Destructuring is now supported out of the box
- Generators is now supported out of the box
- Babel env is now supported out of the box

### Breaking Changes

**1.**

You will need to make changes to your `.babelrc` or `babel` property in the package.json file.

If not using React, Change:

`presets: ["env"]`

for `presets: ["@deloitte-digital-au/babel-preset-app"]`

Or if using React, change:

`presets: ["env", "react"]`

for `presets: ["@deloitte-digital-au/babel-preset-app-react"]`

**2.**

Install babel 7 cli.

`npm install @babel/cli --save-dev`

**3.**

Upgrade to the babel 7 polyfill if you are using a polyfill

`npm uninstall babel-polyfill --save-dev`

`npm install @babel/polyfill --save-dev`

## 0.0.5

- Added support for environment to be defined in NODE_ENV environment variable or Webpack CLI's `--mode` flag.
- Bug fix: CSS Loader should not try to resolve url(), because this Webpack config does not process images.

## 0.0.4

- Changed `eslint-config-deloitte` to `@deloitte-digital-au/eslint-config`.
- Changed `stylelint-config-deloitte` to `@deloitte-digital-au/stylelint-config`.

## 0.0.3

- Update dependency webpack-serve to v1
- Added lots of code comments
- Added '~/' src alias for imports
- Now affixes 'bundle' to bundle file names
- Now includes hash in chunk file names
- Fix now resolves .scss and .css modules
- Turned on 'strictExportPresence'
- Disable 'require.ensure' as it's not a standard language feature.
- NODE_ENV now equals 'development' in dev mode
- Changed default dev tool to 'cheap-module-source-map' in favour for source files in browser dev tools
- Added NamedModulesPlugin in dev mode for performance testing
