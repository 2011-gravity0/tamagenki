import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory, updateUser} from '../store/user'
import {fetchResp} from '../store/owlResponse'
import {fetchBoombox, fetchUpdatedBoombox} from '../store/boombox'

import {Howl, Howler} from 'howler'
import Navbar from './navbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Lottie from 'react-lottie'
import {ProgressBar} from './progress-bar'
import {DailyProgressList} from './daily-progress-list'
import {pushSetting} from '../../public/main'

import eggWiggleData from '../../public/lotties/eggWiggle.json'
import eggHatchData from '../../public/lotties/eggHatch.json'
import carrotData from '../../public/lotties/tamabuddyCarrot.json'
import exerciseData from '../../public/lotties/tamabuddyExercise.json'
import appleData from '../../public/lotties/tamabuddyFruit.json'
import idleData from '../../public/lotties/tamabuddyIdle.json'
import joyData from '../../public/lotties/tamabuddyJoy.json'
import jumpData from '../../public/lotties/tamabuddyJump.json'
import meditateData from '../../public/lotties/tamabuddyMeditate.json'
import sparkleData from '../../public/lotties/tamabuddySparkle.json'
import waveData from '../../public/lotties/tamabuddyWave.json'
import waterData from '../../public/lotties/tamabuddyWater.json'
import owlData from '../../public/lotties/owl.json'
import tamacoinData from '../../public/lotties/tamacoin.json'
import boomboxData from '../../public/lotties/boombox.json'

/**
 * OWL LOTTIE
 */
