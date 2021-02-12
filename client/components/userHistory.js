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
//MAKE ICONS FOR ONCLICK(7:45)
//1 CREATE WEEKLY FUNCTION FOR ALL(9)
//2 CREATE MONTHLY FUNCTION (12)
//4 FINISH UP(3)
//GO TO BED (5)
class UserHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      userId: ''
    }
    this.getData = this.getData.bind(this)
    this.plotGraph = this.plotGraph.bind(this)
    this.sleepData = this.sleepData.bind(this)
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
  sleepData = userData => {
    const [weeklySleepData, monthlySleepData] = [[], []]
    const modulusNum = userData[0].length % 7
    const modNum = userData[0].length % 30

    if (userData[0].length % 7 === 0) {
      while (weeklySleepData.length < 8) {
        weeklySleepData.push(userData[0].pop())
      }
    } else {
      while (modulusNum !== weeklySleepData.length) {
        weeklySleepData.push(userData[0].pop())
      }
      weeklySleepData.reverse()
    }
    if (userData[0].length % 30 === 0) {
      while (monthlySleepData.length < 31) {
        monthlySleepData.push(userData[0].pop())
      }
      monthlySleepData.reverse()
    } else {
      while (modNum !== monthlySleepData.length) {
        monthlySleepData.push(userData[0].pop())
      }
      monthlySleepData.reverse()
    }
    return [weeklySleepData, monthlySleepData]
  }
  plotGraph() {
    const userData = this.getData()
    const arr = this.sleepData(userData)
    console.log('this is sleep data', arr[0])
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
              data: arr[0],
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
    return (
      <div>
        <Navbar />,
        {loading ? 'Loading' : this.plotGraph()}
        <div id="historyavatar">
          <div className="avatar">
            <Avatar src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png" />
          </div>
          <div className="avatar">
            <Avatar src="https://img.icons8.com/cotton/64/000000/grape.png" />
          </div>
          <div className="avatar">
            <Avatar src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png" />
          </div>
          <div className="avatar">
            <Avatar src="https://img.icons8.com/office/16/000000/water.png" />
          </div>
          <div className="avatar">
            <Avatar src="https://img.icons8.com/dusk/64/000000/exercise.png" />
          </div>
          <div className="avatar">
            <Avatar src="https://img.icons8.com/color/48/000000/relax-with-book.png" />
          </div>
          <div className="avatar">
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
