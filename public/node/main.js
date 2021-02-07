const webPush = require('web-push')

const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/ekMIKwJIUEM:APA91bFr7Gn5tC38Z5H5E0OhS89SFCAQxMnrZDBo-FtwuwVLB9l-I5WgKQ_LSb-P-JmzZVQWM7s9Mxgp9E5vP5vjs2ND4s9FlAkDSz00ZGnU-e2SPDdYM57QySaw1POkIgxdK9f1zz1j',
  expirationTime: null,
  keys: {
    p256dh:
      'BGTviQpIi2QoxkSelssd7pWakVgqP7n2jUWA9ftIeaVgK98BDyTOaZWgDrWnqw58WHDNgN6v4sttliJmXdUiArc',
    auth: '0n7MgxsLoi4n0svoYIkplQ'
  }
}

// {
//   endpoint:
//     'https://fcm.googleapis.com/fcm/send/d0cQRWP89W8:APA91bH2lwmd8Yz_ClJU-7ClUuioHxHXe9QuLG1w_bMaJPTNLSmixWcZ0-88M9n15rUmKOthSYU4_UuR2GegLra4uGOZJnA8djC2R4PmbLR14a8dVjWgR30wQrFRRaP3itknmifkAdbu',
//   expirationTime: null,
// keys: {
//   p256dh:
//     'BL6r_rm2oUREwCGLZrbtctE56YEuBasz0K7wY4KwuSYactRNlQbRitEK900so56yObrschK8O3jiMkglSDMkf0A',
//   auth: 'vjj0hpGz3MtIq2kMxSmoKQ',
//   },
// }

const vapidPublicKey =
  'BI5Oqd_Wm2nvGdMq5Kg8MmyzbHWgmWirU9LNo2jvfyvaQlCvX88-Ts88N8t7MdEilq_IoRs9QezC01kBXsucMGU'
const vapidPrivateKey = 'JKqvzjBqcIHUQkHtu0Xon9fgjp-ob_ZeDSSePPXxL9A'

const payload = 'Time to drink water!!'

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
