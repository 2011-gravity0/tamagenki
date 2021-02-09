const webPush = require('web-push')
const axios = require('axios')

async function sendPush() {
  try {
    let {data} = await axios.get(
      '/api/subscription/?reminderType=waterReminder',
      {
        proxy: {
          host: 'localhost',
          port: 8080
        }
      }
    )

    if (data.length) {
      data = data.map(sub => {
        sub.keys = JSON.parse(sub.keys)
        return sub
      })
    }

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

    data.forEach(sub => {
      webPush.sendNotification(sub, payload, options)
    })
  } catch (error) {
    console.log(error)
  }
}

sendPush()
