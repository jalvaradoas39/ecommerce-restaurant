/* LocalStorage functionality for token */
export const setTokenInStorage = value => {
    localStorage.setItem('jwt', JSON.stringify(value) );
}

export const getTokenInStorage = () => {
    if ( localStorage.getItem('jwt') ) {
        return JSON.parse( localStorage.getItem('jwt') );
    }
}

export const removeTokenInStorage = () => {
    if ( localStorage.getItem('jwt') ) {
        localStorage.removeItem('jwt');
    }
}



/* LocalStorage functionality for user */
export const setUserInStorage = value => {
    localStorage.setItem('user', JSON.stringify(value) );
}

export const getUserInStorage = () => {
    if ( localStorage.getItem('user') ) {
        return JSON.parse( localStorage.getItem('user') );
    }
}

export const removeUserInStorage = () => {
    if ( localStorage.getItem('user') ) {
        localStorage.removeItem('user');
    }
}

export const getUserRole = () => {
    if ( localStorage.getItem('user') ) {
        // *** 2 ways to retrieve role property from a json object ***
        // method#1
        //return JSON.parse( localStorage.getItem('user') ).role;

        // method#2
        const javascriptObject = JSON.parse( localStorage.getItem('user') );
        const userRole = javascriptObject.role;
        
        return userRole;
    }
}




/* Event handler for LocalStorage */
export const handleSignout = next => {
    removeTokenInStorage('jwt');
    removeUserInStorage('user');

    next();
}
