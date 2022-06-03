import axios from 'axios';
import authService from '../api-authorization/AuthorizeService'
export const API_BASE_URL = 'https://localhost:7176/api';

// function getLocalToken() {
//     const token = window.localStorage.getItem('token')
//     console.log('token >>>', token);
//     return token
// }

// function getLocalRefreshToken() {
//     const token = window.localStorage.getItem('refreshToken')
//     return token
// }

//cau hinh axios

const instance = axios.create({
    baseURL: 'https://localhost:7176/',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json'
        // 'Authorization': "Bearer " + authService.getAccessToken()
    }
})
authService.getAccessToken().then(function(token){
    instance.headers['Authorization'] = "Bearer " + token
})

instance.setToken = (token) => {
    instance.defaults.headers['x-access-token'] = token
    instance.defaults.headers['Authorization'] = "Bearer " + token
}

// function refreshToken () {
//     return instance.post('/token',{
//         refreshToken: getLocalRefreshToken()
//     })
// }

function getDataWithAuto() {
    return instance.get('/users', {
        params: {
            auto: 'yes',
        }
    })
}

// function getDataWithOutAuto() {
//     return instance.get('/users', {
//         params: {
//             auto: 'no'
//         },
//         headers: {
//             'x-access-token': getLocalToken() // headers token
//         }
//     })
// }

// getToken();

// // response parse
// instance.interceptors.response.use((response) => {

//     const { code, auto } = response.data
//     if (code === 401) {
//         if (auto === 'yes') {
//             return refreshToken().then(rs => {
//                 console.log('get token refreshToken>>', rs.data)
//                 const { token } = rs.data
//                 instance.setToken(token);
//                 const config = response.config
//                 config.headers['x-access-token'] = token
//                 config.baseURL = 'https://localhost:7176/'
//                 return instance(config)

//             })
//         }
//     }
//     return response
// }, error => {
//     console.warn('Error status', error.response.status)
//     return Promise.reject(error)
//     // if (error.response) {
//     //     return parseError(error.response.data)
//     // } else {
//     //     return Promise.reject(error)
//     // }
// })


//click login de lay token va refreshtoke


export default instance

