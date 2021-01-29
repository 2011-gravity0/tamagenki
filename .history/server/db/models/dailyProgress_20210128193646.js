const Sequelize = require('sequelize')
const db = require('../db')

const dailyProgress = db.define('dailyProgress', {
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
  eggName: {
    type: Sequelize.STRING,
  },
})
module.exports = 