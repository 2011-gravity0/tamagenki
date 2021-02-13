import React, {Component} from 'react'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

export default class Explain extends Component {
  constructor(props) {
    super(props)
    this.continue = this.continue.bind(this)
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
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

    return (
      <div className="explain-component">
        <div className="promptContainer">
          <p className="explain-one owlTalk">
            You are now the gaurdian of a tammabuddy!
          </p>
          <p className="explain-two owlTalk">
            As a guardian, you are responsible for your buddy's health.
          </p>
          <p className="explain-three owlTalk">
            The great news is that your tamabuddy's health is tied to yours!
          </p>
          <p className="explain-four owlTalk">
            Tamagenki helps you make healthier choices with daily suggestions
            and reminders
          </p>
          <p className="explain-five owlTalk">
            As you checkoff some of your accomplishments your tammabuddy will
            aslo reap the benefits!
          </p>
          <p className="explain-six owlTalk">
            And as time continues you'll be able to earn badges congratulating
            you on your accomplishments.
          </p>
        </div>
        <div className="eggContainer">
          <Lottie options={owlOptions} height={200} width={200} />
        </div>
        <Button className="guideButton" type="submit" onClick={this.continue}>
          Continue
        </Button>
      </div>
    )
  }
}
