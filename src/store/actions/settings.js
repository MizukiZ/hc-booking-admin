import {
  FETCH_SETTINGS_DATA,
  UPDATE_SETTINGS_DATA
} from "./actionTypes"
import hcApi from "../../axiosConfig"

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

  return (dispatch) => {
    hcApi.get('/api/v1/settings').then(response => {
      dispatch(fetchSettingsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}

export const updateSettingsDataFromApi = (data) => {
  return (dispatch) => {
    hcApi({
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      url: '/api/v1/settings/2',
      data: data
    }).then(response => {
      dispatch(updateSettingsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
    return Promise.resolve()
  }
}