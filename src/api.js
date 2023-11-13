import axios from "axios"

let baseUrl = 'https://httpbin.org/post';
let headers = {
    'Content-Type': 'multipart/form-data'
}

const API = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers
})

export default API;
