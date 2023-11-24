import axios from 'axios'

const API_URL = 'http://localhost:4004'

export const getAllUsersRequest = () => axios.get(`${API_URL}/user/`)

export const getOneUserRequest = (user) =>
  axios.post(`${API_URL}/user/:${user.id}`)

// export const verifyTokenRequest = () =>
//   axios.get(`${API_URL}/auth/verify-token`, {
//     withCredentials: true
//   })
