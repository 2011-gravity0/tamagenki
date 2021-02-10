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
    } catch (error) {
      console.log(error)
    }
  }

  handleOpen(event) {
    try {
      //   event.preventDefault()
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

    const modalMessages = {
      water: 'You unlocked this badge with 80 Water points!',
      meditation: 'You unlocked this badge with 14 Meditation points!',
      exercise:
        "You unlocked this badge with 10 Movement points. Wow you're getting beefy!",
      fruit: 'You unlocked this badge with 40 Fruit points. Sweet!',
      veggie: "You unlocked this badge with 35 Veg points. You're on a roll!",
      sleep: 'You unlocked this badge with 14 Sleep points. 😴',
      relaxation: 'You unlocked this badge with 14 Relaxation points!',
      sparkle:
        'You unlocked this badge by reaching Sparkle Mode 14 times. Very impressive!'
    }

    const modalMessages2 = {
      water:
        'Fun fact: Adult humans are 60 percent water, and our blood is 90 percent water.',
      meditation:
        'Scientific studies on meditation have identified these benefits: Reduced rumination, stress reduction, improved memory, cognitive flexibility, relationship satisfaction, focus, lessening of emotional reactivity.',
      exercise:
        'Exercise stimulates your body to release proteins and other chemicals that improve the structure and function of your brain. 💪🏽🧠',
      fruit:
        'Many fruits, especially berries, are high in antioxidants. According to the National Cancer Institute, antioxidants neutralize free radicals, thus preventing them from causing damage.',
      veggie:
        'Diets high in vegetables can reduce the risk of cardiovascular disease. Cool 😎',
      sleep:
        'According to the Division of Medicine at Harvard Medical School, REM makes up between 20-25% of total sleep in healthy adults.',
      relaxation: 'Doing things that make you happy reduces stress.',
      sparkle:
        'Being consistent and practicing good habits will help you reach your goals. 💎'
    }

    const modalTitles = {
      water: 'Downpour Badge',
      meditation: 'Focus Badge',
      exercise: 'Kettlebell Badge',
      fruit: 'Smoothie Badge',
      veggie: 'Earth Badge',
      sleep: 'Full Moon Badge',
      relaxation: 'Soul Badge',
      sparkle: 'Diamond Badge'
    }

    const modalImages = {
      water: '/badges/water2.svg',
      meditation: '/badges/meditation2.svg',
      exercise: '/badges/movement2.svg',
      fruit: '/badges/fruit2.svg',
      veggie: '/badges/veg2.svg',
      sleep: '/badges/sleep2.svg',
      relaxation: '/badges/relaxation2.svg',
      sparkle: '/badges/sparkle2.svg'
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
              Level 2 Badges
            </Typography>
          </Grid>
          <Grid item container justify="center" alignItems="flex-end">
            <Modal open={this.state.modalOpen} onClose={this.handleClose}>
              {body}
            </Modal>
            <button
              type="button"
              value="water"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
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
                          ? '/badges/water2.svg'
                          : '/shadows/waterShadow2.svg'
                      }
                      height="120"
                      width="120"
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
            </button>

            <button
              type="button"
              value="meditation"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
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
                          ? '/badges/meditation2.svg'
                          : '/shadows/meditationShadow2.svg'
                      }
                      height="120"
                      width="120"
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
            </button>

            <button
              type="button"
              value="exercise"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
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
                          ? '/badges/movement2.svg'
                          : '/shadows/movementShadow2.svg'
                      }
                      height="115"
                      width="115"
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
            </button>

            <button
              type="button"
              value="sleep"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
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
                          ? '/badges/sleep2.svg'
                          : '/shadows/sleepShadow.svg'
                      }
                      height="120"
                      width="120"
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
            </button>

            <button
              type="button"
              value="relaxation"
              onClick={this.handleOpen}
              style={{marginLeft: '1.5em', marginRight: '.7em'}}
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
                          ? '/badges/relaxation2.svg'
                          : '/shadows/relaxationShadow2.svg'
                      }
                      height="140"
                      width="140"
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
            </button>

            <button
              type="button"
              value="veggie"
              onClick={this.handleOpen}
              style={{marginLeft: '.7em', marginRight: '.7em'}}
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
                          ? '/badges/veg2.svg'
                          : '/shadows/vegShadow2.svg'
                      }
                      height="130"
                      width="130"
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
            </button>

            <button
              type="button"
              value="fruit"
              onClick={this.handleOpen}
              style={{marginLeft: '2em', marginRight: '2em'}}
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
                          ? '/badges/fruit2.svg'
                          : '/shadows/fruitShadow2.svg'
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
            </button>

            <button
              type="button"
              value="sparkle"
              onClick={this.handleOpen}
              style={{marginLeft: '2em', marginRight: '2em'}}
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
                          ? '/badges/sparkle2.svg'
                          : '/shadows/sparkleShadow2.svg'
                      }
                      height="120"
                      width="120"
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
                      {this.state.sparklePoints >= 1 ? '' : '???'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </button>
          </Grid>
          <Grid container justify="flex-start">
            <Link to="/badges">
              <Button className={classes.button}>{'<-'} Level 1 Badges</Button>
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
)(BadgesTwo)
