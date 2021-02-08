const router = require('express').Router()
module.exports = router

router.use('/user', require('./user'))
router.use('/dailyprogress', require('./dailyprogress'))
router.use('/subscription', require('./subscription'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
