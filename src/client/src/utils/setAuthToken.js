import axios from "axios";

const setAuthToken = token => {
    if (token) {
        // apply authentication token to every request if already logged in
        axios.defaults.headers.common['Authorization'] = token
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken
