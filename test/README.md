# Tests for DD FED build

This project includes tests to verify that the build task works correctly, for example:

- Does it build JavaScript?
- Does it build CSS?
- Does it build source maps?
- Do various imports and includes work?


## Run the tests

- Clone the repository
- Run `npm install`
- Run `npm test`


## Test structure

Tests are contained at `test/*.js`, but not in sub-directories.

A demo project is located at `test/demo`, which can be used to run tests against.

We use MochaJS for our tests. For more information on Mocha you can visit their [homepage](https://mochajs.org/)!
