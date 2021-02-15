const router = require('express').Router()
const {Boombox} = require('../db/models')
module.exports = router

//get the user's boombox
router.get('/', async (req, res, next) => {
  try {
    const [boombox] = await Boombox.findOrCreate({
      where: {
        userId: req.user.id
      }
    })
    res.send(boombox)
  } catch (error) {
    next(error)
  }
})

//update boombox
router.put('/:boomboxId', async (req, res, next) => {
  try {
    const boombox = await Boombox.findByPk(req.params.boomboxId)
    if (boombox) {
      await boombox.update(req.body)
      res.status(201).send(boombox)
    } else {
      const error = new Error('Boombox not found')
      error.status = '404'
      throw error
    }
  } catch (error) {
    next(error)
  }
})
