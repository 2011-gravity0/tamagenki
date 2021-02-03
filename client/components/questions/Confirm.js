import React, {Component} from 'react'
import {updateUser} from '../../store'
import {connect} from 'react-redux'
import {compose} from 'redux'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  // Load app bar information from the theme
  toolbar: theme.mixins.toolbar,
  root: {
    marginTop: 50,
    marginBottom: 15,
    padding: 20
  },
  button: {
    margin: 50,
    padding: 3
  }
})

export class Confirm extends Component {
  // continue = (e) => {
  //   e.preventDefault()
  //   //Connect to redux thunk here
  //   this.props.nextStep()
  // }
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  async handleSubmit(e) {
    e.preventDefault()
    let userData = {
      userName: this.props.values.userName,
      bedTime: this.props.values.bedTime,
      sleepReminder: this.props.values.sleepReminder,
      exerciseReminder: this.props.values.exerciseReminder,
      waterReminder: this.props.values.waterReminder,
      meditationReminder: this.props.values.meditationReminder
    }
    await this.props.updateUserInfo(this.props.user.id, userData)
    this.props.nextStep()
  }

  render() {
    const {theme, classes} = this.props
    const {
      values: {
        userName,
        bedTime,
        sleepReminder,
        exerciseReminder,
        waterReminder,
        meditationReminder
      }
    } = this.props

    return (
      <React.Fragment>
        <AppBar margin="5em">
          <Grid container justify="center">
            <h1>TAMAGENKI</h1>
          </Grid>
        </AppBar>
        <Paper>
          <div className={classes.toolbar} />
        </Paper>
        <Box mt={2}>
          <Grid container justify="center">
            <h1>Did I Get Your Answers Right?</h1>
          </Grid>
        </Box>

        <Box mt={2} pt={3}>
          <Card>
            <Grid container justify="center">
              <List>
                <ListItem alignItems="center">
                  <ListItemText primary="Your name is: " secondary={userName} />
                </ListItem>
                <ListItem alignItems="center">
                  <ListItemText
                    primary="You go to bed at: "
                    secondary={bedTime}
                  />
                </ListItem>
                <ListItem alignItems="center">
                  <ListItemText
                    primary={`You ${
                      exerciseReminder ? 'DO' : 'DO NOT'
                    } want a reminder to be active once a day`}
                  />
                </ListItem>
                <ListItem alignItems="center">
                  <ListItemText
                    primary={`You ${
                      meditationReminder ? 'DO' : 'DO NOT'
                    } want a reminder to meditate each day`}
                  />
                </ListItem>
                <ListItem alignItems="center">
                  <ListItemText
                    primary={`You ${
                      waterReminder ? 'DO' : 'DO NOT'
                    } want reminders to stay hydrated`}
                  />
                </ListItem>
                <ListItem alignItems="center">
                  <ListItemText
                    primary={`You ${
                      sleepReminder ? 'DO' : 'DO NOT'
                    } want a reminder to go to bed on time each night`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Card>
        </Box>

        <Grid container justify="center">
          <Box m={2} pt={3}>
            <Button style={styles.button} onClick={this.goBack}>
              Go Back
            </Button>
          </Box>
          <Box m={2} pt={3}>
            <Button style={styles.button} onClick={this.handleSubmit}>
              Confirm
            </Button>
          </Box>
        </Grid>
      </React.Fragment>
    )
  }
}
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  updateUserInfo: (userId, userData) => dispatch(updateUser(userId, userData))
})

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Confirm)
