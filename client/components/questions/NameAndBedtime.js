import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'

const styles = theme => ({
  // Load app bar information from the theme
  toolbar: theme.mixins.toolbar,
  root: {
    marginTop: 50,
    marginBottom: 15,
    padding: 20
  },
  button: {
    margin: 20,
    padding: 3
  }
})

export class NameAndBedtime extends Component {
  constructor() {
    super()
    this.state = {
      text:
        'I will help you take care of your tamabuddy! To help you I need to know some more information...'
    }
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
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
          <form>
            <Grid container justify="center">
              <TextField
                id="standard-helperText"
                label="What's your name?"
                defaultValue={values.userName}
                onChange={handleChange('userName')}
              />
            </Grid>
          </form>
        </Card>
        <Card className={classes.root}>
          <form>
            <Grid container justify="center">
              <TextField
                id="standard-helperText"
                label="What's your ideal bedtime?"
                defaultValue={values.bedTime}
                helperText="your Tamabuddy will get sleepy around the same time as you"
                onChange={handleChange('bedTime')}
              />
            </Grid>
          </form>
        </Card>
        <Grid container justify="center">
          <Button style={styles.button} onClick={this.continue}>
            Continue
          </Button>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NameAndBedtime)
