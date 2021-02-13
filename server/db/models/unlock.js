const Sequelize = require('sequelize')
const db = require('../db')

const Unlock = db.define('unlock', {
  tableValue: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'system purpose only'
  }
})

module.exports = Unlock
