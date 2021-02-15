import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'

export const Reminders = props => {
  const {handleChange, nextStep, prevStep} = props

  return (
    <div className="question-component">
      <div className="questionContainer">
        <div className="questionOwlAnime">
          <Lottie options={owlOptions} height={100} width={100} />
        </div>
        <Grid container justify="center" className="questionHeaderTwo">
          <p className="owlTalk">
            'Lets move on to your preferences. Would you like push notifications
            for any of the items listed below?',
          </p>
        </Grid>
        <div className="notificationContainer">
          <FormGroup column="true">
            <Grid container justify="center" className="reminderAlign">
              <FormControlLabel
                className="notificationItem"
                name="waterReminder"
                control={<Checkbox onChange={handleChange} />}
                label="Drink more water"
              />
              <FormControlLabel
                className="notificationItem"
                name="exerciseReminder"
                control={<Checkbox onChange={handleChange} />}
                label="Get your body moving"
              />
              <FormControlLabel
                className="notificationItem"
                name="meditationReminder"
                control={<Checkbox onChange={handleChange} />}
                label="Sit still and meditate"
              />
              <FormControlLabel
                className="notificationItem"
                name="sleepReminder"
                control={<Checkbox onChange={handleChange} />}
                label="Get ready for bed"
              />
            </Grid>
          </FormGroup>
        </div>
        <Grid container justify="center">
          <Box m={2} pt={3}>
            <Button onClick={prevStep}>Back</Button>
          </Box>
          <Box m={2} pt={3}>
            <Button
              onClick={() => {
                nextStep('reminder')
              }}
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </div>
    </div>
  )
}

const owlOptions = {
  loop: true,
  autoplay: true,
  animationData: animationOwl,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
