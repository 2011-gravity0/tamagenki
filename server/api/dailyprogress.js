const router = require('express').Router()
const {DailyProgress} = require('../db/models')
const moment = require('moment')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You are not logged in')
    err.status = 401
    return next(err)
  } else if (!req.user.isAdmin) {
    const err = new Error('I see you!!!')
    err.status = 401
    return next(err)
  }
  next()
}

const getDate = () => {
  const today = new Date()
  return moment(today).format('YYYY-MM-DD')
}

const getYesterdaysDate = () => {
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  let [month, date, year] = yesterday.toLocaleDateString('en-US').split('/')

  if (month.length !== 0) {
    return `${year}-0${month}-${date}`
  } else {
    return `${year}-${month}-${date}`
  }
}

// get today's dailyProgress
router.get('/', async (req, res, next) => {
  try {
    let today = await getDate()

    const [todaysProgress] = await DailyProgress.findOrCreate({
      attributes: [
        'exercise',
        'fruit',
        'vegetables',
        'water',
        'meditation',
        'sleep',
        'relaxation',
        'tamacoin'
      ],
      where: {
        userId: req.user.id,
        date: today
      }
    })

    res.send(todaysProgress)
  } catch (error) {
    next(error)
  }
})

//get yesterday's dailyProgress to check if the user's streak is still going or not
router.get('/yesterday', async (req, res, next) => {
  try {
    let yesterday = await getYesterdaysDate()

    const [yesterdaysProgress] = await DailyProgress.findOrCreate({
      attributes: [
        'exercise',
        'fruit',
        'vegetables',
        'water',
        'meditation',
        'sleep',
        'relaxation',
        'tamacoin'
      ],
      where: {
        userId: req.user.id,
        date: yesterday
      }
    })
    res.send(yesterdaysProgress)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProgress = await DailyProgress.findByPk(req.params.id)
    if (singleProgress) {
      res.send(singleProgress)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newProgress = await DailyProgress.create(req.body)
    res.json(newProgress)
  } catch (error) {
    next(error)
  }
})

//update user points
router.put('/', async (req, res, next) => {
  try {
    let today = await getDate()
    const updateProgress = await DailyProgress.findOne({
      where: {userId: req.user.id, date: today}
    })
    if (updateProgress) {
      await updateProgress.update(req.body)
      const updatedProgress = await DailyProgress.findOne({
        where: {
          userId: req.user.id,
          date: today
        },
        attributes: [
          'exercise',
          'fruit',
          'vegetables',
          'water',
          'meditation',
          'sleep',
          'relaxation',
          'tamacoin',
          'streakEarned'
        ]
      })
      res.send(updatedProgress)
    } else {
      const error = new Error('Progress not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const deleteProgress = await DailyProgress.findByPk(req.params.id)
    if (deleteProgress) {
      await deleteProgress.destroy()
      res.status(204).send()
    } else {
      const error = new Error('Progress not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})
