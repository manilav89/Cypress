/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const dbConfig = require('../../cypress.json')
/**
 * @type {Cypress.PluginConfig}
 */

const mysql = require('mysql')
function queryTestDb(query) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(dbConfig.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
   connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        // console.log(results)
        return resolve(results)
      }
    })
  })
}



module.exports = (on, config) => {
  // Usage: cy.task('queryDb', query)
  on("task", {
    queryDb: query => {
      return queryTestDb(query, config);
    }
  });
};