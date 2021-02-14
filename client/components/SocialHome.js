/* eslint-disable no-useless-constructor */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFeed} from '../store/unlock'
import Navbar from './navbar'

export class SocialHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: []
    }
    // this.showBadge = this.showBadge.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getAllFeed()
      console.log('this is feed', this.props.feed)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const feeds = this.props.feed
    return (
      <div>
        <Navbar />
        {feeds.map(feed => (
          <div key={feed.id}>
            {feed.user.petName} unlocked a new badge{' '}
            <img
              src={feed.level.badgeImage}
              style={{height: '25px', width: '25px'}}
            />
          </div>
        ))}
      </div>
    )
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
