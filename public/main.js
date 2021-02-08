export const signup = user => {
  'use strict'

  const axios = require('axios')
  let isSubscribed = false
  let swRegistration = null
  let anyReminder = false

  if (Object.values(user).some(val => val === true)) anyReminder = true

  if (!('Notification' in window)) {
    console.log('Notifications not supported in this browser')
    return
  }

  function initializeUI() {
    // Set the initial subscription value
    if (anyReminder) {
      swRegistration.pushManager.getSubscription().then(subscription => {
        isSubscribed = subscription !== null

        if (isSubscribed) {
          updateSubscriptionOnServer(user.id, subscription)
          console.log('User IS subscribed.')
        } else {
          subscribeUser()
        }
      })
    }
  }

  const applicationServerPublicKey =
    'BI5Oqd_Wm2nvGdMq5Kg8MmyzbHWgmWirU9LNo2jvfyvaQlCvX88-Ts88N8t7MdEilq_IoRs9QezC01kBXsucMGU'

  // on our app, when user click the reminder page submit button, this happen.
  function subscribeUser() {
    Notification.requestPermission(status => {
      console.log('Notification permission status:', status)
    })

    if (Notification.permission === 'granted') {
      console.log('this is called')
      const applicationServerKey = urlB64ToUint8Array(
        applicationServerPublicKey
      )
      swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(subscription => {
          console.log('User is subscribed:', subscription)

          updateSubscriptionOnServer(user.id, subscription)

          isSubscribed = true
        })
        .catch(err => {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied')
          } else {
            console.error('Failed to subscribe the user: ', err)
          }
        })
    }
  }

  async function updateSubscriptionOnServer(
    userId,
    subscription,
    unsubscribe = 'No'
  ) {
    // Here's where you would send the subscription to the application server
    // code below is just for demo purpose. We have to replace this with ajax request to our app surver.

    //if the action is subscribe. hit add route
    try {
      console.log('this is hit')
      if (unsubscribe) {
        console.log('subscription', subscription)
        console.log('userId', userId)
        console.log('unsibscribe', unsubscribe)
        await axios.get(`/api/subscription/${userId}`, subscription)

        // subscriptionJson.textContent = JSON.stringify(subscription)
        // endpointURL.textContent = subscription.endpoint
        // subAndEndpoint.style.display = 'block'

        //if the action is unsubscribe. hit delete route
      } else {
        // await axios.delete(`/api/subscription/`, subscription)
        // subAndEndpoint.style.display = 'none'
        console.log('User is not subscribed')
      }
    } catch (error) {
      console.log('Update Subscription failed', error)
    }
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('Service Worker and Push is supported??')

      navigator.serviceWorker
        .register('sw.js')
        .then(swReg => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            swReg.scope
          )
          swRegistration = swReg

          initializeUI()
        })
        .catch(err => {
          console.error('Service Worker Error', err)
        })
    })
  } else {
    console.warn('Push messaging is not supported')
  }
}

// export const app = () => {
//   'use strict'

//   let isSubscribed = false
//   let swRegistration = null

//   const notifyButton = document.querySelector('.js-notify-btn')
//   const pushButton = document.querySelector('.js-push-btn')

//   if (!('Notification' in window)) {
//     console.log('Notifications not supported in this browser')
//     return
//   }

//   Notification.requestPermission((status) => {
//     console.log('Notification permission status:', status)
//   })

//   function displayNotification() {
//     if (Notification.permission === 'granted') {
//       navigator.serviceWorker.getRegistration().then((reg) => {
//         const options = {
//           body: 'First notification!',
//           // tag: 'id1',
//           icon: 'images/notification-flat.png',
//           vibrate: [100, 50, 100],
//           data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1,
//           },
//           actions: [
//             {
//               action: 'explore',
//               title: 'Go to the site',
//               icon: 'images/checkmark.png',
//             },
//             {
//               action: 'close',
//               title: 'Close the notification',
//               icon: 'images/xmark.png',
//             },
//           ],
//         }
//         reg.showNotification('Hello world!', options)
//       })
//     }
//   }

//   function initializeUI() {
//     pushButton.addEventListener('click', () => {
//       pushButton.disabled = true
//       if (isSubscribed) {
//         unsubscribeUser()
//       } else {
//         subscribeUser()
//       }
//     })

//     // Set the initial subscription value
//     swRegistration.pushManager.getSubscription().then((subscription) => {
//       isSubscribed = subscription !== null

