import axios from 'axios'

const GET_RESP = 'GET_RESP'

const setResponse = resp => {
  return {type: GET_RESP, resp}
}

export const fetchResp = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/response')
      dispatch(setResponse(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function owlResponse(state = {}, action) {
  switch (action.type) {
    case GET_RESP:
      return {...state, response: action.resp}
    default:
      return state
  }
}
