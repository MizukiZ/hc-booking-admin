import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  LOGIN_ERROR,
  ADMIN_REQUEST_POST,
  ADMIN_REQUEST_RECEIVE
} from "./actionTypes"
import hcApi from "../../axiosConfig"

const adminLogin = adminName => ({
  type: ADMIN_LOGIN,
  adminName: adminName
})

export const loginError = (result) => {
  return {
    type: LOGIN_ERROR,
    result: result
  }
}

export const adminLogout = () => {
  return { type: ADMIN_LOGOUT }
}

const requestPost = () => {
  return {
    type: ADMIN_REQUEST_POST
  }
}

const requestReceive = () => {
  return {
    type: ADMIN_REQUEST_RECEIVE
  }
}

export const adminLoginFetch = payload => {
  return (dispatch) => {
    dispatch(requestPost())
    hcApi({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: '/api/v1/authentication/login',
      data: payload
    }).then(response => {
      // successfully loggedin
      // save the token in localStorage
      localStorage.setItem("token", response.data.token)
      dispatch(adminLogin(response.data.username))
      dispatch(requestReceive())
    })
      .catch(error => {
        dispatch(loginError(true))
        dispatch(requestReceive())
      })
  }
}

export const getAdminProfileFetch = () => {

  return (dispatch) => {
    const token = localStorage.token;
    if (token) {
      hcApi.get('/api/v1/admins').then((response) => {
        // find token and get admin user
        dispatch(adminLogin(response.data.data.user_name))
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}