//       updateSubscriptionOnServer(subscription)

//       if (isSubscribed) {
//         console.log('User IS subscribed.')
//       } else {
//         console.log('User is NOT subscribed.')
//       }

//       updateBtn()
//     })
//   }

//   const applicationServerPublicKey =
//     'BI5Oqd_Wm2nvGdMq5Kg8MmyzbHWgmWirU9LNo2jvfyvaQlCvX88-Ts88N8t7MdEilq_IoRs9QezC01kBXsucMGU'

//   // on our app, when user click the reminder page submit button, this happen.
//   function subscribeUser() {
//     Notification.requestPermission((status) => {
//       console.log('Notification permission status:', status)
//     })

//     if (Notification.permission === 'granted') {
//       console.log('this is called')
//       const applicationServerKey = urlB64ToUint8Array(
//         applicationServerPublicKey
//       )
//       swRegistration.pushManager
//         .subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: applicationServerKey,
//         })
//         .then((subscription) => {
//           console.log('User is subscribed:', subscription)

//           updateSubscriptionOnServer(subscription)

//           isSubscribed = true

//           updateBtn()
//         })
//         .catch((err) => {
//           if (Notification.permission === 'denied') {
//             console.warn('Permission for notifications was denied')
//           } else {
//             console.error('Failed to subscribe the user: ', err)
//           }
//           updateBtn()
//         })
//     }
//   }

//   function unsubscribeUser() {
//     let userSubsctiption
//     swRegistration.pushManager
//       .getSubscription()
//       .then((subscription) => {
//         if (subscription) {
//           userSubsctiption = subscription
//           return subscription.unsubscribe()
//         }
//       })
//       .catch((err) => {
//         console.log('Error unsubscribing', err)
//       })
//       .then(() => {
//         updateSubscriptionOnServer(userSubsctiption, null)

//         console.log('User is unsubscribed')
//         isSubscribed = false

//         updateBtn()
//       })
//   }

//   async function updateSubscriptionOnServer(subscription, unsubscribe = 'No') {
//     // Here's where you would send the subscription to the application server
//     // code below is just for demo purpose. We have to replace this with ajax request to our app surver.

//     // const subscriptionJson = document.querySelector('.js-subscription-json')
//     // const endpointURL = document.querySelector('.js-endpoint-url')
//     // const subAndEndpoint = document.querySelector('.js-sub-endpoint')

//     //if the action is subscribe. hit add route
//     try {
//       if (unsubscribe) {
//         console.log('subscription', subscription)
//         // await axios.get(`/api/subscription/`, subscription)
//         // subscriptionJson.textContent = JSON.stringify(subscription)
//         // endpointURL.textContent = subscription.endpoint
//         // subAndEndpoint.style.display = 'block'

//         //if the action is unsubscribe. hit delete route
//       } else {
//         // await axios.delete(`/api/subscription/`, subscription)
//         // subAndEndpoint.style.display = 'none'
//         console.log('User is not subscribed')
//       }
//     } catch (error) {
//       console.log('Update Subscription failed', error)
//     }
//   }

//   function updateBtn() {
//     if (Notification.permission === 'denied') {
//       pushButton.textContent = 'Push Messaging Blocked'
//       pushButton.disabled = true
//       updateSubscriptionOnServer(null)
//       return
//     }

//     if (isSubscribed) {
//       pushButton.textContent = 'Disable Push Messaging'
//     } else {
//       pushButton.textContent = 'Enable Push Messaging'
//     }

//     pushButton.disabled = false
//   }

//   function urlB64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//     const base64 = (base64String + padding)
//       .replace(/\-/g, '+')
//       .replace(/_/g, '/')

//     const rawData = window.atob(base64)
//     const outputArray = new Uint8Array(rawData.length)

//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i)
//     }
//     return outputArray
//   }

//   notifyButton.addEventListener('click', () => {
//     displayNotification()
//   })

//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       console.log('Service Worker and Push is supported')

//       navigator.serviceWorker
//         .register('sw.js')
//         .then((swReg) => {
//           console.log(
//             'ServiceWorker registration successful with scope: ',
//             swReg.scope
//           )
//           swRegistration = swReg
//           window.swRegistration = swReg

//           initializeUI()
//         })
//         .catch((err) => {
//           console.error('Service Worker Error', err)
//         })
//     })
//   } else {
//     console.warn('Push messaging is not supported')
//     pushButton.textContent = 'Push Not Supported'
//   }
// }
