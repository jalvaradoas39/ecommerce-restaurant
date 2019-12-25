import axios from 'axios';


export const signup = async (userData) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        }
    }

    const body = JSON.stringify(userData);

    return axios.post('/api/auth/signup', body, config);    
}
