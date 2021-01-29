const router = require('express').Router()
const {User, DailyProgress} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  let err
  if (!req.user) {
    err = new Error('You are not logged in')
    err.status = 401
    return next(err)
  } else if (!req.user.isAdmin) {
    err = new Error('I see you')
    err.status = 401
    return next(err)
  }
  next()
}

const loggedInUserOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You are not logged in')
    err.status = 401
    return next(err)
  } else if (req.user.userId !== Number(req.params.userId)) {
    const err = new Error('No <3')
    err.status = 401
    return next(err)
  }
  next()
}
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: ['id', 'email'],
      include: [{model: DailyProgress}],
    })
    res.json(allUsers)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', loggedInUserOnly, async (req, res, next) => {
  try {
    const id = req.params.userId
    if (isNaN(id)) res.status(400).send()
    const singleUser = await User.findByPk(id, {
      include: [{model: DailyProgress}],
    })
    if (!singleUser) res.status(400).send()
    res.status(200).send(singleUser)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const updateUser = await User.findByPk(id)
    if (updateUser) {
      await updateUser.update(req.body)
      res.status(201).send(updateUser)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const deleteUser = await Profile.findByPk(id)
    if (deleteUser) {
      await deleteUser.destroy()
      res.status(204).send()
    } else {
      const error = new Error('User not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})
