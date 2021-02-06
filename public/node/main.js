const webPush = require('web-push')

const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/ekKeTSKVogs:APA91bGiE8txfyy9LJwx2jnc4n2Vlx2OF3Rb_bKsS2KrLmXpPSNVUiYtpf5ItoMbZtOlylseHL97MEn3RKdJQjZ48qA8oHQMoYxwcjQCS3ebMlZz41IdOp-IEPEhcvCJTzcxpjfgst5y',
  expirationTime: null,
  keys: {
    p256dh:
      'BGsqaHiLv2_x1Hj4wWdKpebA6xyghmfngZBlTia0f-0cetr2tK9Py_g2PIVuH2_9RNKE4hKW8qqd0d2NzLcJFJo',
    auth: 'Mk7p1F5fKVRHxtPnmCeTYw'
  }
}
const vapidPublicKey =
  'BI5Oqd_Wm2nvGdMq5Kg8MmyzbHWgmWirU9LNo2jvfyvaQlCvX88-Ts88N8t7MdEilq_IoRs9QezC01kBXsucMGU'
const vapidPrivateKey = 'JKqvzjBqcIHUQkHtu0Xon9fgjp-ob_ZeDSSePPXxL9A'

const payload = 'Here Nneoma school!'

const options = {
  gcmAPIKey: 'YOUR_SERVER_KEY',
  TTL: 60,
  vapidDetails: {
    subject: 'mailto:zitac234@gmail.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  }
}

webPush.sendNotification(pushSubscription, payload, options)
