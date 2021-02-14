import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import dailyProgress from './dailyProgress'
import owlResponse from './owlResponse'
import unlock from './unlock'
import boombox from './boombox'

const reducer = combineReducers({
  user,
  list: dailyProgress,
  response: owlResponse,
  feed: unlock,
  boombox
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './dailyProgress'
export * from './unlock'
export * from './boombox'
