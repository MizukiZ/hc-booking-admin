import {
  FETCH_CLIENTS_DATA
} from "./actionTypes"
import hcApi from "../../axiosConfig"

const fetchClientsData = data => {
  return {
    type: FETCH_CLIENTS_DATA,
    clients: data
  }
}

export const fetchClientsDataFromApi = () => {

  return (dispatch) => {
    hcApi.get('/api/v1/clients').then(response => {
      dispatch(fetchClientsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}