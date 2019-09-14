import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// import reducers
import appointmentReducer from './reducers/appointmentReducer'
import settingReducer from './reducers/settingReducer'
import clientReducer from './reducers/clientReducer'
import optionReducer from './reducers/optionReducer'
import authenticationReducer from './reducers/authenticationReducer'

const rootReducer = combineReducers({
  appointments: appointmentReducer,
  settings: settingReducer,
  clients: clientReducer,
  options: optionReducer,
  auth: authenticationReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore