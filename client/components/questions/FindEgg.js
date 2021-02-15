import React, {Component} from 'react'
import Lottie from 'react-lottie'
import animationEgg from '../../../public/lotties/eggWiggle.json'
import Button from '@material-ui/core/Button'
import {AnimatePresence, motion} from 'framer-motion'

export class FindEgg extends Component {
  constructor(props) {
    super(props)
    this.continue = this.continue.bind(this)
  }
  continue = e => {
    e.preventDefault()
    this.props.nextStep('findEgg')
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
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key="findEgg"
          className="find-egg-component"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1}}
        >
          <div className="promptContainer">
            <p className="typeWriter owlTalk">
              You have stumbled across a Tamabuddy Egg! Would you like to keep
              it?
            </p>
          </div>
          <div className="eggContainer">
            <Lottie options={eggOptions} height={200} width={200} />
          </div>

          <Button className="guideButton" type="submit" onClick={this.continue}>
            Yes
          </Button>
        </motion.div>
      </AnimatePresence>
    )
  }
}
