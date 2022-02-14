# Cypress regression for monolith

Regression suite for monolith test

## Setting up

Clone this repository. In the cloned respository's root run `npm install`. When it's done, run `npx cypress open` to open the cypress test runner

## Basic Command line

### Run all test in local

`npx cypress run`

### Specific test server

`npx cypress run --env testServer=3`

### Run all test in the docker container

`docker build -t cypress .`

Check more commands in the [cypress docs](https://docs.cypress.io/guides/guides/command-line)