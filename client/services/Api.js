import axios from 'axios'

export default (path) => {
    let url = 'http://localhost:3001/api'
    if (path) url += path
    axios.defaults.baseURL = url

    return axios.create()
}