const Sequelize = require('sequelize')
const db = require('../db')

const DailyProgress = db.define('dailyprogress', {
  exercise: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  fruit: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  vegetables: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  water: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  meditation: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  sleep: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  relaxtions: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})
module.exports = DailyProgress
