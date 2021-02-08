import React, {Component} from 'react'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'
import animationEgg from '../../../public/lotties/eggWiggle.json'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

export class FindEgg extends Component {
  constructor(props) {
    super(props)
    this.continue = this.continue.bind(this)
    // this.typeWriter = this.typeWriter.bind(this)
    this.state = {
      text:
        'You have stumbled across a Tamabuddy Egg! Would you like to keep it?'
    }
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  //   typeWriter() {
  //     let i = 0
  //     let speed = 50
  //     const {text} = this.state
  //     if (i < text.length) {
  //       document.getElementsByClassName('typeScript').innerHTML += text.charAt(i)
  //       i++
  //       setTimeout(typeWriter, speed)
  //     }
  //   }
  render() {
    const eggOptions = {
      loop: true,
      autoplay: true,
      animationData: animationEgg
      //   rendererSettings: {
      //     preserveAspectRatio: 'xMidYMid slice',
      //   },
    }

    let body = document.getElementById('body')
    body.style.backgroundImage =
      'url(https://i.pinimg.com/originals/9c/bd/31/9cbd314122dc25c3e416cd12f8fba982.jpg)'
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundPosition = 'center'
    body.style.backgroundSize = '50'
    body.style.backgroundColor = 'rgba(200, 234, 239, 1)'

    return (
      <div className="find-egg-component">
        <p
          className="typeWriter"
          style={{backgroundColor: 'rgba(200, 234, 239, .5)'}}
        >
          {this.state.text}
        </p>
        <Lottie options={eggOptions} height={200} width={200} />

        <Button type="submit" onClick={this.continue}>
          Yes
        </Button>
      </div>
    )
  }
}
