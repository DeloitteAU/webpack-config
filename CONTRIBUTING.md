# Contributing to Webpack Config Deloitte

> **Please note** while contributions are welcome, these configurations are being published with our use cases in mind and are opinionated by our engineers. We may not accept *feature* pull requests unless they are aligned with our needs.

To get started please [fork](https://github.com/DeloitteDigitalAPAC/webpack-config-deloitte#fork-destination-box) this code on Github.

At the root; run `npm install && npm run bootstrap`.

The bootstrap command will install dependencies of each package, and use Lerna's [hoisting](https://github.com/lerna/lerna/blob/master/doc/hoist.md) option to avoid installing the same packages multiple times. This also allows the demo projects to work.

## Demo packages

The npm scripts in demo packages need to be run via Lerna rather than npm directly, to ensure that all dependencies are available.

Examples:
`lerna run --scope packagename scriptname`
`lerna run --scope demo build`
`lerna run --scope demo-vuejs build`
