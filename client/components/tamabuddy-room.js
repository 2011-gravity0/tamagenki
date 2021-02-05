import React from 'react'

export class TamabuddyRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: ''
    }
  }

  componentDidMount() {
    if (this.props.totalPoints < 7) {
      this.setState({image: '/eggGIF.gif'})
    } else {
      this.setState({image: '/Miniryu.gif'})
    }
  }

  componentDidUpdate() {
    if (this.props.totalPoints >= 7 && this.state.image === '/eggGIF.gif') {
      this.setState({image: '/hatchEgg.gif'})
      setTimeout(() => {
        this.setState({image: 'Miniryu.gif'})
      }, 9000)
    }
  }

  render() {
    return <img className="petImg" src={this.state.image} />
  }
}
