const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const DailyProgress = db.define('dailyprogress', {
  exercise: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 1,
      min: 0
    }
  },
  fruit: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 3,
      min: 0
    }
  },
  vegetables: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 3,
      min: 0
    }
  },
  water: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 6,
      min: 0
    }
  },
  meditation: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 1,
      min: 0
    }
  },
  sleep: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 1,
      min: 0
    }
  },
  relaxation: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 1,
      min: 0
    }
  },
  date: {
    type: Sequelize.DATEONLY
  },
  tamacoin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  streakEarned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
module.exports = DailyProgress
