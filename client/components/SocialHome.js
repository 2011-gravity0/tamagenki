import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFeed} from '../store/unlock'
import Navbar from './navbar'
import Likes from './likes'
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
      let [date] = this.props.feed[i].createdAt
      dateArr.push(new Date(date))
    }
    return dateArr
  }
  render() {
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
              <Likes />
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
