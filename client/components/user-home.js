import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory} from '../store/user'
import Navbar from './navbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Lottie from 'react-lottie'
import {ProgressBar} from './progress-bar'
import {DailyProgressList} from './daily-progress-list'

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

/**
 * LOTTIES
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
      sparkleMode: false
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.setTotalPoints = this.setTotalPoints.bind(this)
    this.setDailyPoints = this.setDailyPoints.bind(this)
  }

  async setTotalPoints() {
    try {
      await this.props.getUserHistory(this.props.userId, 'pointsOnly')
      const totalHistoryPoints = this.props.history.reduce((ttl, day) => {
        const subTotal = Object.values(day).reduce(
          (subTtl, point) => subTtl + point,
          0
        )
        return ttl + subTotal
      }, 0)
      this.setState({totalPoints: totalHistoryPoints})
    } catch (error) {
      console.log(error)
    }
  }

  setDailyPoints() {
    try {
      let dailyPoints = Object.values(this.props.list).reduce((acc, curr) => {
        return acc + curr
      }, 0)
      this.setState({dailyPoints: dailyPoints})
    } catch (error) {
      console.error(error)
    }
  }

  async componentDidMount() {
    try {
      console.log('totalPoints', this.state.totalPoints)
      await this.props.loadList()
      await this.setTotalPoints()
      await this.setDailyPoints()
      if (this.state.totalPoints >= 10 && this.state.dailyPoints < 10) {
        this.setState({lottie: idleAnimation, isHatched: true})
      }
      if (this.state.dailyPoints >= 10) {
        this.setState({
          lottie: sparkleAnimation,
          isHatched: true,
          sparkleMode: true
        })
      }
      if (this.state.totalPoints < 7) {
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
      if (this.state.dailyPoints >= 10 && this.state.lottie === idleAnimation) {
        this.setState({lottie: sparkleAnimation, sparkleMode: true})
      } else {
        this.setState({
          lottie: this.state.isHatched ? idleAnimation : eggWiggleAnimation,
          sparkleMode: false
        })
      }

      //check to see which animation change should occur based on checkbox name
      if (
        event.target.name === 'fruit' &&
        event.target.checked === true &&
        this.state.isHatched
      ) {
        this.setState({lottie: appleAnimation})
        setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 4000)
      }
      if (
        event.target.name === 'vegetables' &&
        event.target.checked === true &&
        this.state.isHatched
      ) {
        this.setState({lottie: carrotAnimation})
        setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 4000)
      }
      if (
        event.target.name === 'water' &&
        event.target.checked === true &&
        this.state.isHatched
      ) {
        this.setState({lottie: waterAnimation})
        setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 4000)
      }
      if (
        event.target.name === 'exercise' &&
        event.target.checked === true &&
        this.state.isHatched
      ) {
        this.setState({lottie: exerciseAnimation})
        setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 6000)
      }
      if (
        event.target.name === 'meditation' &&
        event.target.checked === true &&
        this.state.isHatched
      ) {
        this.setState({lottie: meditateAnimation})
        setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 6000)
      }
      if (
        (event.target.name === 'relaxation' || event.target.name === 'sleep') &&
        event.target.checked === true &&
        this.state.isHatched
      ) {
        this.setState({lottie: joyAnimation})
        setTimeout(() => {
          this.setState({
            lottie: this.state.sparkleMode ? sparkleAnimation : idleAnimation
          })
        }, 6000)
      }

      //update points based on whether checkbox is checked or unchecked
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

      //update local state to reflect new change
      await this.setDailyPoints()
      await this.setTotalPoints()

      //check to see if this is the 10th checkbox, then trigger eggHatch animation sequence
      if (
        this.state.totalPoints >= 10 &&
        this.state.lottie === eggWiggleAnimation
      ) {
        this.setState({lottie: eggHatchAnimation})
        setTimeout(() => {
          this.setState({
            lottie: sparkleAnimation,
            isHatched: true,
            sparkleMode: true
          })
        }, 16000)
      }
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

  render() {
    const {lottie} = this.state

    if (this.props.list) {
      return (
        <>
          <div className="homeContainer">
            <Navbar />

            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Button
                  onClick={this.handleClick}
                  style={{backgroundColor: 'transparent'}}
                  disableRipple={true}
                >
                  <Lottie options={lottie} height={400} width={400} />
                </Button>
              </Grid>

              <ProgressBar dailyPoints={this.state.dailyPoints} />
            </Grid>

            <DailyProgressList
              handleCheck={this.handleCheck}
              list={this.props.list}
            />
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
    history: state.user.dailyprogresses
  }
}

const mapDispatch = dispatch => {
  return {
    loadList: () => dispatch(fetchList()),
    updateList: (column, points) => dispatch(fetchUpdatedList(column, points)),
    getUserHistory: (userId, action) =>
      dispatch(fetchUserHistory(userId, action))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
