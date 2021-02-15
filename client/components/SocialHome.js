/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFeed} from '../store/unlock'
import Navbar from './navbar'
// import {faThumbsUp} from '@fortawesome/pro-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Icon, InlineIcon} from '@iconify/react'
import thumbsUp from '@iconify-icons/fa-regular/thumbs-up'

export class SocialHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: []
    }
    this.getTime = this.getTime.bind(this)
    this.likes = this.likes.bind(this)
    this.clickedLikes = this.clickedLikes.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getAllFeed()
      await this.clickedLikes()
    } catch (error) {
      console.log(error)
    }
  }
  getTime() {
    const dateArr = []
    for (let i = 0; i < this.props.feed.length; i++) {
      let [date] = this.props.feed[i].createdAt
      dateArr.push(new Date(date))
    }
    return dateArr
  }
  likes(feedId) {
    const element = <Icon icon={thumbsUp} />
    return (
      <div id="body">
        <button
          class="like__btn"
          onClick={() => {
            this.clickedLikes(feedId)
          }}
          style={{height: '25px', width: '25px'}}
        >
          <span id="icon">{element}</span>
          <span id="count"> 0 </span> Like
        </button>
      </div>
    )
  }
  clickedLikes() {}
  render() {
    const feeds = this.props.feed
    let dates = this.getTime()
    console.log('FEED', this.props.feed)
    return (
      <div>
        <Navbar />
        <div>
          {feeds.reverse().map(feed => (
            <div key={feed.id} className="onefeed">
              {feed.user.petName} unlocked a new badge{' '}
              <img
                src={feed.level.badgeImage}
                style={{height: '25px', width: '25px'}}
              />
              <br />
              {this.likes(feed.id)}
              <small>{String(dates[0])}</small>
            </div>
          ))}
        </div>
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
// npm install --save-dev @iconify/react @iconify-icons/fa-regular
// import { Icon, InlineIcon } from '@iconify/react';
// import thumbsUp from '@iconify-icons/fa-regular/thumbs-up';
