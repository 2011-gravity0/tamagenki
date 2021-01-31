import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Lottie from 'react-lottie'
import animationData from '../../../public/lotties/owl.json'

const styles = theme => ({
  // Load app bar information from the theme
  toolbar: theme.mixins.toolbar,
  root: {
    margin: 100,
    marginBottom: 15,
    padding: 20
  },
  button: {
    margin: 50,
    padding: 3
  }
})

export class Success extends Component {
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    const {values, theme, classes, handleChange} = this.props

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
          <Grid container justify="center">
            <h1>Great! Let's Get Started!</h1>
          </Grid>
        </Box>
        <Lottie options={defaultOptions} height={400} width={400} />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Success)
