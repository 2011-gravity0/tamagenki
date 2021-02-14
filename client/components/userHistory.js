import React from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2'
import {fetchUserHistory} from '../store/user'
import Avatar from '@material-ui/core/Avatar'

let weeklyArr
let monthlyArr
class UserHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartType: 'monthly',
      loading: true,
      userId: '',
      dataChange: [1, 2, 3, 4, 5, 6, 7],
      dataMonth: [
        0,
        1,
        2,
        3,
        4,
        2,
        4,
        5,
        3,
        2,
        3,
        4,
        1,
        3,
        4,
        2,
        1,
        1,
        0,
        0,
        2,
        1,
        2
      ]
    }
    this.getData = this.getData.bind(this)
    this.plotMonthGraph = this.plotMonthGraph.bind(this)
    this.weeklyData = this.weeklyData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.monthlyData = this.monthlyData.bind(this)
    this.plotWeekGraph = this.plotWeekGraph.bind(this)
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
    console.log('this is record', Record)
    return Record
  }

  weeklyData = userData => {
    console.log('this is userdata from week', userData)
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
  monthlyData = userData => {
    const data = []
    const modulusNum = userData.length % 30
    if (userData.length % 30 === 0) {
      while (data.length < 31) {
        return data.push(userData.pop())
      }
    } else {
      while (modulusNum !== data.length) {
        data.push(userData.pop())
      }
      console.log('this is user data in monthly', data)
      return data.reverse()
    }
  }
  handleClick() {
    const images = document.getElementById('historyavatar')
    let userData = this.getData()
    let [wd0, wd1, wd2, wd3, wd4, wd5, wd6] = [
      this.weeklyData(userData[0]),
      this.weeklyData(userData[1]),
      this.weeklyData(userData[2]),
      this.weeklyData(userData[3]),
      this.weeklyData(userData[4]),
      this.weeklyData(userData[5]),
      this.weeklyData(userData[6])
    ]
    let [md0, md1, md2, md3, md4, md5, md6] = [
      this.monthlyData(userData[0]),
      this.monthlyData(userData[1]),
      this.monthlyData(userData[4]),
      this.monthlyData(userData[2]),
      this.monthlyData(userData[3]),
      this.monthlyData(userData[5]),
      this.monthlyData(userData[6])
    ]
    console.log('this is userData', userData)
    images.addEventListener('click', event => {
      const action = event.target.id
      console.log('this is action', action)
      if (action === 'bed') {
        console.log('this is wd0', wd0, 'this is md0', md0)
        this.setState({
          dataChange: wd0,
          dataMonth: md0
        })
      }
      if (action === 'grape') {
        this.setState({
          dataChange: wd1,
          dataMonth: md1
        })
      }
      if (action === 'vegetables') {
        this.setState({
          dataChange: wd4,
          dataMonth: md4
        })
      }
      if (action === 'water') {
        this.setState({
          dataChange: wd2,
          dataMonth: md2
        })
      }
      if (action === 'execrise') {
        this.setState({
          dataChange: wd3,
          dataMonth: md3
        })
      }
      if (action === 'relax') {
        this.setState({
          dataChange: wd5,
          dataMonth: md5
        })
      }
      if (action === 'meditation') {
        this.setState({
          dataChange: wd6,
          dataMonth: md6
        })
      }
    })
  }

  plotWeekGraph() {
    return (
      <div>week</div>
      // <Line
      //   data={{
      //     labels: month,
      //     datasets: [
      //       {
      //         label: 'Weekly',
      //         data: this.state.dataChange,
      //         backgroundColor: ['rgba(255, 159, 64, 0.5)'],
      //         borderColor: ['rgba(255, 159, 64, 1)'],
      //         borderWidth: 1,
      //       },
      //     ],
      //   }}
      //   height={100}
      //   width={0}
      //   options={{
      //     maintainAspectRatio: false,
      //     scales: {
      //       yAxes: [
      //         {
      //           ticks: {
      //             beginAtZero: true,
      //           },
      //         },
      //       ],
      //     },
      //   }}
      // />
    )
  }
  plotMonthGraph() {
    console.log('this is datachange', this.state.dataChange)
    console.log('this is monthly', this.state.dataMonth)
    const month = [
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10th',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th',
      '25th',
      '26th',
      '27th',
      '28th',
      '29th',
      '30th'
    ]
    return (
      <Line
        data={{
          labels: month,
          datasets: [
            // {
            //   label: 'Weekly',
            //   data: this.state.dataChange,
            //   backgroundColor: ['rgba(255, 159, 64, 0.5)'],
            //   borderColor: ['rgba(255, 159, 64, 1)'],
            //   borderWidth: 1,
            // },
            {
              label: 'Monthly',
              data: this.state.dataMonth,
              backgroundColor: ['rgb(201, 227, 190, 0.5)'],
              borderColor: ['rgb(201, 227, 190, 1)']
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
    const {loading} = this.state
    // userhistory= this.props.getUserHistory(this.props.userId)
    return (
      <div className="chartContainer">
        <Navbar />
        <div className="chartErea">
          {loading ? (
            <div className="loading">Loading</div>
          ) : (
            this.plotMonthGraph()
          )}
        </div>

        <div className="chartIconContainer" id="historyavatar">
          <img
            className="avatar"
            id="bed"
            src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png"
          />
          <img
            className="avatar"
            id="grape"
            src="https://img.icons8.com/cotton/64/000000/grape.png"
          />
          <img
            className="avatar"
            id="vegetables"
            src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png"
          />

          <img
            className="avatar"
            id="water"
            src="https://img.icons8.com/office/16/000000/water.png"
          />
          <img
            className="avatar"
            id="execrise"
            src="https://img.icons8.com/dusk/64/000000/exercise.png"
          />
          <img
            className="avatar"
            id="relax"
            src="https://img.icons8.com/color/48/000000/relax-with-book.png"
          />
          <img
            className="avatar"
            id="meditation"
            src="https://img.icons8.com/offices/30/000000/meditation-guru.png"
          />
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
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
