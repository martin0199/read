import axios from 'axios'
const axiosInstance = axios.create({
  timeout: 1000 * 8,
  headers: { 'content-type': 'application/json; charset=UTF-8' },
  baseURL: process.env.VUE_APP_URL
})
axiosInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)
axiosInstance.interceptors.response.use(
  response => Promise.resolve(response),
  error => Promise.reject(error)
)
export default axiosInstance