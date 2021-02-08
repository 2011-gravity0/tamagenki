const Sequelize = require('sequelize')
const db = require('../db')

const Subscription = db.define('subscription', {
  token: {
    type: Sequelize.STRING
  }
})

module.exports = Subscription
