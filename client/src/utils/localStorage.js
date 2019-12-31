/* LocalStorage functionality for token */
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



/* LocalStorage functionality for user */
export const setUserInStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value) );
}

export const getUserInStorage = key => {
    if ( localStorage.getItem(key) ) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export const removeUserInStorage = key => {
    if ( localStorage.getItem(key) ) {
        localStorage.removeItem(key);
    }
}
