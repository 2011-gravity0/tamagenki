import axios from 'axios'

const GET_LIST = 'GET_LIST'
const UPDATE_POINTS = 'UPDATE_POINTS'

const getList = list => {
  return {type: GET_LIST, list}
}

const updatePoints = list => {
  return {type: UPDATE_POINTS, list}
}

export const fetchList = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/dailyprogress`)
      dispatch(getList(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUpdatedList = (column, points) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/dailyprogress', {[column]: points})
      // console.log(data)
      dispatch(updatePoints(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

export default function dailyProgress(state = initialState, action) {
  // console.log(action.list)
  switch (action.type) {
    case GET_LIST:
      return {...state, list: action.list}
    case UPDATE_POINTS:
      return {...state, list: action.list}
    default:
      return state
  }
}
