# Tests for DD FED build

This project includes unit tests and functional tests to verify that the build task works correctly, for example:

- Does it build JavaScript?
- Does it build CSS?
- Does it build source maps?
- Do various imports and includes work?

## Test structure

A demo project is located at `packages/demo`, which can be used to run tests against.

### Unit tests

Unit tests are contained at `tests/unit/*.js`. We use [MochaJS](https://mochajs.org/) for our unit tests.

### Functional tests

Functional tests are contained at `tests/cypress/integration/*.js`. We use [Cypress](https://www.cypress.io/) for our functional tests.
