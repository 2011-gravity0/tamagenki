import React from 'react'
import animationOwl from '../../public/lotties/owl.json'
import Lottie from 'react-lottie'
import history from '../history'
import Button from '@material-ui/core/Button'

export default class GuidePet extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }
  nextPage() {
    this.props.stopMusic()
    history.push('/')
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
      <div className="question-component">
        <div className="questionContainer">
          <div className="questionOwlAnime">
            <Lottie options={owlOptions} height={100} width={100} />
          </div>
          <div className="guide-header">
            <p className="owlTalk">You are all set!</p>
            <p className="owlTalk">
              We are now setting up your tamabuddy's room!
            </p>
          </div>
          <div className="guide-text">
            <p className="owlTalk">
              Your tamabuddy egg will hatch after checking off a few
              accomplishments.
            </p>
            <p className="owlTalk">
              We provided a suggested amount of servings for water, vegatables,
              and fruits along with other healthy habits suggestions.
            </p>
            <p className="owlTalk">
              Clicking on a info icon will provide more detail for each task!
            </p>
          </div>
          <Button className="startButton" onClick={() => this.nextPage()}>
            Let's Start!
          </Button>
        </div>
      </div>
    )
  }
}
