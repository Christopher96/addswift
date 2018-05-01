import axios from 'axios'

export default (path) => {
    const host = process.env.HOST
    const port = process.env.API_PORT

    let url = 'http://' + host + ':' + port + '/api'
    if (path) url += path
    return axios.create({
        baseURL: url
    })
}