import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    getTokenInStorage,
    getUserInStorage,
    getUserRole,
    handleSignout
} from '../utils/localStorage';
import { Responsive, Menu, Image, Icon } from 'semantic-ui-react';


const Navbar = ({ history, handleToggle }) => {

    const showMobileNavbar = () => (
        <header>
            <nav>
                <Menu>
                    {/* show for all */}
                    <Menu.Item>
                        <Icon 
                            name="sidebar"
                            size='large'
                            onClick={handleToggle}
                        />
                    </Menu.Item>
                    <Menu.Item as={Link} to='/'>
                        <Image 
                            src={process.env.PUBLIC_URL + '/images/logo.PNG'}
                            size='tiny'
                        />
                    </Menu.Item>
                </Menu>
            </nav>
        </header>
    );

    
    const showDesktopNavbar = () => (
        <header>
            <nav>
                <Menu>
                    {/* show for all */}
                    <Menu.Item as={Link} to='/'>
                        <Image 
                            src={process.env.PUBLIC_URL + '/images/logo.PNG'}
                            size='tiny'
                        />
                    </Menu.Item>


                    <Menu.Menu position='right'>
                        {/* show if user logged in */}
                        {getTokenInStorage() && getUserRole() === 0 && (
                            <Menu.Item as={Link} to='/user/dashboard'>
                                <Icon
                                    name='user'
                                    size='large'
                                />
                                UserDashboard
                            </Menu.Item>
                        )}

                        
                        {/* show if admin logged in */}
                        {getTokenInStorage() && getUserRole() === 1 && (
                            <Menu.Item as={Link} to='/admin/dashboard'>
                                <Icon
                                    name='user'
                                    size='large'
                                />
                                AdminDashboard
                            </Menu.Item>
                        )}

                        
                        {/* show if user/admin ARE NOT logged in */}
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


                        {/* show if user/admin ARE logged in */}
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
                    </Menu.Menu>
                </Menu>
            </nav>
        </header>
    );


    
    return (
        <>
            <Responsive {...Responsive.onlyMobile}>
                { showMobileNavbar() }
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                { showDesktopNavbar() }
            </Responsive>
        </>
    );


};

export default withRouter(Navbar);

