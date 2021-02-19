import axios from 'axios'

const GET_FEED = 'GET_FEED'
const POST_FEED = 'POST_FEED'
const UPDATE_LIKES = 'UPDATE_LIKES'

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

const getLikes = feed => {
  return {
    type: UPDATE_LIKES,
    feed
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

export const unlockNewLevel = (userId, levelName) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/unlock/${userId}/${levelName}`)
      dispatch(postFeed(data))
    } catch (error) {
      console.log('This is error in unlockNewLevel Thunk', error)
    }
  }
}

export const updateLikes = (unlockId, points) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/unlock/${unlockId}`, {likes: points})
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []
export default function unlock(state = initialState, action) {
  console.log('action.allFeed', action.allFeed)
  switch (action.type) {
    case GET_FEED:
      return [...state, action.allFeed]
    case POST_FEED:
      return [...state, action.newFeed]
    default:
      return state
  }
}
