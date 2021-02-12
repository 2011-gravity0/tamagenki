'use strict'

const db = require('../server/db')
const {User, DailyProgress, Level, Unlock} = require('../server/db/models')
const levels = require('./levelSeedData')

const users = [
  {
    email: 'cody@email.com',
    password: 'cdpassword',
    userName: 'Cody',
    exerciseReminder: true,
    waterReminder: true,
    meditationReminder: true,
    sleepReminder: true,
    petName: 'Esspresso',
    points: 12
  },
  {
    email: 'tama@email.com',
    password: 'tmpassword',
    userName: 'Morty',
    petName: 'Roundy'
  },
  {
    email: 'maru@email.com',
    userName: 'Rick',
    password: 'mrpassword',
    exerciseReminder: true,
    petName: 'Fuzzy Face'
  },
  {
    email: 'rachel@email.com',
    userName: 'Rachel',
    password: 'rcpassword',
    waterReminder: true,
    petName: 'Sabi',
    points: 100
  },
  {
    email: 'fs@email.com',
    userName: 'Summer',
    password: 'fspassword',
    meditationReminder: true,
    petName: 'Mamashita',
    points: 250
  },
  {
    email: 'gh@email.com',
    userName: 'Jerry',
    password: 'ghpassword',
    meditationReminder: true,
    petName: 'PomPom pudding',
    points: 300
  },
  {
    email: 'wdf@email.com',
    userName: 'Beth',
    password: 'wdpassword',
    sleepReminder: true,
    petName: 'Moffle',
    points: 500
  },
  {
    email: 'ed@email.com',
    userName: 'Ed',
    password: 'ed',
    sleepReminder: true,
    petName: 'Deloba',
    points: 116
  }
]

// 7 dailyProgresses for Ed to unlock all badges

const sunday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}
const monday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}
const tuesday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}
const wednesday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}
const thursday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}
const friday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}
const saturday = {
  exercise: 1,
  fruit: 3,
  vegetables: 3,
  water: 6,
  meditation: 1,
  sleep: 1,
  relaxation: 1,
  isToday: false
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  await Promise.all(
    levels.map(level => {
      return Level.create(level)
    })
  )

  const ed = await User.findOne({where: {email: 'ed@email.com'}})
  const mondayHistory = await DailyProgress.create(monday)
  const tuesdayHistory = await DailyProgress.create(tuesday)
  const wednesdayHistory = await DailyProgress.create(wednesday)
  const thursdayHistory = await DailyProgress.create(thursday)
  const fridayHistory = await DailyProgress.create(friday)
  const saturdayHistory = await DailyProgress.create(saturday)
  const sundayHistory = await DailyProgress.create(sunday)
  await mondayHistory.setUser(ed)
  await tuesdayHistory.setUser(ed)
  await wednesdayHistory.setUser(ed)
  await thursdayHistory.setUser(ed)
  await fridayHistory.setUser(ed)
  await saturdayHistory.setUser(ed)
  await sundayHistory.setUser(ed)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
