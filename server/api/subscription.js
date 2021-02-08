const router = require('express').Router()
const {User, Subscription} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allSub = await Subscription.findAll()
    res.send(allSub)
  } catch (error) {
    next(error)
  }
})

router.get('/:subId', async (req, res, next) => {
  try {
    const sub = await Subscription.findByPk(req.params.subId)
    res.send(sub)
  } catch (error) {
    next(error)
  }
})

// router.get('/:userId', async (req, res, next) => {
//   try {
//     console.log('is this hit?')
//     // const id = req.params.userId
//     // const data = JSON.stringify(req.body)

//     const [subscription, create] = await Subscription.findOrCreate({
//       where: {token: 'this'},
//       default: {
//         token: 'that',
//         userId: 1,
//       },
//     })
//     res.json(subscription)
//   } catch (error) {
//     next(error)
//   }
// })
