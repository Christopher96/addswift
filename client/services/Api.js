import axios from 'axios'

export default (path) => {
    const host = process.env.HOST || 'localhost'
    const port = process.env.BACKEND_PORT || 3001


    let url = 'http://' + host + ':' + port + '/api'
    if (path) url += path
    return axios.create({
        baseURL: url
    })
}