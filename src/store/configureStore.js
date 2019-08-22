import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// import reducers
import appointmentReducer from './reducers/appointmentReducer'
import settingReducer from './reducers/settingReducer'
import clientReducer from './reducers/clientReducer'

const rootReducer = combineReducers({
  appointments: appointmentReducer,
  settings: settingReducer,
  clients: clientReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore