const router = require('express').Router()
const {Response} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // Gets random number from 1 to 16 (the num of responses)
    // if we had more we would use findAll array length
    const num = Math.floor(1 + Math.random() * 16)

    const response = await Response.findByPk(num)

    if (response) {
      res.send(response)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})
