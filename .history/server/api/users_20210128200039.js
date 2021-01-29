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
}
router.get('/', async (req, res, next) => {
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
