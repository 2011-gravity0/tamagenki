import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NameAndBedtime} from './NameAndBedtime'
import {Reminders} from './Reminders'
import GuidePet from '../guidePet'
import {FindEgg} from './FindEgg'
import Explain from './Explain'
import {updateUser} from '../../store/user'

export class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      userName: '',
      bedTime: '',
      sleepReminder: false,
      exerciseReminder: false,
      waterReminder: false,
      meditationReminder: false
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //Proceed to next step
  async nextStep(page) {
    if (page === 'nameBed') {
      const requestBody = {
        userName: this.state.userName,
        bedTime: this.state.bedTime
      }
      await this.props.updateUser(this.props.userId, requestBody)
    } else if (page === 'reminder') {
      const requestBody = {
        sleepReminder: this.state.sleepReminder,
        exerciseReminder: this.state.exerciseReminder,
        waterReminder: this.state.waterReminder,
        meditationReminder: this.state.meditationReminder
      }
      await this.props.updateUser(this.props.userId, requestBody)
    }
    this.setState({
      step: this.state.step + 1
    })
  }

  //Go to previous step
  prevStep() {
    this.setState({
      step: this.state.step - 1
    })
  }

  handleChange(e) {
    if (this.state.step === 4) {
      this.setState({[e.target.name]: e.target.checked})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  render() {
    switch (this.state.step) {
      case 1:
        return <FindEgg nextStep={this.nextStep} />
      case 2:
        return <Explain nextStep={this.nextStep} />
      case 3:
        return (
          <NameAndBedtime
            nextStep={this.nextStep}
            handleChange={this.handleChange}
          />
        )
      case 4:
        return (
          <Reminders
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        )
      case 5:
        return <GuidePet />
    }
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (id, data) => {
      dispatch(updateUser(id, data))
    }
  }
}

export default connect(mapState, mapDispatch)(UserForm)
