/*
 * API service used for initializing axios with a base route
 */

import axios from 'axios'

export default (path) => {
    let url = process.env.API_URI

    if (path) url += path
    return axios.create({
        baseURL: url
    })
}