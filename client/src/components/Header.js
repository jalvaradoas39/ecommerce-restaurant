import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    getTokenInStorage,
    getUserInStorage,
    getUserRole,
    handleSignout
} from '../utils/localStorage';
import { Menu, Image, Icon, Container } from 'semantic-ui-react';


const Header = ({ history }) => (
    <header>
        <nav>
            <Menu stackable>
                
                {/* all */}
                <Menu.Item as={Link} to='/'>
                    <Image 
                        src={process.env.PUBLIC_URL + '/images/logo.PNG'}
                        size='tiny'
                    />
                </Menu.Item>


                {/* user logged in */}
                {getTokenInStorage() && getUserRole() === 0 && (
                    <Menu.Item as={Link} to='/user/dashboard'>
                        <Icon
                            name='user'
                            size='large'
                        />
                        UserDashboard
                    </Menu.Item>
                )}

                
                {/* admin logged in */}
                {getTokenInStorage() && getUserRole() === 1 && (
                    <Menu.Item as={Link} to='/admin/dashboard'>
                        <Icon
                            name='user'
                            size='large'
                        />
                        AdminDashboard
                    </Menu.Item>
                )}

                
                {/* user/admin ARE NOT logged in */}
                {!getTokenInStorage() && !getUserInStorage() && (
                    <>
                        <Menu.Item as={Link} to='/signup'>
                            <Icon
                                name='signup'
                                size='large'
                            />
                            Signup
                        </Menu.Item>
                        <Menu.Item as={Link} to='/signin'>
                            <Icon 
                                name='sign in'
                                size='large'
                            />
                            Signin
                        </Menu.Item>
                    </>
                )}


                {/* user/admin ARE logged in */}
                {getTokenInStorage() && getUserInStorage() && (
                    <Menu.Item onClick={() => {
                        handleSignout(() => {
                            history.push('/');
                        });
                    }}>
                        <Icon
                            name='sign out'
                            size='large'
                        />
                        Signout
                    </Menu.Item>
                )}

            </Menu>
        </nav>
    </header>
);

export default withRouter(Header);

