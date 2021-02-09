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
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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
              <p className="typeWriter">{this.state.text}</p>
            </Grid>
          <Grid container justify="center">
            <h1 className="questionHeader">
              Hi! Please Answer Some Questions About Yourself
            </h1>
          </Grid>
        </Box>
        <div className={classes.root}>
          <form>
            <Grid container justify="center">
              <Grid item container justify="center">
                <TextField
                  id="standard-helperText"
                  label="What's your name?"
                  defaultValue={values.userName}
                  onChange={handleChange('userName')}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>

          <Grid container justify="center">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                BedTime
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
                <MenuItem value={6}>6:00pm</MenuItem>
                <MenuItem value={7}>7:00pm </MenuItem>
                <MenuItem value={8}>8:00pm </MenuItem>
                <MenuItem value={9}>9:00pm </MenuItem>
                <MenuItem value={10}>10:00pm </MenuItem>
                <MenuItem value={11}>11:00pm </MenuItem>
                <MenuItem value={12}>12:00am </MenuItem>
                <MenuItem value={1}>1:00am</MenuItem>
                <MenuItem value={2}>2:00am </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </div>

        <Grid container justify="center">
          <Button className={classes.button} onClick={this.continue}>
            Continue
          </Button>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NameAndBedtime)
