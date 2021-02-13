import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory, updateUser} from '../store/user'
import {fetchResp} from '../store/owlResponse'
import Navbar from './navbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
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

const styles = theme => ({
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
  }
})
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lottie: '',
      totalPoints: 0,
      dailyPoints: 0,
      isHatched: false,
      sparkleMode: false,
      owlResponse: "Hi I'm Owl. Click me!",
      completionModal: false,
      currentAnimation: 0,
      hatchedModal: false,
      tamabuddyName: ''
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
  }

  async setTotalPoints() {
    try {
      await this.props.getUserHistory(this.props.userId)
      console.log('user history', this.props.history)
      const totalHistoryPoints = this.props.history.reduce((ttl, day) => {
        const subTotal = Object.values(day)
          .filter(element => typeof element === 'number')
          .reduce((subTtl, point) => {
            return subTtl + point
          }, 0)
        return ttl + subTotal
      }, 0)
      this.setState({totalPoints: totalHistoryPoints})
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
      console.log(
        'setDailyPoints user home daily points',
        this.state.dailyPoints
      )
    } catch (error) {
      console.error(error)
    }
  }

  checkWhichBox(event) {
    if (
      event.target.name === 'fruit' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.setState({lottie: appleAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
    }
    if (
      event.target.name === 'vegetables' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.setState({lottie: carrotAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
    }
    if (
      event.target.name === 'water' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.setState({lottie: waterAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
    }
    if (
      event.target.name === 'exercise' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.setState({lottie: exerciseAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
    }
    if (
      event.target.name === 'meditation' &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.setState({lottie: meditateAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
    }
    if (
      (event.target.name === 'relaxation' || event.target.name === 'sleep') &&
      event.target.checked === true &&
      this.state.isHatched
    ) {
      this.finalCheck()
      this.setState({lottie: joyAnimation})
      clearTimeout(this.state.currentAnimation)
      this.setState({
        currentAnimation: setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 3000)
      })
    }
  }

  eggHatch() {
    if (
      this.state.totalPoints >= 3 &&
      this.state.lottie === eggWiggleAnimation
    ) {
      this.setState({lottie: eggHatchAnimation})
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

  async componentDidMount() {
    try {
      await pushSetting(this.props.user)

      await this.props.loadList()
      await this.setTotalPoints()
      await this.setDailyPoints()

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
      setTimeout(() => {
        this.setState({
          lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
        })
      }, 1900)
    }
  }

  handleOwlClick = async () => {
    await this.props.getOwlResp()
    this.setState({owlResponse: this.props.response.response})
    console.log('PROPS', this.props)
  }

  async handleCoinClose() {
    this.setState({completionModal: false})
    await this.props.updateList('tamacoin', true)
  }

  handleClose() {
    this.setState({completionModal: false, hatchedModal: false})
  }

  nameSubmit() {
    this.props.nameBuddy(this.props.userId, {petName: this.state.tamabuddyName})
  }

  handleChange() {
    console.log('event name', event.target.name)
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state.tamabuddyName)
  }

  render() {
    const {classes} = this.props
    const {lottie} = this.state
    const owlMessage1 = "hello i'm owl"
    const owlMessage2 = 'howdy folks! check off some boxes'

    if (this.props.list) {
      return (
        <>
          <div className="homeContainer">
            <Navbar />

            <Modal
              open={this.state.completionModal}
              onClose={this.handleCoinClose}
            >
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
            <Modal open={this.state.hatchedModal} onClose={this.handleClose}>
              <Grid container>
                <div
                  style={{
                    top: `${50}%`,
                    left: `${45}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                    margin: '1.5em',
                    padding: '1em'
                  }}
                  className={classes.hatchedPaper}
                >
                  <Lottie options={guideAnimation} height={150} width={150} />
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    <h2 className={classes.hatchedModalTitle}>
                      CONGRATULATIONS YOU'VE HATCHED YOUR TAMABUDDY!!!
                    </h2>
                    <p className={classes.modalP}>
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
                    <button
                      style={{color: '#c58684'}}
                      type="submit"
                      onClick={this.nameSubmit}
                    >
                      submit
                    </button>
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
                <div className="animation">
                  <Button
                    onClick={this.handleClick}
                    style={{backgroundColor: 'transparent'}}
                    disableRipple={true}
                    className={classes.button}
                  >
                    <Lottie options={lottie} height={300} width={300} />
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
                  this.state.completionModal || this.state.hatchedModal
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
    response: state.response.response
  }
}

const mapDispatch = dispatch => {
  return {
    loadList: () => dispatch(fetchList()),
    updateList: (column, points) => dispatch(fetchUpdatedList(column, points)),
    getUserHistory: userId => dispatch(fetchUserHistory(userId)),
    nameBuddy: (userId, data) => dispatch(updateUser(userId, data)),
    getOwlResp: () => dispatch(fetchResp())
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
