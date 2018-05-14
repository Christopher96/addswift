import axios from 'axios'

export default (path) => {
    console.log(process.env.baseURL)
    const loc = window.location
    let url = `${loc.protocol}//${loc.host}/api`

    if (path) url += path
    return axios.create({
        baseURL: url
    })
}