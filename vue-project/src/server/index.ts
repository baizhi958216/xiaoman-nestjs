import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const addUser = (data) => axios.post('/user', data).then((res) => res.data)

export const getList = (data) => axios.get('/user', { params: data }).then((res) => res.data)

export const delUser = (data) => axios.delete(`/user/${data.id}`).then((res) => res.data)

export const updateUser = (data) => axios.patch(`/user/${data.id}`, data).then((res) => res.data)
