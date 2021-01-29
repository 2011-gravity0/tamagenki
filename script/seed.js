'use strict'

const db = require('../server/db')
const {User, DailyProgress} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: 'cdpassword',
    userName: 'Cody',
    exerciseReminder: true,
    waterReminder: true,
    meditationReminder: true,
    sleepReminder: true,
    petName: 'Esspresso'
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
    petName: 'Sabi'
  },
  {
    email: 'fs@email.com',
    userName: 'Summer',
    password: 'fspassword',
    meditationReminder: true,
    petName: 'Mamashita'
  },
  {
    email: 'gh@email.com',
    userName: 'Jerry',
    password: 'ghpassword',
    meditationReminder: true,
    petName: 'PomPom pudding'
  },
  {
    email: 'wdf@email.com',
    userName: 'Beth',
    password: 'wdpassword',
    sleepReminder: true,
    petName: 'Moffle'
  }
]

//Cody has history dailyProgress data.
const dataHistory = {
  exercise: 1,
  fruit: 2,
  vegetables: 1,
  water: 5,
  meditation: 0,
  sleep: 1,
  relaxtions: 2,
  isToday: false,
  date: '2021-1-11'
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  const cody = await User.findOne({where: {email: 'cody@email.com'}})
  const history = await DailyProgress.create(dataHistory)
  await history.setUser(cody)

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
