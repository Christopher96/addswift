import axios from 'axios'

export default (path) => {
    const token = localStorage.getItem('token')
    if (token) {
        console.log(token)
        axios.defaults.headers.common['Authorization'] = token
    }
    let url = 'http://localhost:3001/api' 
    if(path) url += path  
    axios.defaults.baseURL = url
    return axios.create()
}