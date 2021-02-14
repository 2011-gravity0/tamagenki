/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
import {DateRangeSharp} from '@material-ui/icons'
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
    this.getTime = this.getTime.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getAllFeed()
      console.log('this is feed', this.props.feed)
    } catch (error) {
      console.log(error)
    }
  }
  getTime() {
    const dateArr = []
    for (let i = 0; i < this.props.feed.length; i++) {
      let date = this.props.feed[i].createdAt
      dateArr.push(new Date(date))
    }
    return dateArr
  }
  render() {
    const feeds = this.props.feed
    const dates = this.getTime()
    console.log(dates[0])
    return (
      <div>
        <Navbar />
        <div className="feedbutton">
          <button type="button">Community Feed</button>
          <button type="button">Activity</button>
        </div>
        {feeds.reverse().map(feed => (
          <div key={feed.id} className="onefeed">
            {feed.user.petName} unlocked a new badge{' '}
            <img
              src={feed.level.badgeImage}
              style={{height: '25px', width: '25px'}}
            />
            <br />
            <small>{String(dates[0])}</small>
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
