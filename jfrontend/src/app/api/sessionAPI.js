import axios from "./axios"

const LOGIN_URL = "/oauth/token"
const SIGNUP_URL = "/users"
const UPDATE_PROFILE_URL = "/users"
const LOGOUT_URL = "/oauth/revoke"
const CURRENT_USER_URL = "/users/me"

// eslint-disable-next-line no-undef
console.log(process.env)

const CLIENT_ID = "hMXaVRQSm_KrwwONhy07oM3CjPEhJotoOOTjqOX5gBs"
const CLIENT_SECRET = "WIp7Y6mhUAGq7RhSsn7Ua4Bvotx5iAQ3c3ux4zDBqqY"

export async function createUserWithEmailAndPassword(email, password) {
    const data = {
        email: email,
        password: password,
        client_id: CLIENT_ID
    }

    return axios
        .post(SIGNUP_URL, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
}

export async function loginWithEmailAndPassword(email, password) {
    const data = {
        grant_type: "password",
        email: email,
        password: password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }

    return axios
        .post(LOGIN_URL, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
}

export async function updateUserProfile(
    currentPassword,
    token,
    email,
    password
) {
    const data = {
        current_password: currentPassword,
        email: email,
        password: password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return axios
        .patch(UPDATE_PROFILE_URL, data, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
}

export async function logoutUserWithToken(token) {
    const data = {
        token: token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }

    return axios
        .post(LOGOUT_URL, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
}

export async function requestAccessTokenWithRefreshToken(refreshToken) {
    const data = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }

    return axios
        .post(LOGIN_URL, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
}

export async function getCurrentUser(accessToken) {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    return axios
        .get(CURRENT_USER_URL, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data
        })
}
