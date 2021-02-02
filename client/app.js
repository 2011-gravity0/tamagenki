import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  // window.addEventListener('load', (e) => {
  //   new PWAConfApp()
  //   registerSW()
  // })

  // async function registerSW() {
  //   if ('serviceWorker' in navigator) {
  //     try {
  //       await navigator.serviceWorker.register('./sw.js')
  //     } catch (e) {
  //       alert('ServiceWorker registration failed. Sorry about that.')
  //     }
  //   } else {
  //     document.querySelector('.alert').removeAttribute('hidden')
  //   }
  // }

  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
