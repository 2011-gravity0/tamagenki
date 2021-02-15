const moment = require('moment')

function bulkDataMaker(numDate) {
  const bulkData = []
  for (let i = numDate; i >= 0; i--) {
    const thisDate = getDate(i)
    const randomData = {
      exercise: Math.floor(Math.random() * 2),
      fruit: Math.floor(Math.random() * 4),
      vegetables: Math.floor(Math.random() * 4),
      water: Math.floor(Math.random() * 7),
      meditation: Math.floor(Math.random() * 2),
      sleep: Math.floor(Math.random() * 2),
      relaxation: Math.floor(Math.random() * 2),
      date: thisDate
    }
    bulkData.push(randomData)
  }
  return bulkData
}

const getDate = num => {
  const today = new Date()
  const numDayAgo = new Date(today)
  numDayAgo.setDate(today.getDate() - num)

  return moment(numDayAgo).format('YYYY-MM-DD')
}

module.exports = bulkDataMaker
