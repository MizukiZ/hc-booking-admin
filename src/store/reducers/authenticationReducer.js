import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  LOGIN_ERROR
} from "../actions/actionTypes"

let initialState = {
  currentUser: null,
  authError: false
}

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, currentUser: action.adminName, authError: false }
    case LOGIN_ERROR:
      return { ...state, authError: action.result }
    case ADMIN_LOGOUT:
      return { ...state, currentUser: null, authError: false }
    default:
      return state
  }
}