import React from 'react'
import UserHome from './user-home'
export default class GreetPet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPage: false
    }
    this.nextPage = this.nextPage.bind(this)
    this.petPage = this.petPage.bind(this)
  }
  nextPage() {
    this.setState({
      showPage: true
    })
  }
  petPage() {
    return (
      <div>
        <div>
          <img
            src="https://i.pinimg.com/originals/e2/c9/cd/e2c9cd63e38ced85263bf88d8e131cfb.jpg"
            alt="Red Ruff Monster"
          />
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
  render() {
    return this.state.showPage ? (
      <div>
        <UserHome />
      </div>
    ) : (
      <div>{this.nextPage()}</div>
    )
  }
}
