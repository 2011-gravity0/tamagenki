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
    marginTop: 50,
    marginBottom: 15,
    padding: 20,
    backgroundColor: 'green'
  },
  button: {
    margin: 50,
    padding: 3
  }
})

export class Reminders extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Would you like reminders for any of the items listed below?'
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
        <AppBar margin="5em">
          <Grid container justify="center">
            <h1>TAMAGENKI</h1>
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
              <p className="typeWriter">{this.state.text}</p>
            </Grid>
          </Grid>
        </Box>
        <Card className={classes.root}>
          <FormGroup column="true">
            <Grid container justify="center">
              <Grid item container align="center">
                <h3>
                  It can be hard to remember to do these small tasks. Doing them
                  regularly improves your health and happiness, which makes your
                  Tamabuddy happier too!
                </h3>

                <p>
                  {' '}
                  Would you like a reminder throughout the day for any of these?
                </p>

                <p>Check the boxes that apply.</p>
              </Grid>

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
        </Card>

        <Grid container justify="center">
          <Box m={2} pt={3}>
            <Button style={styles.button} onClick={this.goBack}>
              Back
            </Button>
          </Box>
          <Box m={2} pt={3}>
            <Button style={styles.button} onClick={this.continue}>
              Continue
            </Button>
          </Box>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Reminders)
