import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  LOGIN_ERROR,
  ADMIN_REQUEST_RECEIVE,
  ADMIN_REQUEST_POST
} from "../actions/actionTypes"

let initialState = {
  currentUser: null,
  authError: false,
  isFetching: false
}

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, currentUser: action.adminName, authError: false }
    case LOGIN_ERROR:
      return { ...state, authError: action.result }
    case ADMIN_LOGOUT:
      return { ...state, currentUser: null, authError: false }
    case ADMIN_REQUEST_POST:
      return { ...state, isFetching: true }
    case ADMIN_REQUEST_RECEIVE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}