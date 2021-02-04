import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory} from '../store/user'
import Navbar from './navbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      totalPoints: 0,
      dailyPoints: 0
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
    let dailyPoints = Object.values(this.props.list).reduce((acc, next) => {
      return acc + next
    }, 0)
    this.setState({dailyPoints: dailyPoints})
  }

  async componentDidMount() {
    try {
      await this.props.loadList()
      await this.setTotalPoints()
      await this.setTotalPoints()
      if (this.state.totalPoints < 7) {
        this.setState({image: '/eggGIF.gif'})
      } else {
        this.setState({image: '/Miniryu.gif'})
      }
    } catch (error) {
      console.log(error)
    }
  }

  async handleCheck(event) {
    event.preventDefault()
    try {
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
      await this.setTotalPoints()
      if (this.state.totalPoints >= 7 && this.state.image === '/eggGIF.gif') {
        this.setState({image: '/hatchEgg.gif'})
        setTimeout(() => {
          this.setState({image: 'Miniryu.gif'})
        }, 9000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.props.list && this.state.image) {
      return (
        <>
          <div className="homeContainer">
            <AppBar margin="5em">
              <Grid container justify="center">
                <h1>TAMAGENKI</h1>
                <Navbar />
              </Grid>
            </AppBar>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <img className="petImg" src={this.state.image} />
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      value={this.state.dailyPoints / 16 * 100}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography>{`${Math.round(
                      this.state.dailyPoints / 16 * 100
                    )}%`}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <List className="listContainer">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Did you get 8 hours of sleep?" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.sleep > 0}
                        name="sleep"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/cotton/64/000000/grape.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Check off today's fruit servings!" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.fruit > 0}
                        name="fruit"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.fruit > 1}
                        name="fruit"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.fruit > 2}
                        name="fruit"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Check off today's vegetables servings!" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.vegetables > 0}
                        name="vegetables"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.vegetables > 1}
                        name="vegetables"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.vegetables > 2}
                        name="vegetables"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/office/16/000000/water.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Check off today's water servings!" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.water > 0}
                        name="water"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.water > 1}
                        name="water"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.water > 2}
                        name="water"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.water > 3}
                        name="water"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.water > 4}
                        name="water"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.water > 5}
                        name="water"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/dusk/64/000000/exercise.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Did you get some exercise?" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.exercise > 0}
                        name="exercise"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/color/48/000000/relax-with-book.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Did you disconnect and relax today?" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.relaxation > 0}
                        name="relaxation"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
                <Grid container item xs={10}>
                  <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src="https://img.icons8.com/offices/30/000000/meditation-guru.png" />
                      </ListItemAvatar>
                      <ListItemText primary="Did you get a chance to meditate?" />
                      <Checkbox
                        onClick={event => {
                          this.handleCheck(event)
                        }}
                        checked={this.props.list.meditation > 1}
                        name="meditation"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
              </Grid>
            </List>
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
