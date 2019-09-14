import axios from 'axios'

const localhostApi = `http://localhost:3000`
const productionApi = 'https://hc-booking-api.herokuapp.com'
const baseDomain = process.env.NODE_ENV === "development" ? localhostApi : productionApi
// Set config defaults when creating the instance
const hcApi = axios.create({
  baseURL: baseDomain
});

export function setTokenToRequestHeader() {
  const token = localStorage.token;
  if (token) {
    // Set the Authorization header for all requests in the future
    hcApi.defaults.headers.common['Authorization'] = token
  }
  else {
    // if couldnt find, delte the common header
    delete hcApi.defaults.headers.common['Authorization']
  }
}

setTokenToRequestHeader()

export default hcApi