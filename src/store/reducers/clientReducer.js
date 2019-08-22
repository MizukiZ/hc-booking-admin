import {
  FETCH_CLIENTS_DATA
} from "../actions/actionTypes"

let initialOptionState = null

export default function clientReducer(state = initialOptionState, action) {
  switch (action.type) {
    case FETCH_CLIENTS_DATA:
      return action.clients
    default:
      return state
  }
}