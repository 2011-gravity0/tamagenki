const router = require('express').Router()
const {User, DailyProgress} = require('../db/models')

module.exports = router

const loggedInUserOnly = (req, res, next) => {
  console.log(req)
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
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: ['id', 'email', 'petName'],
      include: [{model: DailyProgress}]
    })
    res.json(allUsers)
  } catch (err) {
    next(err)
  }
})
// user/history/3
// history/3
router.get('/history/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const singleUser = await User.findByPk(id, {
      include: [
        {
          model: DailyProgress,
          attributes: [
            'exercise',
            'fruit',
            'vegetables',
            'water',
            'meditation',
            'sleep',
            'relaxation',
            'date'
          ]
        }
      ]
    })
    res.status(200).send(singleUser)
  } catch (error) {
    next(error)
  }
})
router.get('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    if (isNaN(id)) res.status(400).send('No user found')
    const singleUser = await User.findByPk(id, {
      include: [{model: DailyProgress}]
    })
    if (!singleUser) res.status(400).send('No user found')
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
    } else {
      const error = new Error('User not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const deleteUser = await User.findByPk(id)
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
