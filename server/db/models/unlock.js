const Sequelize = require('sequelize')
const db = require('../db')

const Unlock = db.define('unlock', {
  tableValue: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'system purpose only'
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Unlock
