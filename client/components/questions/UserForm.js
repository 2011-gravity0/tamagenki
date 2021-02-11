import React, {Component} from 'react'
import NameAndBedtime from './NameAndBedtime'
import Reminders from './Reminders'
import Success from './Success'
import {FindEgg} from './FindEgg'
import Explain from './Explain'

export class UserForm extends Component {
  state = {
    step: 1,
    userName: '',
    bedTime: '',
    sleepReminder: false,
    exerciseReminder: false,
    waterReminder: false,
    meditationReminder: false
  }

  //Proceed to next step
  nextStep = () => {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }

  //Go to previous step
  prevStep = () => {
    const {step} = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = input => e => {
    if (this.state.step === 2) {
      this.setState({[input]: e.target.checked})
    } else {
      this.setState({[input]: e.target.value})
    }
  }

  render() {
    const {step} = this.state
    const {
      userName,
      bedTime,
      sleepReminder,
      exerciseReminder,
      waterReminder,
      meditationReminder
    } = this.state
    const values = {
      userName,
      bedTime,
      sleepReminder,
      exerciseReminder,
      waterReminder,
      meditationReminder
    }
    switch (step) {
      case 1:
        return <FindEgg nextStep={this.nextStep} />
      case 2:
        return <Explain nextStep={this.nextStep} />
      case 3:
        return (
          <NameAndBedtime
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 4:
        return (
          <Reminders
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 5:
        return <Success />
    }
  }
}

export default UserForm
