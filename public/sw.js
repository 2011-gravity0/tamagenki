// let CACHE_NAME = 'my-cache'
// let urlsToCache = [
//   '/style.css',
//   '/blueEggIcon48.png',
//   '/blueEggIcon72.png',
//   '/blueEggIcon96.png',
//   '/blueEggIcon144.png',
//   '/blueEggIcon168.png',
//   '/blueEggIcon192.png',
//   '/eggGIF.gif',
//   'eggHatch.gif',
//   '/lotties/dumpling1',
//   '/lotties/dumpling2',
//   '/bundle.js',
// ]

// self.addEventListener('install', function (event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log('Opened cache')
//       return cache.addAll(urlsToCache)
//     })
//   )
// })

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
