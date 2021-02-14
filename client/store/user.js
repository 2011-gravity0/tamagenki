import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const PUT_USER = 'PUT_USER'
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const putUser = updatedUser => ({type: PUT_USER, updatedUser})
const getHistory = userWithHistory => ({type: GET_HISTORY, userWithHistory})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (userId, userData) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/user/${userId}`, userData)
      dispatch(putUser(data))
    } catch (error) {
      console.log('This is Error in updateUser Thunk', error)
    }
  }
}

export const fetchUserHistory = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/user/history/${userId}`)
      dispatch(getHistory(data))
    } catch (error) {
      console.log('This is Error in fetchUserHistory Thunk', error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case PUT_USER:
      return action.updatedUser
    case GET_HISTORY:
      return action.userWithHistory
    default:
      return state
  }
}
