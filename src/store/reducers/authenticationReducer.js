import {
  ADMIN_LOGIN
} from "../actions/actionTypes"

let initialState = {
  currentUser: null
}

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, currentUser: action.adminName }
    case ADMIN_LOGIN:
      return { ...state, currentUser: null }
    default:
      return state
  }
}