const Sequelize = require('sequelize')
const db = require('../db')

const DailyProgress = db.define('dailyprogress', {
  execrise: {
    type: Sequelize.BOOLEAN,
  },
  diet: {
    type: Sequelize.STRING,
  },
  water: {
    type: Sequelize.BOOLEAN,
  },
  meditation: {
    type: Sequelize.BOOLEAN,
  },
  sleep: {
    type: Sequelize.DATE,
  },
  relaxtion: {
    type: Sequelize.BOOLEAN,
  },
})
module.exports = DailyProgress
