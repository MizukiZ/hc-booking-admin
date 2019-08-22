import {
  FETCH_CLIENTS_DATA
} from "./actionTypes"
import axios from "axios"


const fetchClientsData = data => {
  return {
    type: FETCH_CLIENTS_DATA,
    clients: data
  }
}

export const fetchClientsDataFromApi = () => {
  // hc api url
  const localhostApi = `http://localhost:3000/api/v1/clients`
  const productionApi = 'https://hc-booking-api.herokuapp.com/api/v1/clients'

  const hcApi = process.env.NODE_ENV === "development" ? localhostApi : productionApi

  return (dispatch) => {
    axios.get(hcApi).then(response => {
      dispatch(fetchClientsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}