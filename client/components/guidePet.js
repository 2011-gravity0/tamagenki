import React from 'react'
// import UserHome from './user-home'
import animationOwl from '../../public/lotties/owl.json'
import Lottie from 'react-lottie'
import history from '../history'
export default class GuidePet extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }
  nextPage() {
    history.push('/')
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationOwl,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    return (
      <div>
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
          {/* <img
            src="https://i.pinimg.com/originals/e2/c9/cd/e2c9cd63e38ced85263bf88d8e131cfb.jpg"
            alt="Red Ruff Monster"
          /> */}
        </div>
        <div>
          <p>
            Hi dear, I see you have a new egg boy. You need to take care of
            them, you want them to hatch.
          </p>
        </div>
        <button type="button" onClick={() => this.nextPage()}>
          Next
        </button>
      </div>
    )
  }
}