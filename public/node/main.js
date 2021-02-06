const webPush = require('web-push')

const pushSubscription = YOUR_SUBSCRIPTION_OBJECT

const vapidPublicKey =
  'BI5Oqd_Wm2nvGdMq5Kg8MmyzbHWgmWirU9LNo2jvfyvaQlCvX88-Ts88N8t7MdEilq_IoRs9QezC01kBXsucMGU'
const vapidPrivateKey = 'JKqvzjBqcIHUQkHtu0Xon9fgjp-ob_ZeDSSePPXxL9A'

const payload = 'Here is a payload!'

const options = {
  // gcmAPIKey: 'YOUR_SERVER_KEY',
  TTL: 60,
  vapidDetails: {
    subject: 'mailto:zitac234@gmail.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  }
}

webPush.sendNotification(pushSubscription, payload, options)
