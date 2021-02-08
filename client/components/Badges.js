import React from 'react'
import {connect} from 'react-redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory} from '../store/user'
import Navbar from './navbar'
import Grid from '@material-ui/core/Grid'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box'

const styles = theme => ({
  box: {
    width: '20em',
    margin: '2em',
    paddingBottom: '2em',
    paddingTop: '2em',
    backgroundColor: '#FFFAEA'
  },
  badge: {
    objectFit: 'cover',
    height: '12.5em',
    width: '12.5em'
  },
  title: {
    fontSize: '2.8rem',
    fontFamily: 'Fredoka One',
    color: '#4F7469',
    marginBottom: '2em'
  }
})

class Badges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      waterPoints: 0,
      meditationPoints: 0,
      movementPoints: 0,
      relaxationPoints: 0,
      sleepPoints: 0,
      veggiePoints: 0,
      fruitPoints: 0,
      sparklePoints: 0
    }
    this.setPoints = this.setPoints.bind(this)
  }

  async setPoints() {
    try {
      await this.props.getUserHistory(this.props.userId, 'pointsOnly')
      const totalWaterPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.water
      }, 0)
      const totalMeditationPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.meditation
      }, 0)
      const totalMovementPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.exercise
      }, 0)
      const totalRelaxationPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.relaxation
      }, 0)
      const totalFruitPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.fruit
      }, 0)
      const totalVegPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.vegetables
      }, 0)
      const totalSleepPoints = this.props.history.reduce((ttl, day) => {
        return ttl + day.sleep
      }, 0)
      const totalSparklePointsArray = this.props.history.filter(day => {
        let dayTotal = Object.values(day).reduce(
          (accumulator, points) => accumulator + points,
          0
        )
        if (dayTotal >= 10) return true
      })
      const totalSparklePoints = totalSparklePointsArray.length
      this.setState({
        waterPoints: totalWaterPoints,
        meditationPoints: totalMeditationPoints,
        movementPoints: totalMovementPoints,
        relaxationPoints: totalRelaxationPoints,
        sleepPoints: totalSleepPoints,
        veggiePoints: totalVegPoints,
        fruitPoints: totalFruitPoints,
        sparklePoints: totalSparklePoints
      })
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    try {
      await this.setPoints()
      console.log('badge points', this.state)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Navbar />
        <Grid container>
          <Grid
            item
            container
            alignItems="center"
            style={{marginTop: '5em'}}
            direction="column"
          >
            <Typography variant="h5" className={classes.title}>
              Level 1 Badges
            </Typography>
          </Grid>
          <Grid item container justify="center" alignItems="flex-end">
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.waterPoints >= 40
                        ? '/badges/water.svg'
                        : '/shadows/waterShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.waterPoints >= 40
                      ? 'Water Droplet Badge'
                      : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.waterPoints >= 40
                      ? 'You unlocked this badge with 50 Water points. Nice job staying hydrated!'
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.meditationPoints >= 7
                        ? '/badges/meditation.svg'
                        : '/shadows/meditationShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.meditationPoints >= 7
                      ? 'Still Mind Badge'
                      : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.meditationPoints >= 7
                      ? "You unlocked this badge with 7 Meditation points. Keep it up and you'll keep improving!"
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.movementPoints >= 5
                        ? '/badges/movement.svg'
                        : '/shadows/movementShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.movementPoints >= 5
                      ? 'Light Feet Badge'
                      : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.movementPoints >= 5
                      ? 'You unlocked this badge with 5 Movement points. Keep going, you and your tamabuddy will continue to get stronger!'
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.relaxationPoints >= 7
                        ? '/badges/relaxation.svg'
                        : '/shadows/relaxationShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.relaxationPoints >= 7
                      ? 'Self Care Badge'
                      : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.relaxationPoints >= 7
                      ? 'You unlocked this badge with 7 Relaxation points. Doing things that make you happy is good for your health!'
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.sleepPoints >= 7
                        ? '/badges/sleep.svg'
                        : '/shadows/sleepShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.sleepPoints >= 7 ? 'Sweet Dreams Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.sleepPoints >= 7
                      ? 'You unlocked this badge with 7 Sleep points. Going to sleep on time will make your future self happier!'
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.veggiePoints >= 15
                        ? '/badges/veg.svg'
                        : '/shadows/vegShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.veggiePoints >= 15 ? 'Vitamin Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.veggiePoints >= 15
                      ? 'You unlocked this badge with 15 Veg points. Eating nutritious food improves your physical and mental health!'
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.fruitPoints >= 15
                        ? '/badges/fruit.svg'
                        : '/shadows/fruitShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.fruitPoints >= 15 ? 'Juice Box Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.fruitPoints >= 15
                      ? 'You unlocked this badge with 15 Fruit points. Your cells and your tamabuddy want to say thank you. Nice job!'
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              justifyContent="space-around"
              justify="center"
              boxShadow={2}
              className={classes.box}
            >
              <Grid container alignContent="flex-end">
                <Grid item container justify="center">
                  <img
                    src={
                      this.state.sparklePoints >= 7
                        ? '/badges/sparkle.svg'
                        : '/shadows/sparkleShadow.svg'
                    }
                    height="200"
                    width="200"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography variant="body1" align="center">
                    {this.state.sparklePoints >= 7 ? 'Glimmer Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.sparklePoints >= 7
                      ? "You unlocked this badge by reaching Sparkle Mode 7 times. You're doing an amazing job taking care of yourself and your tamabuddy! Keep it up!"
                      : 'not unlocked yet'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}

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

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Badges)
