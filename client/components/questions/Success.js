import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Lottie from 'react-lottie'
import animationData from '../../../public/lotties/dumpling1/data.json'
import animationData2 from '../../../public/lotties/dumpling2/data.json'

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
  constructor(props) {
    super(props)
    //state determines which animation will be played. since there are only 2 options for now i'm using true/false
    this.state = {
      toggleAnimation: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  //this handle click function changes the state, which decides which animation to play
  handleClick = () => {
    this.setState({toggleAnimation: !this.state.toggleAnimation})
  }
  render() {
    let toggleAnimation = this.state.toggleAnimation
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    const defaultOptions2 = {
      loop: true,
      autoplay: true,
      animationData: animationData2,
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
        <Box m={1}>
          <Grid container justify="center">
            <h1>Great! Let's Get Started!</h1>
          </Grid>
        </Box>
        <Grid container column="true" justify="center">
          {/* this is the dumpling animation. Lottie elements aren't clickable so I had to wrap the whole thing in a Button */}
          <Button
            onClick={this.handleClick}
            style={{backgroundColor: 'transparent'}}
            disableRipple={true}
          >
            <Lottie
              options={toggleAnimation ? defaultOptions : defaultOptions2}
              height={400}
              width={400}
            />
          </Button>
          <h1>Are you ready to meet your tamabuddy?</h1>
          <Button component={Link} to="/nameEgg">
            yes
          </Button>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Success)