import {
  FETCH_OPTIONS_DATA
} from "./actionTypes"
import hcApi from "../../axiosConfig"

const fetchOptionsData = data => {
  return {
    type: FETCH_OPTIONS_DATA,
    options: data
  }
}

export const fetchOptionsDataFromApi = () => {

  return (dispatch) => {
    hcApi.get('/api/v1/options').then(response => {
      dispatch(fetchOptionsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}