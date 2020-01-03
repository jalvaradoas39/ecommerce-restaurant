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
                <Container>

                    <Menu.Item as={Link} to='/'>
                        <Image 
                            src={process.env.PUBLIC_URL + '/images/logo.PNG'}
                            size='tiny'
                        />
                    </Menu.Item>


                    {getTokenInStorage() && getUserRole() === 0 && (
                        <Menu.Item as={Link} to='/user/dashboard'>
                            <Icon
                                name='user'
                                size='large'
                            />
                            UserDashboard
                        </Menu.Item>
                    )}

                    {getTokenInStorage() && getUserRole() === 1 && (
                        <Menu.Item as={Link} to='/admin/dashboard'>
                            <Icon
                                name='user'
                                size='large'
                            />
                            AdminDashboard
                        </Menu.Item>
                    )}


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


                </Container>
            </Menu>
        </nav>
    </header>
);

export default withRouter(Header);

