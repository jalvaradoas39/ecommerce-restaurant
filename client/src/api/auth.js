import axios from 'axios';


export const signup = userData => {
    const config = {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        }
    }

    return axios.post('/api/auth/signup', userData, config)
}
