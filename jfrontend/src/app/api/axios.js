import axios from "axios"

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    baseURL: "http://localhost:3000/api/v1",
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        withCredentials: true
    }
})

export default instance