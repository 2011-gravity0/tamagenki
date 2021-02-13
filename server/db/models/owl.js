const Sequelize = require('sequelize')
const db = require('../db')

const Response = db.define('response', {
  response: {
    type: Sequelize.TEXT
  }
})

module.exports = Response
