/* eslint-disable no-unused-expressions */
/* eslint-disable complexity */
/* eslint-disable guard-for-in */
import React from 'react'
// import Chart from 'chart.js'
import {Line} from 'react-chartjs-2'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {fetchUserHistory} from '../store/user'

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
  sleepData = userData => {
    let num = 7
    let maxNum = 8
    const [weeklySleepData, monthlySleepData] = [[], []]
    const modulusNum = userData[0].length % num
    if (userData[0].length % num === 0) {
      while (weeklySleepData.length < maxNum) {
        weeklySleepData.push(userData[0].pop())
      }
      return weeklySleepData.reverse()
    } else {
      while (modulusNum !== weeklySleepData.length) {
        weeklySleepData.push(userData[0].pop())
      }
      return weeklySleepData.reverse()
    }
  }
  plotGraph() {
    const userData = this.getData()
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
              label: 'sleep',
              data: this.sleepData(userData),
              backgroundColor: ['rgba(255, 159, 64, 0.5)'],
              borderColor: ['rgba(255, 159, 64, 1)'],
              borderWidth: 1
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
