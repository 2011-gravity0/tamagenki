// let CACHE_NAME = 'my-cache'
// let urlsToCache = [
//   '/style.css',
//   '/eggIcon48.png',
//   '/eggIcon72.png',
//   '/eggIcon96.png',
//   '/eggIcon144.png',
//   '/eggIcon168.png',
//   '/eggIcon192.png',
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
  '/eggIcon48.png',
  '/eggIcon72.png',
  '/eggIcon96.png',
  '/eggIcon144.png',
  '/eggIcon168.png',
  '/eggIcon192.png',
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
