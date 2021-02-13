import React, {Component} from 'react'

import {withStyles, makeStyles} from '@material-ui/core/styles'
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
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export class NameAndBedtime extends Component {
  constructor() {
    super()
    this.state = {
      text: 'To get started I need to know some more information about you...'
    }
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }
  // const classes = useStyles();
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
      <div className="question-component">
        <div className="questionContainer">
          <div className="questionOwlAnime">
            <Lottie options={owlOptions} height={100} width={100} />
          </div>
          <Grid container justify="center" className="questionHeader">
            <p className="owlTalk">{this.state.text}</p>
          </Grid>
          <div className="nameBedtimeContainer">
            <form className="questionItem">
              <TextField
                id="standard-helperText"
                className="questionItem"
                label="What's your name?"
                defaultValue={values.userName}
                onChange={handleChange('userName')}
                variant="outlined"
              />
            </form>
            <FormControl variant="outlined" className="questionItem">
              <InputLabel id="demo-simple-select-outlined-label">
                Ideal bedtime
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                defaultValue={values.bedTime}
                onChange={handleChange('bedTime')}
                label="What’s your ideal bedtime?"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="9:00pm">9:00pm </MenuItem>
                <MenuItem value="9:30pm">9:30pm </MenuItem>
                <MenuItem value="10:00pm">10:00pm </MenuItem>
                <MenuItem value="10:30pm">10:30pm </MenuItem>
                <MenuItem value="11:00pm">11:00pm </MenuItem>
                <MenuItem value="11:30pm">11:30pm </MenuItem>
                <MenuItem value="12:00pm">12:00am </MenuItem>
                <MenuItem value="12:30pm">12:30am </MenuItem>
                <MenuItem value="1:00am">1:00am</MenuItem>
                <MenuItem value="1:30am">1:30am</MenuItem>
                <MenuItem value="2:00am">2:00am </MenuItem>
              </Select>
            </FormControl>
          </div>
          <Grid container justify="center">
            <Button className={classes.button} onClick={this.continue}>
              Continue
            </Button>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(NameAndBedtime)

const styles = theme => ({
  // Load app bar information from the theme
  root: {
    width: 220
  },
  box: {
    padding: 10
  },
  input: {
    color: 'white'
  }
})
