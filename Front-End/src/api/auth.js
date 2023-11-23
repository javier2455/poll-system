import axios from 'axios'

const API_URL = 'http://localhost:4004'

export const registerRequest = (user) =>
  axios.post(`${API_URL}/auth/register`, user, {
    withCredentials: true
  })

export const loginRequest = (user) =>
  axios.post(`${API_URL}/auth/login`, user, {
    withCredentials: true
  })

export const verifyTokenRequest = () =>
  axios.get(`${API_URL}/auth/verify-token`, {
    withCredentials: true
  })
