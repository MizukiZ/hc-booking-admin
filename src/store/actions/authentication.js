import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT
} from "./actionTypes"
import hcApi from "../../axiosConfig"

const adminLogin = adminName => ({
  type: ADMIN_LOGIN,
  adminName: adminName
})

export const adminLogout = () => {
  return { type: ADMIN_LOGOUT }
}

export const adminLoginFetch = payload => {

  return (dispatch) => {
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
    })
      .catch(error => {
        console.log(error)
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