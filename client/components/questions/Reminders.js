import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'

const styles = theme => ({
  // Load app bar information from the theme
  toolbar: theme.mixins.toolbar,
  root: {
    marginTop: 30,
    padding: 20,
    marginBottom: 3
  },
  button: {
    margin: 20,
    padding: 5,
    backgroundColor: '#C9E3BE'
  },
  text: {
    marginTop: 0,
    padding: 20
  }
})

export class Reminders extends Component {
  constructor() {
    super()
    this.state = {
      text:
        'Lets move on to your preferences. Would you like push notifications for any of the items listed below?'
    }
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const {values, theme, classes, handleChange} = this.props
    const owlOptions = {
      loop: true,
      autoplay: true,
      animationData: animationOwl,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    return (
      <React.Fragment>
        <AppBar margin="5em" style={{background: '#FFB0AD'}}>
          <Grid container justify="center">
            <h1 style={{fontFamily: 'Fredoka One'}}>Tamagenki</h1>
          </Grid>
        </AppBar>
        <Paper>
          <div className={classes.toolbar} />
        </Paper>
        <Box m={4}>
          <Grid container justify="center" alignItems="flex-start">
            <Grid item>
              <Lottie options={owlOptions} height={50} width={50} />
            </Grid>
            <Grid item>
              <p className="questionHeader owlTalk">{this.state.text}</p>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.text}>
          <FormGroup column="true">
            <Grid container justify="center">
              <FormControlLabel
                control={<Checkbox onChange={handleChange('waterReminder')} />}
                label="drink more water"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleChange('exerciseReminder')} />
                }
                label="get your body moving"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleChange('meditationReminder')} />
                }
                label="sit still and meditate"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChange('sleepReminder')} />}
                label="get ready for bed"
              />
            </Grid>
          </FormGroup>
        </div>
        <Grid container justify="center">
          <Box m={2} pt={3}>
            <Button className={classes.button} onClick={this.goBack}>
              Back
            </Button>
          </Box>
          <Box m={2} pt={3}>
            <Button className={classes.button} onClick={this.continue}>
              Continue
            </Button>
          </Box>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Reminders)
