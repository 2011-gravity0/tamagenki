/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFeed} from '../store/unlock'
import Navbar from './navbar'

export class SocialHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: [],
      likesArr: []
    }
    this.getTime = this.getTime.bind(this)
    this.likes = this.likes.bind(this)
    this.clickedLikes = this.clickedLikes.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getAllFeed()
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
    const element = (
      <Icon icon={thumbsUp} style={{height: '5px', width: '5px'}} />
    )
    return (
      <div id="body">
        <button
          className="like__btn"
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

  async clickedLikes(feedId) {
    // const likeBtn = document.querySelector('.like__btn')
    let likeIcon = document.querySelector('#icon'),
      count = document.querySelector('#count')
    console.log('this is feedId:', feedId)
    if (!this.state.likesArr.includes(feedId)) {
      likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`
      count.textContent++
      await this.setState({
        likesArr: [...this.state.likesArr, feedId]
      })
      console.log('this button was liked')
      console.log('this is like arr', this.state.likesArr)
    } else {
      likeIcon.innerHTML = '<i class="far fa-thumbs-up"></i>'
      count.textContent--
      this.setState({
        likesArr: this.state.likesArr.filter(likeId => likeId !== feedId)
      })
      console.log('this button was unliked')
      console.log('this is like arr', this.state.likesArr)
    }
  }
  render() {
    console.log(this.props)
    const feeds = this.props.feed
    let dates = this.getTime()
    console.log('FEED', this.props.feed)
    return (
      <div>
        <Navbar />
        <div>
          {feeds.map(feed => (
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