const guideAnimation = {
  loop: true,
  autoplay: true,
  animationData: owlData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

/**
 * TAMABUDDY LOTTIES
 */
const eggWiggleAnimation = {
  loop: true,
  autoplay: true,
  animationData: eggWiggleData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const eggHatchAnimation = {
  loop: true,
  autoplay: true,
  animationData: eggHatchData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const carrotAnimation = {
  loop: true,
  autoplay: true,
  animationData: carrotData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const exerciseAnimation = {
  loop: true,
  autoplay: true,
  animationData: exerciseData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const appleAnimation = {
  loop: true,
  autoplay: true,
  animationData: appleData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const idleAnimation = {
  loop: true,
  autoplay: true,
  animationData: idleData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const joyAnimation = {
  loop: true,
  autoplay: true,
  animationData: joyData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const jumpAnimation = {
  loop: true,
  autoplay: true,
  animationData: jumpData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const meditateAnimation = {
  loop: true,
  autoplay: true,
  animationData: meditateData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const sparkleAnimation = {
  loop: true,
  autoplay: true,
  animationData: sparkleData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const waveAnimation = {
  loop: true,
  autoplay: true,
  animationData: waveData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const waterAnimation = {
  loop: true,
  autoplay: true,
  animationData: waterData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const tamacoinAnimation = {
  loop: true,
  autoplay: true,
  animationData: tamacoinData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
const boomboxAnimation = {
  loop: true,
  autoplay: true,
  animationData: boomboxData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const styles = () => ({
  button: {
    paddingBottom: 0
  },
  modalTitle: {
    fontFamily: 'Fredoka One',
    color: '#fff',
    fontSize: '1.7em',
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center'
  },
  hatchedModalTitle: {
    fontFamily: 'Fredoka One',
    color: '#c58684',
    fontSize: '1.7em',
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 5,
    padding: '1 em'
  },
  hatchedPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'rgba(225,255,255,.7)',
    border: 'none',
    borderRadius: 5,
    padding: '1 em'
  },
  ptext2: {
    padding: '1.5 em',
    spacing: '1 em',
    margin: '1em',
    marginTop: 0,
    marginBottom: 0,
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  modalP: {
    margin: 0,
    color: '#c58684',
    // backgroundColor: '#7FBAC5',
    padding: 5,
    paddingTop: 3,
    paddingBottom: 3
  },
  levelCard: {
    margin: 8,
    padding: 5,
    backgroundColor: '#ECFFE6',
    borderRadius: 5,
    border: 'none'
  },
  inline: {
    float: 'left',
    display: 'inline',
    alignItems: 'center'
  },
  coin: {
    position: 'absolute',
    backgroundColor: '#C9E3BE',
    border: 'none',
    borderRadius: 5,
    padding: '1 em'
  },
  coinp: {
    padding: '1.5 em',
    spacing: '1 em',
    margin: 0,
    color: '#162C38',
    fontFamily: 'Helvetica',
    fontSize: '1.2em'
  }
})
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)

    this.song0 = new Howl({
      src: ['/music/whimsical-magic.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.08
    })

    this.song1 = new Howl({
      src: ['/music/60s-summer-party.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.08
    })

    this.song2 = new Howl({
      src: ['/music/city-of-light.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.08
    })

    this.song3 = new Howl({
      src: ['/music/claim-to-fame-8bit.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.08
    })

    this.song4 = new Howl({
      src: ['/music/welcome-to-my-dream.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.08
    })

    this.buddy = new Howl({
      src: ['/sounds/critter.mp3'],
      autoplay: false,
      loop: false,
      volume: 0.03
    })

    this.coin = new Howl({
      src: ['/sounds/coins.mp3'],
      autoplay: false,
      loop: false,
      volume: 0.25
    })

    this.owl = new Howl({
      src: ['/sounds/owlHmm.mp3'],
      autoplay: false,
      loop: false,
      volume: 0.05
    })

    this.badge = new Howl({
      src: ['/sounds/badge.mp3'],
      autoplay: false,
      loop: false,
      volume: 0.1
    })

    this.songs = [this.song0, this.song1, this.song2, this.song3, this.song4]

    this.state = {
      lottie: '',
      boomboxPaused: true,
      dancing: false,
      playing: false,
      song: 1,
      totalPoints: 0,
      dailyPoints: 0,

      water: 0,
      exercise: 0,
      fruit: 0,
      vegetables: 0,
      meditation: 0,
      sleep: 0,
      relaxation: 0,
      modal: '',

      isHatched: false,
      sparkleMode: false,
      owlResponse: "Hi I'm Owl. Click me!",
      completionModal: false,
      hatchedModal: false,
      unlockBadgeModal: false,
      boomboxModal: false,
      coinInfoModal: false,
      currentAnimation: 0,
      tamabuddyName: '',
      tamacoins: 0
    }

    this.handleCheck = this.handleCheck.bind(this)
    this.setTotalPoints = this.setTotalPoints.bind(this)
    this.setDailyPoints = this.setDailyPoints.bind(this)
    this.handleOwlClick = this.handleOwlClick.bind(this)
    this.eggHatch = this.eggHatch.bind(this)
    this.checkWhichBox = this.checkWhichBox.bind(this)
    this.sparkleModeCheck = this.sparkleModeCheck.bind(this)
    this.checkOrUncheck = this.checkOrUncheck.bind(this)
    this.finalCheck = this.finalCheck.bind(this)
    this.handleCoinClose = this.handleCoinClose.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nameSubmit = this.nameSubmit.bind(this)
    this.setTamacoins = this.setTamacoins.bind(this)
    this.waterCheck = this.waterCheck.bind(this)
    this.exerciseCheck = this.exerciseCheck.bind(this)
    this.fruitCheck = this.fruitCheck.bind(this)
    this.vegetablesCheck = this.vegetablesCheck.bind(this)
    this.meditationCheck = this.meditationCheck.bind(this)
    this.relaxationCheck = this.relaxationCheck.bind(this)
    this.sleepCheck = this.sleepCheck.bind(this)
    this.playSong = this.playSong.bind(this)
    this.pauseSong = this.pauseSong.bind(this)
    this.boomboxClick = this.boomboxClick.bind(this)
    this.boomboxCheck = this.boomboxCheck.bind(this)
    this.handleCoinInfo = this.handleCoinInfo.bind(this)
    this.handleBadgeClose = this.handleBadgeClose.bind(this)
    this.setBoombox = this.setBoombox.bind(this)
  }

  async playSong() {
    const num = Math.floor(Math.random() * 5)
    this.songs[num].play()
    console.log('this.songs[num] from playSong', num, this.songs[num])
    await this.props.updateBoombox(this.props.boombox.id, {
      playing: true,
      song: num
    })
    await this.setBoombox()
  }

  async pauseSong() {
    await this.props.updateBoombox(this.props.boombox.id, {
      playing: false
    })
    const num = this.state.song
    this.songs[num].stop()
    Howler.stop()
    await this.setBoombox()
  }

  async boomboxClick() {
    console.log('boombox from boomboxClick', this.props.boombox)
    if (this.props.boombox.playing) {
      await this.pauseSong()
    } else {
      await this.playSong()
    }
    await this.props.updateBoombox(this.props.boombox.id, {
      boomboxPaused: !this.props.boombox.boomboxPaused,
      dancing: !this.props.boombox.dancing
    })
    await this.setBoombox()
  }

  async setTotalPoints() {
    try {
      await this.props.getUserHistory(this.props.userId)
      const totalHistoryPoints = this.props.history.reduce((ttl, day) => {
        const subTotal = Object.values(day)
          .filter(element => typeof element === 'number')
          .reduce((subTtl, point) => {
            return subTtl + point
          }, 0)
        return ttl + subTotal
      }, 0)

      let water = 0
      this.props.history.map(day => (water += day.water))
      let exercise = 0
      this.props.history.map(day => (exercise += day.exercise))
      let fruit = 0
      this.props.history.map(day => (fruit += day.fruit))
      let vegetables = 0
      this.props.history.map(day => (vegetables += day.vegetables))
      let sleep = 0
      this.props.history.map(day => (sleep += day.sleep))
      let relaxation = 0
      this.props.history.map(day => (relaxation += day.relaxation))
      let meditation = 0
      this.props.history.map(day => (meditation += day.meditation))

      this.setState({
        totalPoints: totalHistoryPoints,
        water,
        exercise,
        fruit,
        vegetables,
        sleep,
        relaxation,
        meditation
      })
    } catch (error) {
      console.log(error)
    }
  }

  async setDailyPoints() {
    try {
      let list = Object.values(this.props.list)
      if (list.length === 8) {
        let dailyPoints = list
          .filter(el => typeof el === 'number')
          .reduce((acc, curr) => {
            return acc + curr
          }, 0)
        this.setState({dailyPoints: dailyPoints})
        await this.props.loadList()
      }
    } catch (error) {
      console.error(error)
    }
  }

  async setBoombox() {
    try {
      await this.props.getBoombox()
      this.setState({
        boomboxPaused: this.props.boombox.boomboxPaused,
        playing: this.props.boombox.playing,
        dancing: this.props.boombox.dancing,
        song: this.props.boombox.song
      })
    } catch (error) {
      console.log(error)
    }
  }

  async setTamacoins() {
    try {
      await this.props.getUserHistory(this.props.userId)
      const totalTamacoins = this.props.history.filter(
        day => day.tamacoin === true
      )
      this.setState({tamacoins: totalTamacoins.length})
    } catch (error) {
      console.log(error)
    }
  }

  async levelUpCheck() {
    if (this.state.totalPoints >= 3 && this.state.totalPoints < 10) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 1
      })
    }
    if (this.state.totalPoints >= 10 && this.state.totalPoints < 15) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 2
      })
    }
    if (this.state.totalPoints >= 15 && this.state.totalPoints < 100) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 3
      })
    }
    if (this.state.totalPoints >= 100 && this.state.totalPoints < 150) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 4
      })
    }
    if (this.state.totalPoints >= 150 && this.state.totalPoints < 200) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 5
      })
    }
    if (this.state.totalPoints >= 200 && this.state.totalPoints < 260) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 6
      })
    }
    if (this.state.totalPoints >= 260 && this.state.totalPoints < 300) {
      await this.props.nameBuddy(this.props.user.id, {
        level: 6
      })
    }
  }

  async checkWhichBox(event) {
    event.persist()

    if (
      event.target.name === 'fruit' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.fruitCheck()
      this.boomboxCheck()
      this.setState({lottie: appleAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
      await this.levelUpCheck()
    }
    if (
      event.target.name === 'vegetables' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.vegetablesCheck()
      this.boomboxCheck()
      this.setState({lottie: carrotAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
      await this.levelUpCheck()
    }
    if (
      event.target.name === 'water' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.waterCheck()
      this.boomboxCheck()
      this.setState({
        lottie: waterAnimation,
        water: this.state.water + 1
      })
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
      await this.levelUpCheck()
    }
    if (
      event.target.name === 'exercise' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.exerciseCheck()
      this.boomboxCheck()
      this.setState({lottie: exerciseAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
      await this.levelUpCheck()
    }
    if (
      event.target.name === 'meditation' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.meditationCheck()
      this.boomboxCheck()
      this.setState({lottie: meditateAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
      await this.levelUpCheck()
    }
    if (
      (event.target.name === 'relaxation' || event.target.name === 'sleep') &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.boomboxCheck()
      if (event.target.name === 'relaxation') {
        this.relaxationCheck()
      } else {
        this.sleepCheck()
      }

      this.setState({lottie: joyAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
      await this.levelUpCheck()
    }
  }

  eggHatch() {
    if (
      this.state.totalPoints >= 3 &&
      this.state.lottie === eggWiggleAnimation
    ) {
      this.setState({lottie: eggHatchAnimation})
      clearTimeout(this.state.currentAnimation)
      setTimeout(() => {
        this.setState({
          lottie: idleAnimation,
          isHatched: true,
          hatchedModal: true
        })
      }, 16000)
    }
  }

  sparkleModeCheck() {
    if (this.state.dailyPoints >= 5) {
      this.setState({lottie: sparkleAnimation, sparkleMode: true})
    }
    if (
      this.state.dailyPoints < 5 &&
      // this.state.lottie === sparkleAnimation &&
      this.state.totalPoints > 3
    ) {
      this.setState({
        lottie: idleAnimation,
        sparkleMode: false
      })
    }
    if (
      this.state.dailyPoints < 5 &&
      // this.state.lottie === sparkleAnimation &&
      this.state.totalPoints < 3
    ) {
      this.setState({
        lottie: eggWiggleAnimation,
        sparkleMode: false,
        isHatched: false
      })
    }
  }

  async checkOrUncheck(event) {
    if (event.target.checked === true) {
      await this.props.updateList(
        event.target.name,
        this.props.list[event.target.name] + 1
      )
    } else {
      this.setState({[event.target.name]: this.state[event.target.name] - 1})
      await this.props.updateList(
        event.target.name,
        this.props.list[event.target.name] - 1
      )
    }
  }

  finalCheck() {
    if (this.state.dailyPoints >= 15) {
      this.setState({completionModal: true})
    }
  }

  boomboxCheck() {
    if (this.state.totalPoints === 14) {
      this.setState({boomboxModal: true})
    }
  }

  waterCheck() {
    if (this.state.water === 4) {
      this.setState({unlockBadgeModal: true, modal: 'water'})
    }
  }
  exerciseCheck() {
    if (this.state.exercise === 1) {
      this.setState({unlockBadgeModal: true, modal: 'exercise'})
    }
  }
  fruitCheck() {
    if (this.state.fruit === 2) {
      this.setState({unlockBadgeModal: true, modal: 'fruit'})
    }
  }
  vegetablesCheck() {
    if (this.state.vegetables === 2) {
      this.setState({unlockBadgeModal: true, modal: 'vegetables'})
    }
  }
  sleepCheck() {
    if (this.state.sleep === 1) {
      this.setState({unlockBadgeModal: true, modal: 'sleep'})
    }
  }
  relaxationCheck() {
    if (this.state.relaxation === 1) {
      this.setState({unlockBadgeModal: true, modal: 'relaxation'})
    }
  }
  meditationCheck() {
    if (this.state.meditation === 0) {
      this.setState({unlockBadgeModal: true, modal: 'meditation'})
    }
  }

  async componentDidMount() {
    try {
      await pushSetting(this.props.user)

      await this.props.loadList()
      await this.props.getBoombox()
      await this.setBoombox()
      await this.setTotalPoints()
      await this.setDailyPoints()
      await this.setTamacoins()
      await this.levelUpCheck()

      console.log('boombox from componentdidmount', this.props.boombox)
      console.log(
        'is boombox paused? from componentdidmount',
        this.props.boombox.boomboxPaused
      )

      if (this.state.dailyPoints >= 3) {
        this.setState({
          lottie: sparkleAnimation,
          isHatched: true,
          sparkleMode: true
        })
      }
      if (this.state.totalPoints >= 3 && this.state.dailyPoints < 5) {
        this.setState({lottie: idleAnimation, isHatched: true})
      }
      if (this.state.totalPoints < 3) {
        this.setState({lottie: eggWiggleAnimation, isHatched: false})
      }
    } catch (error) {
      console.log(error)
    }
  }

  async handleCheck(event) {
    event.preventDefault()
    try {
      //check to see if sparkleMode should be set to true or false
      this.sparkleModeCheck()
      //check to see which animation change should occur based on checkbox name
      this.checkWhichBox(event)
      //update points based on whether checkbox is checked or unchecked
      await this.checkOrUncheck(event)

      //update local state to reflect new change
      await this.setDailyPoints()
      await this.setTotalPoints()

      //check to see if this is the 10th checkbox, then trigger eggHatch animation sequence if it is
      this.eggHatch()

      //check to see if this is the final checkbox, then trigger a modal and animation change if it is
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = () => {
    if (this.state.isHatched) {
      this.setState({lottie: waveAnimation})
      this.buddy.play()
      setTimeout(() => {
        this.setState({
          lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
        })
      }, 1900)
    }
  }

  handleOwlClick = async () => {
    this.owl.play()
    await this.props.getOwlResp()
    this.setState({owlResponse: this.props.response.response})
  }

  async handleCoinClose() {
    this.coin.play()
    this.setState({completionModal: false})
    await this.props.updateList('tamacoin', true)
    this.setTamacoins()
  }

  handleBadgeClose() {
    this.badge.play()
    this.setState({
      unlockBadgeModal: false
    })
  }

  handleClose() {
    this.setState({
      hatchedModal: false,
      boomboxModal: false,
      coinInfoModal: false
    })
  }

  handleCoinInfo() {
    this.coin.play()
    this.setState({
      coinInfoModal: true
    })
  }

  nameSubmit() {
    this.setState({hatchedModal: false})
    this.props.nameBuddy(this.props.userId, {petName: this.state.tamabuddyName})
    this.setState({hatchedModal: false})
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {lottie, modal} = this.state

    const modalTitles = {
      water: 'Water Droplet Badge',
      meditation: 'Still Mind Badge',
      exercise: 'Light Feet Badge',
      fruit: 'Juice Box Badge',
      vegetables: 'Vitamin Badge',
      sleep: 'Dream Badge',
      relaxation: 'Self Care Badge',
      sparkle: 'Glimmer Badge'
    }

    const modalImages = {
      water: '/badges/water.svg',
      meditation: '/badges/meditation.svg',
      exercise: '/badges/movement.svg',
      fruit: '/badges/fruit.svg',
      vegetables: '/badges/veg.svg',
      sleep: '/badges/sleep.svg',
      relaxation: '/badges/relaxation.svg',
      sparkle: '/badges/sparkle.svg'
    }

    const body = (
      <Grid container>
        <div
          style={{
            top: `${50}%`,
            left: `${45}%`,
            transform: `translate(-${50}%, -${50}%)`,
            margin: '1.5em',
            padding: '1em'
          }}
          className={classes.paper}
        >
          <Grid
            item
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <h2 className={classes.modalTitle}>GOOD JOB!!!</h2>
            <p className={classes.ptext2}>You unlocked the</p>
            <Button onClick={this.handleBadgeClose}>
              <img src={modalImages[modal]} height="200" width="200" />

              <h2 className={classes.modalTitle}>{modalTitles[modal]}</h2>
            </Button>
            <Button>Share</Button>
          </Grid>
        </div>
      </Grid>
    )

    if (this.props.list) {
      return (
        <>
          <div className="homeContainer">
            <Navbar />

            <Modal open={this.state.coinInfoModal} onClose={this.handleClose}>
              <Grid container>
                <div
                  style={{
                    top: `${50}%`,
                    left: `${45}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                    margin: '1.5em',
                    padding: '1em'
                  }}
                  className={classes.coin}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    <p className={classes.coinp}>
                      You'll get a Tamacoin every time
                      {' ' + this.props.user.petName}'s progress bar reaches
                      100%.
                    </p>
                  </Grid>
                </div>
              </Grid>
            </Modal>

            <Modal
              open={this.state.completionModal}
              onClose={this.handleCoinClose}
            >
              <Grid container>
                <div
                  style={{
                    top: `${65}%`,
                    left: `${45}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                    margin: '1.5em',
                    padding: '1em'
                  }}
                  className={classes.paper}
                >
                  <Lottie options={guideAnimation} height={125} width={125} />
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    <h2 className={classes.modalTitle}>GOOD JOB!!!</h2>
                    <p
                      style={{
                        margin: 0,
                        color: '#fff',
                        backgroundColor: '#7FBAC5',
                        padding: 5,
                        paddingTop: 3,
                        paddingBottom: 3
                      }}
                    >
                      {this.props.user.petName}'s progress bar has reached 100%.
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: '#fff',
                        fontWeight: 'bold',
                        backgroundColor: '#7FBAC5',
                        padding: 5,
                        paddingTop: 3,
                        paddingBottom: 3,
                        marginTop: 2
                      }}
                    >
                      {' '}
                      Take a TamaCoin, you deserve it!
                    </p>
                    <Button onClick={this.handleCoinClose}>
                      <Lottie
                        options={tamacoinAnimation}
                        height={200}
                        width={200}
                      />
                    </Button>
                  </Grid>
                </div>
              </Grid>
            </Modal>
            <Modal open={this.state.hatchedModal} onClose={this.nameSubmit}>
              <Grid container>
                <div
                  style={{
                    top: `${50}%`,
                    left: `${45}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                    margin: '1.5em',
                    padding: '1em'
                  }}
                  className={classes.paper}
                >
                  <Lottie options={guideAnimation} height={150} width={150} />
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    <h2 className={classes.modalTitle}>
                      CONGRATULATIONS YOU'VE HATCHED YOUR TAMABUDDY!!!
                    </h2>
                    <p className={classes.ptext2}>
                      What would you like to name it?
                    </p>

                    <TextField
                      placeholder="enter name here"
                      variant="outlined"
                      type="text"
                      name="tamabuddyName"
                      onChange={this.handleChange}
                      value={this.state.tamabuddyName}
                    />
                    <Button
                      style={{color: 'white'}}
                      type="submit"
                      onClick={this.nameSubmit}
                    >
                      submit
                    </Button>
                  </Grid>
                </div>
              </Grid>
            </Modal>
            <Modal
              open={this.state.unlockBadgeModal}
              onClose={this.handleClose}
            >
              {body}
            </Modal>
            <Modal open={this.state.boomboxModal} onClose={this.handleClose}>
              <Grid container>
                <div
                  style={{
                    top: `${65}%`,
                    left: `${45}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                    margin: '1.5em',
                    padding: '1em'
                  }}
                  className={classes.paper}
                >
                  <Lottie options={guideAnimation} height={125} width={125} />
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    <h2 className={classes.modalTitle}>
                      You unlocked {this.props.user.petName}'s boombox!
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: '#fff',
                        fontWeight: 'bold',
                        backgroundColor: '#7FBAC5',
                        padding: 5,
                        paddingTop: 3,
                        paddingBottom: 3,
                        marginTop: 2
                      }}
                    >
                      {' '}
                      You can play songs for {this.props.user.petName} by
                      tapping on the boombox to turn it on.
                    </p>
                    <Button onClick={this.handleClose}>
                      <Lottie
                        options={boomboxAnimation}
                        height={200}
                        width={200}
                      />
                    </Button>
                  </Grid>
                </div>
              </Grid>
            </Modal>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className="contentsContainer"
            >
              <div className="animationContainer">
                <Box className={classes.levelCard} width="100%">
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item>
                      <Avatar
                        src="/images/levelHeart.svg"
                        className={classes.inline}
                        variant="square"
                      />

                      <span
                        style={{fontFamily: 'Fredoka One', color: '#162C38'}}
                        className={classes.inline}
                      >
                        LEVEL: {this.props.user.level}{' '}
                      </span>
                      {/* <Grid item container spacing={0} alignItems="center" direction='row'> */}
                    </Grid>
                    <Grid item>
                      <Avatar
                        src="/images/tamacoin.svg"
                        className={classes.inline}
                        onClick={this.handleCoinInfo}
                      />

                      <span
                        style={{fontFamily: 'Fredoka One', color: '#162C38'}}
                        className={classes.inline}
                      >
                        {this.state.tamacoins}{' '}
                      </span>
                      {/* <Grid item container spacing={0} alignItems="center" direction='row'> */}
                    </Grid>
                    {/* </Grid> */}
                    <Grid item>streak</Grid>
                  </Grid>
                </Box>

                <div className="animation">
                  <div id="tamabuddyButton">
                    <Button
                      onClick={this.handleClick}
                      style={{backgroundColor: 'transparent', height: '100%'}}
                      disableRipple={true}
                      className={classes.button}
                    >
                      <Lottie
                        options={this.state.dancing ? jumpAnimation : lottie}
                        height={270}
                        width={270}
                      />
                    </Button>
                  </div>
                  <Button
                    onClick={this.boomboxClick}
                    style={{
                      backgroundColor: 'transparent',

                      padding: 0,
                      display: this.state.totalPoints < 15 ? 'none' : '',
                      disabled: this.state.totalPoints < 15
                    }}
                    disableRipple={true}
                  >
                    <Lottie
                      options={boomboxAnimation}
                      height={90}
                      width={90}
                      isStopped={this.state.boomboxPaused}
                    />
                  </Button>
                </div>
              </div>
            </Grid>
            <div className="progressBar">
              <ProgressBar dailyPoints={this.state.dailyPoints} />
            </div>
          </div>
          <Grid container justify="center" direction="row" alignItems="center">
            <Button
              onClick={this.handleOwlClick}
              style={{
                backgroundColor: 'transparent',
                display:
                  this.state.completionModal ||
                  this.state.hatchedModal ||
                  this.state.boomboxModal
                    ? 'none'
                    : ''
              }}
              disableRipple={true}
            >
              <Lottie options={guideAnimation} height={75} width={75} />
            </Button>
            <Grid item xs={8}>
              <Paper>{this.state.owlResponse}</Paper>
            </Grid>
          </Grid>
          <div className="homeContainer">
            <div className="listView">
              <DailyProgressList
                handleCheck={this.handleCheck}
                list={this.props.list}
              />
            </div>
          </div>
        </>
      )
    } else {
      return <h1>LOADING...</h1>
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id,
    list: state.list.list,
    history: state.user.dailyprogresses,
    user: state.user,
    response: state.response.response,
    boombox: state.boombox,
    boomboxId: state.boombox.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadList: () => dispatch(fetchList()),
    updateList: (column, points) => dispatch(fetchUpdatedList(column, points)),
    getUserHistory: userId => dispatch(fetchUserHistory(userId)),
    nameBuddy: (userId, data) => dispatch(updateUser(userId, data)),
    getOwlResp: () => dispatch(fetchResp()),
    getBoombox: () => dispatch(fetchBoombox()),
    updateBoombox: (boomboxId, boomboxData) =>
      dispatch(fetchUpdatedBoombox(boomboxId, boomboxData))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(UserHome)
/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
