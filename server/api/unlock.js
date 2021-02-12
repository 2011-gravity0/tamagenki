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
      res.status(401).send('No unlock found fot the user')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/:levelId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const levelId = req.params.levelId
    const user = await User.findByPk(userId)
    const level = await Level.findByPk(levelId)
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
