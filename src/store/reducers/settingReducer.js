import {
  FETCH_SETTINGS_DATA
} from "../actions/actionTypes"

let initialOptionState = null

export default function settingReducer(state = initialOptionState, action) {
  switch (action.type) {
    case FETCH_SETTINGS_DATA:
      return action.settings
    default:
      return state
  }
}