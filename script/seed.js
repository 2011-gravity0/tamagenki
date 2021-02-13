'use strict'

const db = require('../server/db')
const {User, DailyProgress, Response} = require('../server/db/models')

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

//Cody has history dailyProgress data.
const dataHistory = {
  exercise: 1,
  fruit: 2,
  vegetables: 1,
  water: 5,
  meditation: 0,
  sleep: 1,
  relaxtion: 2,
  isToday: false
}

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

  const cody = await User.findOne({where: {email: 'cody@email.com'}})
  const history = await DailyProgress.create(dataHistory)
  await history.setUser(cody)

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

  await Response.bulkCreate([
    {
      response:
        'In a normal sleep period, a person experiences four to six sleep cycles.'
    },
    {response: 'On average, we spend about two hours per night dreaming.'},
    {
      response:
        'Mindfulness meditation increases positive affect and decreases anxiety and negative affect.'
    },
    {response: 'Meditation almost certainly does sharpen your attention.'},
    {
      response:
        'Meditation appears to increase compassion. It also makes our compassion more effective.'
    },
    {
      response:
        'Studies have shown that regular practice of yoga reduces inflammation. A Namaste keeps the doctor away!'
    },
    {response: 'Be kind to your wandering mind.'},
    {
      response:
        'Getting things off your mind by writing them down may help you relax.'
    },
    {
      response:
        'Making a list about what you’re grateful for can help some people feel relaxed.'
    },
    {
      response:
        'Spending just a few minutes in nature when you feel stressed may help you relax.'
    },
    {response: 'Take a break right now and have a glass of water.'},
    {
      response:
        'Long-term dehydration can reduce the joints’ shock-absorbing ability, leading to joint pain.'
    },
    {
      response:
        'Water helps dissolve minerals and nutrients, making them more accessible to the body.'
    },
    {
      response:
        'Most of the nutrients in a potato reside just below the skin layer.'
    },
    {
      response:
        'White potatoes were first cultivated by local Indians in the Andes Mountains of South America.'
    },
    {
      response:
        'If you suffer from heartburn, try eating a banana for soothing relief.'
    }
  ])

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
