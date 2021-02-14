import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Lottie from 'react-lottie'
import animationData from '../../../public/lotties/eggWiggle.json'
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

    const {classes} = this.props

    return (
      <div className="explain-component">
        <Grid container column="true" justify="center">
          <div>
            <h1>Great! You are all set!</h1>
            <h1>Are you ready to start your Tamagenki journey?</h1>
          </div>
          <div className="eggContainer">
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>
          <Grid item container justify="center">
            <Button className={classes.button} component={Link} to="guidePet">
              yes
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Success)

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
    padding: 5,
    backgroundColor: '#C9E3BE'
  }
})
