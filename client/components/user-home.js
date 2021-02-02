import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
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

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    this.props.loadList()
  }

  handleCheck(event) {
    event.preventDefault()

    if (event.target.checked === true) {
      this.props.updateList(
        event.target.name,
        this.props.list[event.target.name] + 1
      )
    } else {
      this.props.updateList(
        event.target.name,
        this.props.list[event.target.name] - 1
      )
    }
  }

  render() {
    if (this.props.list) {
      return (
        <>
          <AppBar margin="5em">
            <Grid container justify="center">
              <h1>TAMAGENKI</h1>
              <Navbar />
            </Grid>
          </AppBar>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <img src="../../eggGIF.gif" />
            </Grid>
          </Grid>
          <List>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid container item xs={6}>
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
              <Grid container item xs={6}>
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
              <Grid container item xs={6}>
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
              <Grid container item xs={6}>
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
              <Grid container item xs={6}>
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
              <Grid container item xs={6}>
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
              <Grid container item xs={6}>
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
    list: state.list.list
  }
}

const mapDispatch = dispatch => {
  return {
    loadList: () => dispatch(fetchList()),
    updateList: (column, points) => dispatch(fetchUpdatedList(column, points))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
