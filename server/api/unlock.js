const router = require('express').Router()
const {User, Level, Unlock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allUserUnlock = await Unlock.findAll({
      include: [
        {
          model: User
        },
        {
          model: Level
        }
      ]
    })
    if (allUserUnlock) {
      res.status(200).send(allUserUnlock)
    } else {
      res.status(401).send('No unlocked level found')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const singleUserUnlock = await Unlock.findAll({
      include: [
        {
          model: User,
          where: {
            userId: userId
          }
        },
        {
          model: Level
        }
      ]
    })
    if (singleUserUnlock) {
      res.status(200).send(singleUserUnlock)
    } else {
      res.status(401).send('No unlock found for the user')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:unlockId', async (req, res, next) => {
  try {
    const unlock = await Unlock.findByPk(req.params.unlockId)
    if (unlock) {
      unlock.update({likes: req.body.likes})
      const updatedInstance = Unlock.findOne({where: {id: req.params.unlockId}})
      res.send(updatedInstance)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/:levelName', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findByPk(userId)
    const level = await Level.findOne({
      where: {levelName: req.params.levelName}
    })
    const unlock = await Unlock.create()

    if (user && level) {
      unlock.setUser(user)
      unlock.setLevel(level)
      res.json(unlock)
    } else {
      res.status(401).send('User or Level not found')
    }
  } catch (error) {
    next(error)
  }
})
