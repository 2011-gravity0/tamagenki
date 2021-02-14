const Sequelize = require('sequelize')
const db = require('../db')

const Boombox = db.define('boombox', {
  boomboxPaused: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  dancing: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  playing: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  song: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Boombox
