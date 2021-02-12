import axios from 'axios'

const GET_FEED = 'GET_FEED'

const getFeed = allFeed => {
  return {
    type: GET_FEED,
    allFeed
  }
}

export const fetchAllFeed = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/unlock')
      dispatch(getFeed(data))
    } catch (error) {
      console.log('This is error in fetchAllFeed Thunk', error)
    }
  }
}

const initialState = []
export default function unlock(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.allFeed
    default:
      return state
  }
}
