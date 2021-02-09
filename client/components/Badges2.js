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

class BadgesTwo extends React.Component {
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
              Level 2 Badges
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
                      this.state.waterPoints >= 4
                        ? '/badges/water2.svg'
                        : '/shadows/waterShadow2.svg'
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
                    {this.state.waterPoints >= 4 ? 'Downpour Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.waterPoints >= 6
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
                      this.state.meditationPoints >= 1
                        ? '/badges/meditation2.svg'
                        : '/shadows/meditationShadow2.svg'
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
                    {this.state.meditationPoints >= 1
                      ? 'Focused Mind Badge'
                      : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.meditationPoints >= 1
                      ? "You unlocked this badge with 14 Meditation points. Keep it up and you'll keep improving!"
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
                      this.state.movementPoints >= 1
                        ? '/badges/movement2.svg'
                        : '/shadows/movementShadow2.svg'
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
                    {this.state.movementPoints >= 1
                      ? 'Kettlebell Badge'
                      : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.movementPoints >= 1
                      ? 'You unlocked this badge with 10 Movement points. Keep going, you and your tamabuddy will continue to get stronger!'
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
                      this.state.relaxationPoints >= 1
                        ? '/badges/relaxation2.svg'
                        : '/shadows/relaxationShadow2.svg'
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
                    {this.state.relaxationPoints >= 1 ? 'Soul Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.relaxationPoints >= 1
                      ? 'You unlocked this badge with 14 Relaxation points. Doing things that make you happy is good for your health!'
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
                      this.state.sleepPoints >= 1
                        ? '/badges/sleep2.svg'
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
                    {this.state.sleepPoints >= 1 ? 'Full Moon Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.sleepPoints >= 1
                      ? 'You unlocked this badge with 14 Sleep points. Going to sleep on time will make your future self happier!'
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
                      this.state.veggiePoints >= 2
                        ? '/badges/veg2.svg'
                        : '/shadows/vegShadow2.svg'
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
                    {this.state.veggiePoints >= 2 ? 'Earth Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.veggiePoints >= 2
                      ? 'You unlocked this badge with 30 Veg points. Eating nutritious food improves your physical and mental health!'
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
                      this.state.fruitPoints >= 2
                        ? '/badges/fruit2.svg'
                        : '/shadows/fruitShadow2.svg'
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
                    {this.state.fruitPoints >= 2 ? 'Smoothie Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.fruitPoints >= 2
                      ? 'You unlocked this badge with 30 Fruit points. Your cells and your tamabuddy want to say thank you. Nice job!'
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
                      this.state.sparklePoints >= 1
                        ? '/badges/sparkle2.svg'
                        : '/shadows/sparkleShadow2.svg'
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
                    {this.state.sparklePoints >= 1 ? 'Diamond Badge' : '???'}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.sparklePoints >= 1
                      ? "You unlocked this badge by reaching Sparkle Mode 14 times. You're doing an amazing job taking care of yourself and your tamabuddy! Keep it up!"
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
)(BadgesTwo)
