import React, {Component} from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'

export default class Reminders extends Component {
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
    const {classes, handleChange} = this.props
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
          <Grid container justify="center" className="questionHeaderTwo">
            <p className="owlTalk">{this.state.text}</p>
          </Grid>
          <div className="notificationContainer">
            <FormGroup column="true">
              <Grid container justify="center" className="reminderAlign">
                <FormControlLabel
                  className="notificationItem"
                  control={
                    <Checkbox onChange={handleChange('waterReminder')} />
                  }
                  label="Drink more water"
                />
                <FormControlLabel
                  className="notificationItem"
                  control={
                    <Checkbox onChange={handleChange('exerciseReminder')} />
                  }
                  label="Get your body moving"
                />
                <FormControlLabel
                  className="notificationItem"
                  control={
                    <Checkbox onChange={handleChange('meditationReminder')} />
                  }
                  label="Sit still and meditate"
                />
                <FormControlLabel
                  className="notificationItem"
                  control={
                    <Checkbox onChange={handleChange('sleepReminder')} />
                  }
                  label="Get ready for bed"
                />
              </Grid>
            </FormGroup>
          </div>
          <Grid container justify="center">
            <Box m={2} pt={3}>
              <Button onClick={this.goBack}>Back</Button>
            </Box>
            <Box m={2} pt={3}>
              <Button onClick={this.continue}>Continue</Button>
            </Box>
          </Grid>
        </div>
      </div>
    )
  }
}
