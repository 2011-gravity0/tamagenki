/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-warning-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable complexity */
/* eslint-disable guard-for-in */
import React from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2'
import {fetchUserHistory} from '../store/user'
import Avatar from '@material-ui/core/Avatar'

// TODO TONIGTH
//1 CREATE WEEKLY FUNCTION FOR ALL(9)
//2 CREATE MONTHLY FUNCTION (12)
//4 FINISH UP(3)
//GO TO BED (5)

let userhistory
let counter = 0
let weeklyArr
class UserHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      userId: '',
      dataChange: [1, 2, 3, 4, 5, 6, 7]
    }
    this.getData = this.getData.bind(this)
    this.plotGraph = this.plotGraph.bind(this)
    this.weeklyData = this.weeklyData.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  getData() {
    let data = this.props.history
    const sleepRecord = []
    const fruitRecord = []
    const waterRecord = []
    const execriseRecord = []
    const vegetablesRecord = []
    const relaxationRecord = []
    const meditationRecord = []
    data.forEach(element => {
      for (let key in element) {
        if (key === 'sleep') {
          sleepRecord.push(element[key])
        }
        if (key === 'fruit') {
          fruitRecord.push(element[key])
        }
        if (key === 'water') {
          waterRecord.push(element[key])
        }
        if (key === 'exercise') {
          execriseRecord.push(element[key])
        }
        if (key === 'vegetables') {
          vegetablesRecord.push(element[key])
        }
        if (key === 'relaxation') {
          relaxationRecord.push(element[key])
        }
        if (key === 'meditation') {
          meditationRecord.push(element[key])
        }
      }
    })
    const Record = [
      sleepRecord,
      fruitRecord,
      waterRecord,
      execriseRecord,
      vegetablesRecord,
      relaxationRecord,
      meditationRecord
    ]
    return Record
  }
  // cunstomerized to weekly data
  //just pass in line
  weeklyData = userData => {
    const data = []
    const modulusNum = userData.length % 7
    if (userData.length % 7 === 0) {
      while (data.length < 8) {
        return data.push(userData.pop())
      }
    } else {
      while (modulusNum !== data.length) {
        data.push(userData.pop())
      }
      console.log('this is user data in weekly', data)
      return data.reverse()
    }
  }
  handleClick() {
    console.log('this ihandle function working')
    const images = document.getElementById('historyavatar')
    let userData
    images.addEventListener('click', event => {
      const action = event.target.id
      console.log('this is action', action)
      if (action === 'bed') {
        userData = this.getData()[0]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
      if (action === 'grape') {
        userData = this.getData()[1]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
      if (action === 'vegetables') {
        userData = this.getData()[4]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
      if (action === 'water') {
        userData = this.getData()[2]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
      if (action === 'execrise') {
        userData = this.getData()[3]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
      if (action === 'relax') {
        userData = this.getData()[5]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
      if (action === 'meditation') {
        userData = this.getData()[6]
        weeklyArr = this.weeklyData(userData)
        this.setState({dataChange: weeklyArr})
      }
    })
    console.log('this is  weekly', weeklyArr)
  }
  plotGraph() {
    console.log('this is datachange', this.state.dataChange)
    return (
      <Line
        data={{
          labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          datasets: [
            {
              label: 'Weekly',
              data: this.state.dataChange,
              backgroundColor: ['rgba(255, 159, 64, 0.5)'],
              borderColor: ['rgba(255, 159, 64, 1)'],
              borderWidth: 1
            },
            {
              label: 'Monthly',
              data: [0, 1, 2, 3, 4, 2, 4, 5, 3, 2, 3, 4, 1],
              backgroundColor: ['rgba(75, 192, 192, 0.5)'],
              borderColor: ['rgba(75, 192, 192, 1)']
            }
          ]
        }}
        height={100}
        width={0}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    )
  }
  async componentDidMount() {
    try {
      const data = await this.props.getUserHistory(this.props.userId)
      this.getData()
      this.handleClick()
      console.log('component ran')
      this.setState({
        loading: false,
        userId: data
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const {loading, userId} = this.state
    // userhistory= this.props.getUserHistory(this.props.userId)
    return (
      <div>
        <Navbar />,
        {loading ? 'Loading' : this.plotGraph()}
        <div id="historyavatar">
          <div className="avatar" id="bed">
            <Avatar
              src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png"
              id="bed"
            />
          </div>
          <div className="avatar" id="grape">
            <Avatar src="https://img.icons8.com/cotton/64/000000/grape.png" />
          </div>
          <div className="avatar" id="vegetables">
            <Avatar src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png" />
          </div>
          <div className="avatar" id="water">
            <Avatar src="https://img.icons8.com/office/16/000000/water.png" />
          </div>
          <div className="avatar" id="execrise">
            <Avatar src="https://img.icons8.com/dusk/64/000000/exercise.png" />
          </div>
          <div className="avatar" id="relax">
            <Avatar src="https://img.icons8.com/color/48/000000/relax-with-book.png" />
          </div>
          <div className="avatar" id="meditation">
            <Avatar src="https://img.icons8.com/offices/30/000000/meditation-guru.png" />
          </div>
        </div>
      </div>
    )
  }
}
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
    getUserHistory: userId => dispatch(fetchUserHistory(userId))
  }
}
export default connect(mapState, mapDispatch)(UserHistory)
