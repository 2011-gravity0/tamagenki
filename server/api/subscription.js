const router = require('express').Router()
const {User, Subscription} = require('../db/models')
module.exports = router

router.post('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const data = req.body
    const subKeys = JSON.stringify(data.keys)

    const user = await User.findByPk(userId)

    if (user) {
      const [subscription] = await Subscription.findOrCreate({
        where: {
          endpoint: data.endpoint,
          keys: subKeys
        },
        default: {
          endpoint: data.endpoint,
          expirationTime: data.expirationTime,
          keys: subKeys
        }
      })
      subscription.setUser(user)
      res.json(subscription)
    } else {
      res.status(401).send('User not found')
    }
  } catch (error) {
    next(error)
  }
})

//delete all subscription data that associate with the useId
router.delete('/:userId', async (req, res, next) => {
  try {
    await Subscription.destroy({where: {userId: req.params.userId}})
  } catch (error) {
    next(error)
  }
})
