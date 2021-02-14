var CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = [
  '/style.css',
  '/blueEggIcon48.png',
  '/blueEggIcon72.png',
  '/blueEggIcon96.png',
  '/blueEggIcon144.png',
  '/blueEggIcon192.png',
  '/blueEggIcon512.png',
  '/eggGIF.gif',
  'eggHatch.gif',
  '/lotties/dumpling1/data.json',
  '/lotties/dumpling2/data.json'
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})
self.addEventListener('notificationclose', event => {
  const notification = event.notification
  const primaryKey = notification.data.primaryKey

  console.log('Closed notification: ' + primaryKey)
})
self.addEventListener('notificationclose', event => {
  const notification = event.notification
  const primaryKey = notification.data.primaryKey

  console.log('Closed notification: ' + primaryKey)
})

self.addEventListener('notificationclick', event => {
  const notification = event.notification
  const primaryKey = notification.data.primaryKey
  const action = event.action

  if (action === 'close') {
    notification.close()
  } else {
    event.waitUntil(
      clients.matchAll().then(clis => {
        const client = clis.find(c => {
          return c.visibilityState === 'visible'
        })
        if (client !== undefined) {
          client.navigate('samples/page' + primaryKey + '.html')
          client.focus()
        } else {
          // there are no visible windows. Open one.
          clients.openWindow('samples/page' + primaryKey + '.html')
          notification.close()
        }
      })
    )
  }

  self.registration.getNotifications().then(notifications => {
    notifications.forEach(notification => {
      notification.close()
    })
  })
})

self.addEventListener('push', event => {
  let body
  console.log(event.data)
  if (event.data) {
    body = event.data.text()
  } else {
    body = 'Default body'
  }

  const options = {
    body: body,
    icon: '/blueEggIcon192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Go to the site',
        icon: 'images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close the notification',
        icon: 'images/xmark.png'
      }
    ]
  }
  event.waitUntil(
    self.registration.showNotification('Message from your Tamabuddy', options)
  )
})
