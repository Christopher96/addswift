import Api from '../Api'
const fbApi = Api('/social/facebook')

export default {
    loginWindow() {
        fbApi.get('/login-url')
        .then((res) => {    
            window.open(res.data.url)
        })
        .catch((err) => {

        })
    }
}