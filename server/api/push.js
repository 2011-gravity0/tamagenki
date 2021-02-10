const router = require('express').Router()
const {User, Subscription} = require('../db/models')
const webPush = require('web-push')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const payloadOptions = {
      exerciseReminder: 'Time to move around!',
      waterReminder: 'Time to drink water!',
      meditationReminder: 'Wanna take a brake and meditate?',
      sleepReminder: 'Tamabuddy wants to be tucked..'
    }

    const reminderType = req.query.reminderType
    const payload = payloadOptions[reminderType]
    const vapidPublicKey =
      'BI5Oqd_Wm2nvGdMq5Kg8MmyzbHWgmWirU9LNo2jvfyvaQlCvX88-Ts88N8t7MdEilq_IoRs9QezC01kBXsucMGU'
    const vapidPrivateKey = 'JKqvzjBqcIHUQkHtu0Xon9fgjp-ob_ZeDSSePPXxL9A'
    const options = {
      TTL: 60,
      vapidDetails: {
        subject: 'mailto:zitac234@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
      }
    }

    let subscriber = await Subscription.findAll({
      include: [
        {
          model: User,
          where: {
            [reminderType]: true
          }
        }
      ]
    })

    if (subscriber.length) {
      subscriber = subscriber.map(sub => {
        sub.keys = JSON.parse(sub.keys)
        return sub
      })
    }

    subscriber.forEach(sub => {
      webPush.sendNotification(sub, payload, options)
    })

    res.status(200).send('Push Notification has been sent to User')
  } catch (error) {
    next(error)
  }
})
