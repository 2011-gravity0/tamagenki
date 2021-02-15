import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'

export const Reminders = props => {
  const {handleChange, nextStep, prevStep} = props
  const styles = useStyles()

  return (
    <div className="question-component">
      <div className="questionContainer">
        <div className="questionOwlAnime">
          <Lottie options={owlOptions} height={100} width={100} />
        </div>
        <Grid container justify="center" className="questionHeaderTwo">
          <p className="owlTalk">
            Lets move on to your preferences. Would you like push notifications
            for any of the items listed below?
          </p>
        </Grid>
        <div className="notificationContainer">
          <FormGroup column="true">
            {/* <Grid container justify="center" className="reminderAlign"> */}
            <FormControlLabel
              className="notificationItem"
              name="waterReminder"
              control={
                <Checkbox
                  onChange={handleChange}
                  checkedIcon={
                    <span className={clsx(styles.uncheck, styles.checked)} />
                  }
                  icon={<span className={styles.uncheck} />}
                />
              }
              label="Drink more water"
            />
            <FormControlLabel
              className="notificationItem"
              name="exerciseReminder"
              control={
                <Checkbox
                  onChange={handleChange}
                  checkedIcon={
                    <span className={clsx(styles.uncheck, styles.checked)} />
                  }
                  icon={<span className={styles.uncheck} />}
                />
              }
              label="Get your body moving"
            />
            <FormControlLabel
              className="notificationItem"
              name="meditationReminder"
              control={
                <Checkbox
                  onChange={handleChange}
                  checkedIcon={
                    <span className={clsx(styles.uncheck, styles.checked)} />
                  }
                  icon={<span className={styles.uncheck} />}
                />
              }
              label="Sit still and meditate"
            />
            <FormControlLabel
              className="notificationItem"
              name="sleepReminder"
              control={
                <Checkbox
                  onChange={handleChange}
                  checkedIcon={
                    <span className={clsx(styles.uncheck, styles.checked)} />
                  }
                  icon={<span className={styles.uncheck} />}
                />
              }
              label="Get ready for bed"
            />
            {/* </Grid> */}
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

const useStyles = makeStyles(theme => ({
  uncheck: {
    borderRadius: 3,
    width: 18,
    height: 18,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#fafafa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.5),hsla(0,0%,100%,0))',

    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    }
  },
  checked: {
    backgroundColor: '#f57822',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#f57822'
    }
  }
}))
