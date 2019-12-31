import axios from 'axios';


export const signup = userData => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    return axios.post('/api/auth/signup', userData, config);
}



export const signin = (email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const body = {
        email,
        password
    }

    return axios.post('/api/auth/signin', body, config);
}