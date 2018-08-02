import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'

const enhancer = applyMiddleware(logger)

const store = createStore(reducer, enhancer)

export default store
