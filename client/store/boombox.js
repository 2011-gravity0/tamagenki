import axios from 'axios'

const GET_BOOMBOX = 'GET_BOOMBOX'
const UPDATE_BOOMBOX = 'UPDATE_BOOMBOX'

const getBoombox = boombox => {
  return {type: GET_BOOMBOX, boombox}
}

const updateBoombox = boombox => {
  return {type: UPDATE_BOOMBOX, boombox}
}

export const fetchBoombox = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/boombox`)
      dispatch(getBoombox(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUpdatedBoombox = (boomboxId, boomboxData) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/boombox/${boomboxId}`, boomboxData)
      dispatch(updateBoombox(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

export default function boombox(state = initialState, action) {
  switch (action.type) {
    case GET_BOOMBOX:
      return action.boombox
    case UPDATE_BOOMBOX:
      return action.boombox
    default:
      return state
  }
}
