import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenInStorage, getUserRole } from '../utils/localStorage';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            !getTokenInStorage() && getUserRole() !== 0 ? (
                <Redirect to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />
            ) : (
                <Component {...props} />
            )
        }
    />
);


export default PrivateRoute;