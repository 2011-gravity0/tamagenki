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
    const owlOption = {
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
          <Lottie options={owlOption} height={300} width={300} />
        </div>
        <Card className={classes.text}>
          <div className="guide-text">
            <h3>
              We are now setting up your tamabuddy's room!
              {/* {' '}
              Welcome to Tamagenki, an accountability pet game that doubles as a
              way to incorporate healthy habits into your daily life. When you
              complete actions in the real world, check off the corresponding
              boxes in Tamagenki to hatch your egg and earn badges!! */}
            </h3>
            <p>
              {' '}
              Your tamabuddy egg will hatch after checking off 3
              accomplishments.
            </p>
            <p>
              {' '}
              We provided a suggested amount of servings for water, vegatables,
              and fruits.
            </p>
            <p>
              Clicking on a task icon will provide some helpful suggestions!
            </p>
          </div>
        </Card>
        <Button className={classes.button} onClick={() => this.nextPage()}>
          Welcome!
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(GuidePet)
