import axios from 'axios'

export default (path) => {
    let url = process.env.baseURL || window.location.origin + '/api'

    if (path) url += path
    return axios.create({
        baseURL: url
    })
}