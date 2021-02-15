import axios from 'axios'

const GET_YESTERDAY = 'GET_YESTERDAY'

const getYesterday = yesterdayList => {
  return {type: GET_YESTERDAY, yesterdayList}
}

export const fetchYesterday = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/dailyprogress/yesterday`)
      dispatch(getYesterday(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

export default function yesterday(state = initialState, action) {
  switch (action.type) {
    case GET_YESTERDAY:
      return action.yesterdayList
    default:
      return state
  }
}
