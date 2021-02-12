import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory} from '../store/user'
import Navbar from './navbar'
import Grid from '@material-ui/core/Grid'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'

const styles = theme => ({
  box: {
    width: '5em',
    margin: '1em',
    paddingBottom: '1em',
    paddingTop: '1em',
    backgroundColor: 'transparent'
  },
  badge: {
    objectFit: 'cover',
    height: '12.5em',
    width: '12.5em'
  },
  title: {
    fontSize: '1 rem',
    fontFamily: 'Fredoka One',
    color: '#4F7469',
    marginBottom: '.5 rem',
    marginTop: 0
  },
  button: {
    padding: 5,
    backgroundColor: '#C9E3BE'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#C9E3BE',
    border: 'none',
    borderRadius: 5,
    padding: '1 em'
  },
  ptext: {
    padding: '1.5 em',
    spacing: '1 em',
    margin: '1em',
    color: '#162C38',
    fontFamily: 'Helvetica',
    fontSize: '1.4em'
  },
  ptext2: {
    padding: '1.5 em',
    spacing: '1 em',
    margin: '1em',
    color: '#162C38',
    fontFamily: 'Helvetica',
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  modalTitle: {
    fontFamily: 'Fredoka One',
    color: '#BE2D25',
    fontSize: '1.7em'
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
      sparklePoints: 0,
      modalOpen: false,
      modal: ''
    }
    this.setPoints = this.setPoints.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async setPoints() {
    try {
      await this.props.getUserHistory(this.props.userId)
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
          (accumulator, points) =>
            typeof points === 'number' ? accumulator + points : accumulator + 0,
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
    } catch (error) {
      console.log(error)
    }
  }

  handleOpen(event) {
    try {
      event.preventDefault()
      console.log(event.currentTarget.value)
      this.setState({modalOpen: true, modal: event.currentTarget.value})
    } catch (error) {
      console.log(error)
    }
  }

  handleClose() {
    this.setState({modalOpen: false})
  }

  render() {
    const {classes} = this.props

    const {modal} = this.state

    const thresholds = {
      water: 4,
      meditation: 1,
      exercise: 1,
      fruit: 2,
      veggie: 2,
      sleep: 1,
      relaxation: 1,
      sparkle: 1
    }

    const modalMessages = {
      water: 'You unlocked this badge with 40 Water points.',
      meditation:
        "You unlocked this badge with 7 Meditation points. Keep it up and you'll keep improving!",
      exercise: 'You unlocked this badge with 5 Movement points.',
      fruit:
        'You unlocked this badge with 18 Fruit points. Keep up the good work!',
      veggie:
        'You unlocked this badge with 16 Veg points. Your body and your tamabuddy want to say thank you.',
      sleep: 'You unlocked this badge with 7 Sleep points. ZzzzZzZzz',
      relaxation: 'You unlocked this badge with 7 Relaxation points.',
      sparkle:
        'You unlocked this badge with 7 Sparkle Mode points. Wow great job!'
    }

    const modalMessages2 = {
      water:
        'Studies show that even mild dehydration, such as the loss of 1–3% of body weight, can impair many aspects of brain function. So stay hydrated!',
      meditation:
        'Meditation may help you gain a new perspective on stressful situations',
      exercise:
        'A way to stimulate your cellular appetite? Aerobic exercise promotes autophagy, which can lead to increased plasticity in the brain and removal of deranged proteins and other cellular debris implicated in neurodegenerative diseases, such as Alzheimer’s.',
      fruit:
        "According to the CDC, only 1 in 10 adults get enough fruits or vegetables. Seems like you've been doing pretty well in the fruit department 🍊😎",
      veggie:
        'Vegetables are high in fiber, which raises energy levels by improving vitamin & mineral absorption in the body.',
      sleep:
        'According to the National Institutes of Health, we spend 2 hours per night dreaming, on average.',
      relaxation:
        'Relaxation takes many forms. Reading, talking with family, or just watching a movie are all great ways to feed your soul and relax.',
      sparkle:
        'Forming new habits takes patience, so remember to stay consistent.'
    }

    const modalTitles = {
      water: 'Water Droplet Badge',
      meditation: 'Still Mind Badge',
      exercise: 'Light Feet Badge',
      fruit: 'Juice Box Badge',
      veggie: 'Vitamin Badge',
      sleep: 'Dream Badge',
      relaxation: 'Self Care Badge',
      sparkle: 'Glimmer Badge'
    }

    const modalImages = {
      water: '/badges/water.svg',
      meditation: '/badges/meditation.svg',
      exercise: '/badges/movement.svg',
      fruit: '/badges/fruit.svg',
      veggie: '/badges/veg.svg',
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
            <img src={modalImages[modal]} height="200" width="200" />

            <h2 className={classes.modalTitle}>{modalTitles[modal]}</h2>
          </Grid>
          <p className={classes.ptext}>{modalMessages[modal]}</p>
          <p className={classes.ptext2}>{modalMessages2[modal]}</p>
        </div>
      </Grid>
    )

    return (
      <div>
        <Navbar />
        <Grid container>
          <Grid
            item
            container
            alignItems="center"
            style={{marginTop: '1em'}}
            direction="column"
          >
            <Typography variant="h5" className={classes.title}>
              Level 1 Badges
            </Typography>
          </Grid>
          <Grid item container justify="center" alignItems="flex-end">
            <Modal open={this.state.modalOpen} onClose={this.handleClose}>
              {body}
            </Modal>
            <Button
              value="water"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.waterPoints < thresholds.water}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.waterPoints >= 4
                          ? '/badges/water.svg'
                          : '/shadows/waterShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.waterPoints >= 4 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="meditation"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.meditationPoints < thresholds.meditation}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.meditationPoints >= 1
                          ? '/badges/meditation.svg'
                          : '/shadows/meditationShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.meditationPoints >= 1 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="exercise"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.movementPoints < thresholds.exercise}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.movementPoints >= 1
                          ? '/badges/movement.svg'
                          : '/shadows/movementShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.movementPoints >= 1 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="relaxation"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.relaxationPoints < thresholds.relaxation}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.relaxationPoints >= 1
                          ? '/badges/relaxation.svg'
                          : '/shadows/relaxationShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.relaxationPoints >= 1 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="sleep"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.sleepPoints < thresholds.sleep}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.sleepPoints >= 1
                          ? '/badges/sleep.svg'
                          : '/shadows/sleepShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.sleepPoints >= 1 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="veggie"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.veggiePoints < thresholds.veggie}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.veggiePoints >= 2
                          ? '/badges/veg.svg'
                          : '/shadows/vegShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.veggiePoints >= 2 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="fruit"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.fruitPoints < thresholds.fruit}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.fruitPoints >= 2
                          ? '/badges/fruit.svg'
                          : '/shadows/fruitShadow.svg'
                      }
                      height="110"
                      width="110"
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
                      {this.state.fruitPoints >= 2 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>

            <Button
              value="sparkle"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
              disabled={this.state.sparklePoints < thresholds.sparkle}
            >
              <Box
                justifyContent="space-around"
                justify="center"
                boxShadow={0}
                className={classes.box}
              >
                <Grid container alignContent="flex-end">
                  <Grid item container justify="center">
                    <img
                      src={
                        this.state.sparklePoints >= 1
                          ? '/badges/sparkle.svg'
                          : '/shadows/sparkleShadow.svg'
                      }
                      height="110"
                      width="110"
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    style={{marginTop: '1em', marginBottom: '0em'}}
                  >
                    <Typography variant="body1" align="center">
                      {this.state.sparklePoints >= 1 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Button>
          </Grid>
          <Grid container justify="flex-end">
            <Link to="/badgestwo">
              <Button className={classes.button} onClick={this.continue}>
                Level 2 Badges {'->'}
              </Button>
            </Link>
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
