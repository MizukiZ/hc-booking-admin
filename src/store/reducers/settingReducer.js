import {
  FETCH_SETTINGS_DATA,
  UPDATE_SETTINGS_DATA
} from "../actions/actionTypes"

let initialOptionState = null

export default function settingReducer(state = initialOptionState, action) {
  switch (action.type) {
    case FETCH_SETTINGS_DATA:
      return action.settings
    case UPDATE_SETTINGS_DATA:
      return action.newSettings
    default:
      return state
  }
}