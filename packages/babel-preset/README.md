# @deloitte-digital-au/babel-preset

Base Babel preset used by Deloitte Digital for our modern web apps.

**If you are using our webpack-config package.** This is already pre-installed, please read the main [instructions](https://github.com/DeloitteDigitalAPAC/webpack-config) to configure this package.

## Installing

**Prerequisite**

To use, you will need to install the Babel cli:

```
npm install babel-cli --save-dev 
```

> You may also like to set it up for a [tool of your choice](https://babeljs.io/docs/setup/).

**Install @deloitte-digital-au/babel-preset**

```
npm install @deloitte-digital-au/babel-preset --save-dev
```

Then create a `.babelrc` in the root of your project:

```js
{
	"presets": ["@deloitte-digital-au/babel-preset"]
}
```

*IMPORTANT:* Please ensure you [polyfill](https://babeljs.io/docs/usage/polyfill/) `Object.assign` for older browsers.

## Adding Typing (Optional)

### Adding Typescript

```
npm install @babel/preset-typescript --save-dev 
```

Then add the typescript preset to your `.babelrc`

```
{
	"presets": [
		"@deloitte-digital-au/babel-preset",
		"@babel/preset-typescript"
	]
}
```

### Adding Flow

```
npm install  @babel/preset-flow --save-dev
```

Then add the flow preset to your `.babelrc`

```
{
	"presets": [
		"@deloitte-digital-au/babel-preset",
		"@babel/preset-flow"
	]
}
```