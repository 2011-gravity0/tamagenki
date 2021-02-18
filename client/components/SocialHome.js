import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFeed} from '../store/unlock'
import Navbar from './navbar'
import moment from 'moment'

export class SocialHome extends React.Component {
  constructor(props) {
    super(props)

    this.getTime = this.getTime.bind(this)
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
      let date = this.props.feed[i].createdAt
      dateArr.push(moment(date).fromNow())
    }
    return dateArr
  }
  render() {
    const feeds = this.props.feed
    let dates = this.getTime()

    if (feeds.length) {
      return (
        <div>
          <Navbar />
          <div className="listContainer">
            {feeds.map(feed => (
              <div className="social-feed" key={feed.id}>
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
        </div>
      )
    } else {
      return <h1>LOADING...</h1>
    }
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
