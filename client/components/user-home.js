import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchList, fetchUpdatedList} from '../store/dailyProgress'
import {fetchUserHistory} from '../store/user'
import Navbar from './navbar'
import Grid from '@material-ui/core/Grid'
import {ProgressBar} from './progress-bar'
import {TamabuddyRoom} from './tamabuddy-room'
import {DailyProgressList} from './daily-progress-list'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // image: '',
      totalPoints: 0,
      dailyPoints: 0
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.setTotalPoints = this.setTotalPoints.bind(this)
    this.setDailyPoints = this.setDailyPoints.bind(this)
  }

  async setTotalPoints() {
    try {
      await this.props.getUserHistory(this.props.userId, 'pointsOnly')
      const totalHistoryPoints = this.props.history.reduce((ttl, day) => {
        const subTotal = Object.values(day).reduce(
          (subTtl, point) => subTtl + point,
          0
        )
        return ttl + subTotal
      }, 0)
      this.setState({totalPoints: totalHistoryPoints})
    } catch (error) {
      console.log(error)
    }
  }

  setDailyPoints() {
    try {
      let dailyPoints = Object.values(this.props.list).reduce((acc, curr) => {
        return acc + curr
      }, 0)
      this.setState({dailyPoints: dailyPoints})
    } catch (error) {
      console.error(error)
    }
  }

  async componentDidMount() {
    try {
      console.log('component did mount')
      await this.props.loadList()
      await this.setTotalPoints()
      await this.setDailyPoints()
    } catch (error) {
      console.log(error)
    }
  }

  async handleCheck(event) {
    event.preventDefault()
    try {
      if (event.target.checked === true) {
        await this.props.updateList(
          event.target.name,
          this.props.list[event.target.name] + 1
        )
      } else {
        await this.props.updateList(
          event.target.name,
          this.props.list[event.target.name] - 1
        )
      }
      await this.setDailyPoints()
      await this.setTotalPoints()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.props.list) {
      return (
        <>
          <div className="homeContainer">
            <Navbar />

            <Grid
              container
              // item
              justify="center"
              alignItems="center"
              direction="row"
            >
              <Grid item>
                <TamabuddyRoom
                  dailyPoints={this.state.dailyPoints}
                  totalPoints={this.state.totalPoints}
                />
              </Grid>

              <ProgressBar dailyPoints={this.state.dailyPoints} />
            </Grid>

            <DailyProgressList
              handleCheck={this.handleCheck}
              list={this.props.list}
            />
          </div>
        </>
      )
    } else {
      return <h1>LOADING...</h1>
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id,
    list: state.list.list,
    history: state.user.dailyprogresses
  }
}

const mapDispatch = dispatch => {
  return {
    loadList: () => dispatch(fetchList()),
    updateList: (column, points) => dispatch(fetchUpdatedList(column, points)),
    getUserHistory: (userId, action) =>
      dispatch(fetchUserHistory(userId, action))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
