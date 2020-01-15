import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    getTokenInStorage,
    getUserInStorage,
    getUserRole,
    handleSignout
} from '../utils/localStorage';
import './Header.css';
import { Responsive, Menu, Image, Icon } from 'semantic-ui-react';


const Header = ({ history }) => {

    /************ component state *************/
    const [showSidebar, setShowSidebar] = useState(false);


    /************ events *************/
    const handleToggle = evt => {
        setShowSidebar(!showSidebar);
    }



    /************ views *************/
    const showDesktopNavbar = () => (
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
    );


    const showMobileNavbar = () => (
        <nav>
            <div id="fixed-navbar">
                <span>
                    <Image 
                        as={Link} to='/'
                        src={process.env.PUBLIC_URL + '/images/logo.PNG'}
                        size='tiny'
                    />
                </span>
            </div>

            <div id='sidebar' className={showSidebar ? 'active' : null}>
                <div className='toggle-btn' onClick={handleToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul>
                    {/* show if user logged in */}
                    {getTokenInStorage() && getUserRole() === 0 && (
                        <li>
                            <Link to='/user/dashboard' onClick={handleToggle}>
                                <Icon
                                    name='user'
                                    size='large'
                                />
                                UserDashboard
                            </Link>
                        </li>
                    )}

                    
                    {/* show if admin logged in */}
                    {getTokenInStorage() && getUserRole() === 1 && (
                        <li>
                            <Link to='/admin/dashboard' onClick={handleToggle}>
                                <Icon
                                    name='user'
                                    size='large'
                                />
                                AdminDashboard
                            </Link>
                        </li>
                    )}


                    {/* show if user/admin ARE NOT logged in */}
                    {!getTokenInStorage() && !getUserInStorage() && (
                        <>
                            <li>
                                <Link to='/signup' onClick={handleToggle}>
                                    <Icon
                                        name='signup'
                                        size='large'
                                    />
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link to='/signin' onClick={handleToggle}>
                                    <Icon 
                                        name='sign in'
                                        size='large'
                                    />
                                    Signin
                                </Link>
                            </li>
                        </>
                    )}


                    {/* show if user/admin ARE logged in */}
                    {getTokenInStorage() && getUserInStorage() && (
                        <li>
                            <Link onClick={() => {
                                handleSignout(() => {
                                    handleToggle();
                                    history.push('/');
                                });
                            }}>
                                <Icon
                                    name='sign out'
                                    size='large'
                                />
                                Signout
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );




    /************ output *************/
    return (    
        <header>
            <Responsive {...Responsive.onlyMobile}>
                { showMobileNavbar() }
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                { showDesktopNavbar() }
            </Responsive>
        </header>
    )

};

export default withRouter(Header);

