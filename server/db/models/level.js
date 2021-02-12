const Sequelize = require('sequelize')
const db = require('../db')

const Level = db.define('level', {
  levelName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  badgeImage: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Level
