# Contributing to Webpack Config Deloitte

> **Please note** while contributions are welcome, these configurations are being published with our use cases in mind 
and are opinionated by our engineers. We may not accept *feature* pull requests unless they are aligned with our needs.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. 
If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people 
don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should 
still leave a comment.

## Getting started

**Prerequisites**

- You have Node installed at v8+ and npm installed at v5+
- You understand git and github

## Development Workflow

After [forking](https://github.com/DeloitteDigitalAPAC/webpack-config#fork-destination-box) this code on Github run 
`npm install && npm run bootstrap`.

As this is a mono repop, the bootstrap command will install dependencies of each package, and use Lerna's 
[hoisting](https://github.com/lerna/lerna/blob/master/doc/hoist.md) option to avoid installing the same packages 
multiple times. This also allows the demo projects to work.

The following commands will then become available:

- `npm run lint` checks code style.
- `npm run test` runs the test suite.
- `npm run start` runs the demo.
- `npm run start:react` runs the React demo.
- `npm run start:vuejs` runs the VueJs demo.

The npm scripts in packages need to be run via Lerna rather than npm directly, to ensure that all dependencies are available.

Examples:
`lerna run --scope packagename scriptname`
`lerna run --scope demo build`
`lerna run --scope demo-vuejs build`

## Submitting Pull Requests

The core maintainers monitor pull request's whom will perform the reviews.

**Before submitting a pull request** please ensure the following is done:

- Fork the repository and create your branch from develop.
- If you've fixed a bug or added a feature, add tests.
- Ensure the tests pass (`npm run test`).
- Make sure your code lints (`npm run lint`).

## Publishing

The project publishes 5 packages to npm:

Instructions for publishing new releases:

- Check out the `master` branch.
- Do not manually change version numbers in `lerna.json` or `package.json` files (they are updated programatically).
- Update the `CHANGELOG.md` file and add the changes to the git staging area. These changes will be included in the automatic commit that increments the version numbers. You don't need to commit them separately.
- Run Lerna's publish command, and pass in your One Time Password for npm as an environment variable: `NPM_CONFIG_OTP=yourtoken lerna publish`.
- Select the new version (or enter a custom one) adhering to the principles of [semantic versioning](https://semver.org/).

Lerna will create a new release of the packages that have been updated. It will create a new git commit/tag and publish to npm.