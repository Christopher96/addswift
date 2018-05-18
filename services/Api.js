import axios from 'axios'

export default (path) => {
    let url = process.env.baseURL
    console.log(url)

    if (path) url += path
    return axios.create({
        baseURL: url
    })
}