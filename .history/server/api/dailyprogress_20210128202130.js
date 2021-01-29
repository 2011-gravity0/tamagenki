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

router.get('/', async (req, res, next) => {
  try {
    const allProgresses = await DailyProgress.findAll()
    res.send(allProgresses)
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

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const updateProgress = await DailyProgress.findByPk(req.params.id)
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
      res.json(product)
    } else {
      const error = new Error('Product not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})
