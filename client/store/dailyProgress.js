import axios from 'axios'

const GET_LIST = 'GET_LIST'

const getList = list => {
  return {type: GET_LIST, list}
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

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return {...state, list: action.list}
    default:
      return state
  }
}
