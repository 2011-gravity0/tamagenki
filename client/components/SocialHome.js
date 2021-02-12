import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFeed} from '../store/unlock'

export class SocialHome extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      await this.props.getAllFeed()
      console.log('This is all feed', this.props.feed)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return <div>Social Home Rendered</div>
  }
}

const mapState = state => {
  return {
    feed: state.feed
  }
}

const mapDispatch = dispatch => {
  return {
    getAllFeed: () => dispatch(fetchAllFeed())
  }
}

export default connect(mapState, mapDispatch)(SocialHome)
