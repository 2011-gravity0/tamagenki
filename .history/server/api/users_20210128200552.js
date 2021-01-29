const router = require('express').Router()
const {User} = require('../db/models')
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
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', loggedInUserOnly, async (req, res, next) => {
  try {
    const id = req.params.userId
    if (isNaN(id)) res.status(400).send()
    const myUser = await User.findByPk(id)
    if (!myProfile) res.status(400).send()
    res.status(200).send(myProfile)
  } catch (error) {
    next(error)
  }
})
