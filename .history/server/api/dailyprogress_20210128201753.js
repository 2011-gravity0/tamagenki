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
    const singleProgress = await Product.findByPk(req.params.id)
    res.send(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    //catch validation error later
    next(error)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      await product.update(req.body)
    } else {
      const error = new Error('Product not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      await product.destroy()
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
