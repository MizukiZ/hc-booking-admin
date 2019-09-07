import {
  FETCH_SETTINGS_DATA,
  UPDATE_SETTINGS_DATA
} from "./actionTypes"
import axios from "axios"


const fetchSettingsData = data => {
  return {
    type: FETCH_SETTINGS_DATA,
    settings: data
  }
}

const updateSettingsData = data => {
  return {
    type: UPDATE_SETTINGS_DATA,
    newSettings: data
  }
}

export const fetchSettingsDataFromApi = () => {
  // hc api url
  const localhostApi = `http://localhost:3000/api/v1/settings`
  const productionApi = 'https://hc-booking-api.herokuapp.com/api/v1/settings'

  const hcApi = process.env.NODE_ENV === "development" ? localhostApi : productionApi

  return (dispatch) => {
    axios.get(hcApi).then(response => {
      dispatch(fetchSettingsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}

export const updateSettingsDataFromApi = (data) => {
  // hc api url
  const localhostApi = `http://localhost:3000/api/v1/settings/2`
  const productionApi = 'https://hc-booking-api.herokuapp.com/api/v1/settings/2'

  const hcApi = process.env.NODE_ENV === "development" ? localhostApi : productionApi
  console.log(data)
  return (dispatch) => {
    axios({
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      url: hcApi,
      data: data
    }).then(response => {
      dispatch(updateSettingsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}