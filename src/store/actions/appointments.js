import {
  FETCH_APPOINTMENTS_DATA
} from "./actionTypes"
import hcApi from "../../axiosConfig"

const fetchAppointmentsData = data => {
  return {
    type: FETCH_APPOINTMENTS_DATA,
    appointments: data
  }
}

export const fetchAppointmentsDataFromApi = () => {
  return (dispatch) => {
    hcApi.get('/api/v1/appointments').then(response => {
      dispatch(fetchAppointmentsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}