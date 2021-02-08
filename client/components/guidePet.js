import React from 'react'
// import UserHome from './user-home'
import animationOwl from '../../public/lotties/owl.json'
import Lottie from 'react-lottie'
import history from '../history'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  button: {
    margin: 50,
    padding: 3,
    backgroundColor: '#C9E3BE',
    color: '#4E7469'
  },
  text: {
    margin: 15,
    alignContent: 'center',
    padding: 4,
    backgroundColor: '#C8EAEF'
  }
})
export class GuidePet extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }
  nextPage() {
    history.push('/')
  }
  render() {
    const {classes} = this.props
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationOwl,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    return (
      <div className="tutorial-container">
        <div>
          <Lottie options={defaultOptions} height={300} width={300} />
          {/* <img
            src="https://i.pinimg.com/originals/e2/c9/cd/e2c9cd63e38ced85263bf88d8e131cfb.jpg"
            alt="Red Ruff Monster"
          /> */}
        </div>
        <Card className={classes.text}>
          <div className="guide-text">
            <h3>
              As a tamabuddy's guardian, your actions affect their health! As
              you check items off your list your tammabuddy also feels the
              positive impact in their life!
            </h3>
            <h3>
              {' '}
              Once you check off enough boxes, your egg will hatch. Different
              checkbox categories will cause different reactions from your
              tamabuddy. Make sure to check your badges in the dropdown menu on
              the navbar to see your progress as you go.
            </h3>
          </div>
        </Card>
        <Button className={classes.button} onClick={() => this.nextPage()}>
          Next
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(GuidePet)
