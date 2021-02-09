const Sequelize = require('sequelize')
const db = require('../db')

const Subscription = db.define('subscription', {
  endpoint: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  expirationTime: {
    type: Sequelize.TEXT
  },
  keys: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Subscription
