export const setTokenInStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value) );
}

export const getTokenInStorage = key => {
    if ( localStorage.getItem(key) ) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export const removeTokenInStorage = key => {
    if ( localStorage.getItem(key) ) {
        localStorage.removeItem(key);
    }
}

