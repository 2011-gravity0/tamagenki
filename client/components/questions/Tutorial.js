import React, {Component} from 'react'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'

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

export class Tutorial extends Component {
  constructor() {
    super()
    this.state = {
      text1: 'Oh, you found a tamabuddy egg!',
      text2: "As a tamabuddy's gaurdian, your actions affect their health!",
      text3: 'As you check items off your list your tammabuddy',
      text4: 'also feels the positive impact in their life!',
      text5: 'Click continue if you understand.'
    }
  }

  render() {
    const owlOptions = {
      loop: true,
      autoplay: true,
      animationData: animationOwl,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    const {values, theme, classes, handleChange} = this.props
    return (
      <div>
        <AppBar margin="5em">
          <Grid container justify="center">
            <h1>TAMAGENKI</h1>
          </Grid>
        </AppBar>
        <Paper>
          <div className={classes.toolbar} />
        </Paper>
        <Lottie options={owlOptions} height={200} width={200} />
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="column"
          //   style={{width: "100%"}}
        >
          {Object.values(this.state).map((text, idx) => {
            return (
              <Grid container item key={idx}>
                <p>{text}</p>
              </Grid>
            )
          })}

          <button type="submit">Continue</button>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Tutorial)
