import React, {Component} from 'react'
import Lottie from 'react-lottie'
import animationEgg from '../../../public/lotties/eggWiggle.json'
import Button from '@material-ui/core/Button'

export class FindEgg extends Component {
  constructor(props) {
    super(props)
    this.continue = this.continue.bind(this)
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep('findEgg')
  }

  componentDidMount() {
    this.props.startMusic()
  }

  render() {
    const eggOptions = {
      loop: true,
      autoplay: true,
      animationData: animationEgg,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div className="find-egg-component">
        <div className="promptContainer">
          <p className="typeWriter owlTalk">
            You have stumbled across a Tamabuddy Egg! Would you like to keep it?
          </p>
        </div>
        <div className="eggContainer">
          <Lottie options={eggOptions} height={200} width={200} />
        </div>

        <Button className="guideButton" type="submit" onClick={this.continue}>
          Yes
        </Button>
      </div>
    )
  }
}
