# Changelog

## Unpublished

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
