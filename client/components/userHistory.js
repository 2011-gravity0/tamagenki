import React from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Line} from 'react-chartjs-2'
import {fetchUserHistory} from '../store/user'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

class UserHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartRange: 'week',
      labelDateRange: [],
      mapDateRange: [],
      data: [],
      prev: 0,
      chartType: 'all',
      loading: true
    }
    this.plotGraph = this.plotGraph.bind(this)
    this.dateRangeMaker = this.dateRangeMaker.bind(this)
    this.handleDataSort = this.handleDataSort.bind(this)
    this.toggleChartRange = this.toggleChartRange.bind(this)
    this.toggleChartType = this.toggleChartType.bind(this)
    this.toggleDate = this.toggleDate.bind(this)
  }

  dateRangeMaker() {
    const dateArr = []
    const rangeBank = {month: 30, week: 7}
    const endDay = this.state.prev * rangeBank[this.state.chartRange]
    const startDay = endDay + rangeBank[this.state.chartRange]

    const getDate = num => {
      const today = new Date()
      const numDayAgo = new Date(today)
      numDayAgo.setDate(today.getDate() - num)
      return moment(numDayAgo).format('YYYY-MM-DD')
    }

    for (let i = startDay; i >= endDay; i--) {
      const currDay = getDate(i)
      dateArr.push(currDay)
    }
    const monthDateOnly = dateArr.map(day => day.slice(5))
    this.setState({mapDateRange: dateArr, labelDateRange: monthDateOnly})
  }

  handleDataSort() {
    const {history} = this.props
    let range = [...this.state.mapDateRange]
    if (this.state.chartType === 'all') {
      range = range.map(day => {
        const userData = history.filter(elm => elm.date === day)
        if (userData.length) {
          return Object.values(userData[0]).reduce((acc, elm) => {
            if (typeof elm === 'number') {
              return acc + elm
            } else {
              return acc
            }
          }, 0)
        } else {
          return 0
        }
      })
    } else {
      range = range.map(day => {
        const userData = history.filter(elm => elm.date === day)
        if (userData.length) {
          return userData[0][this.state.chartType]
        } else {
          return 0
        }
      })
    }
    this.setState({data: range})
  }

  async toggleChartRange(range) {
    await this.setState({chartRange: range, prev: 0})
    await this.dateRangeMaker()
    await this.handleDataSort()
  }

  async toggleChartType(type) {
    await this.setState({chartType: type})
    await this.handleDataSort()
  }

  async toggleDate(type) {
    if (type === 'prev') {
      await this.setState({prev: this.state.prev + 1})
    } else if (this.state.prev > 0) {
        await this.setState({prev: this.state.prev - 1})
      }
    await this.dateRangeMaker()
    await this.handleDataSort()
  }

  plotGraph() {
    return (
      <Line
        data={{
          labels: this.state.labelDateRange,
          datasets: [
            {
              label: `${this.state.chartRange} | ${this.state.chartType}`,
              data: this.state.data,
              backgroundColor: [`${chartColor[this.state.chartType].fill}`],
              borderColor: [`${chartColor[this.state.chartType].border}`]
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
      await this.props.getUserHistory(this.props.userId)
      await this.dateRangeMaker()
      await this.handleDataSort()
      this.setState({
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const {loading} = this.state
    console.log('State', this.state)
    return (
      <div className="chartContainer">
        <Navbar />
        <div className="chartErea">
          {loading ? <div className="loading">Loading</div> : this.plotGraph()}
        </div>
        <div className="chartButtonContainer">
          <div className="chartRangeContainer">
            <button onClick={() => this.toggleDate('prev')}>
              &lt; last {this.state.chartRange}
            </button>
            <ButtonGroup
              className="rangeButton"
              size="small"
              aria-label="small outlined button group"
            >
              <Button onClick={() => this.toggleChartRange('month')}>
                Month
              </Button>
              <Button onClick={() => this.toggleChartRange('week')}>
                Week
              </Button>
            </ButtonGroup>
            <button
              disable={this.state.prev}
              onClick={() => this.toggleDate('next')}
            >
              next {this.state.chartRange} &gt;
            </button>
          </div>
          <div className="chartIconContainer">
            <button onClick={() => this.toggleChartType('all')}>
              <div className="typeIcon allDiv">
                <p>All</p>
              </div>
            </button>
            <button onClick={() => this.toggleChartType('sleep')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png"
              />
            </button>
            <button onClick={() => this.toggleChartType('fruit')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/color/48/000000/raspberry.png"
              />
            </button>
            <button onClick={() => this.toggleChartType('vegetables')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png"
              />
            </button>
            <button onClick={() => this.toggleChartType('water')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/color/48/000000/water.png"
              />
            </button>
            <button onClick={() => this.toggleChartType('exercise')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/dusk/64/000000/exercise.png"
              />
            </button>
            <button onClick={() => this.toggleChartType('relaxation')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/color/48/000000/relax-with-book.png"
              />
            </button>
            <button onClick={() => this.toggleChartType('meditation')}>
              <img
                className="typeIcon"
                src="https://img.icons8.com/officel/80/000000/meditation-guru.png"
              />
            </button>
          </div>
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
// export default connect(mapState, mapDispatch)(UserHistory)
// withStyles(styles)(UserHistory)

export default connect(mapState, mapDispatch)(UserHistory)

const chartColor = {
  all: {fill: 'rgb(201, 227, 190, 0.5)', border: 'rgb(201, 227, 190, 1)'},
  sleep: {fill: 'rgb(138, 149, 237, 0.5)', border: 'rgb(138, 149, 237, 1)'},
  fruit: {fill: 'rgb(240, 113, 151, 0.5)', border: 'rgb(240, 113, 151,1)'},
  vegetables: {
    fill: 'rgb(127, 224, 117, 0.5)',
    border: 'rgb(127, 224, 117,  1)'
  },
  water: {fill: 'rgb(152, 235, 224, 0.5)', border: 'rgb(152, 235, 224,1)'},
  meditation: {
    fill: 'rgb(204, 143, 242, 0.5)',
    border: 'rgb(204, 143, 242, 1)'
  },
  relaxation: {
    fill: 'rgb(245, 179, 110, 0.5)',
    border: 'rgb(245, 179, 110, 1)'
  },
  exercise: {
    fill: 'rgb(252, 83, 83, 0.5)',
    border: 'rgb(252, 83, 83, 1)'
  }
}
