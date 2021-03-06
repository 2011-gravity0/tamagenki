import axios from 'axios'

const GET_FEED = 'GET_FEED'
const POST_FEED = 'POST_FEED'

const getFeed = allFeed => {
  return {
    type: GET_FEED,
    allFeed
  }
}

const postFeed = newFeed => {
  return {
    type: POST_FEED,
    newFeed
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

export const unlockNewLevel = (userId, levelId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/unlock/${userId}/${levelId}`)
      dispatch(postFeed(data))
    } catch (error) {
      console.log('This is error in unlockNewLevel Thunk', error)
    }
  }
}

const initialState = []
export default function unlock(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.allFeed
    case POST_FEED:
      return [...state, action.newFeed]
    default:
      return state
  }
}
