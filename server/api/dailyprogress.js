const router = require('express').Router()
const {User, DailyProgress} = require('../db/models')
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

// get today's dailyProgress
router.get('/', async (req, res, next) => {
  try {
    let [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
    let today
    month.length !== 2
      ? (today = `${year}-0${month}-${date}`)
      : (today = `${year}-${month}-${date}`)
    const [todaysProgress, created] = await DailyProgress.findOrCreate({
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

router.get('/:id', async (req, res, next) => {
  try {
    const singleProgress = await DailyProgress.findByPk(req.params.id)
    res.send(singleProgress)
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
    let [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
    let today
    month.length !== 2
      ? (today = `${year}-0${month}-${date}`)
      : (today = `${year}-${month}-${date}`)
    const updateProgress = await DailyProgress.findOne({
      where: {
        userId: req.user.id,
        date: today
      }
    })
    if (updateProgress) {
      await updateProgress.update(req.body)
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
