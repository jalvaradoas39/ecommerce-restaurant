import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenInStorage, getUserRole } from '../utils/localStorage';



const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            getTokenInStorage() && getUserRole() === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/signin',
                    state: { from: props.location }
                }}
            />
            )
        }
    />
);


export default AdminRoute;