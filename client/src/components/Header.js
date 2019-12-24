import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Icon, Container } from 'semantic-ui-react';
import logo from './logo.PNG';


const Header = () => (
    <header>
        <nav>
            <Menu stackable>
                <Container>

                    <Menu.Item>
                        <Image 
                            src={logo}
                            size='tiny'
                        />
                    </Menu.Item>
                    <Menu.Item as={Link} to='/'>
                        <Icon
                            name='tags'
                            size='large'
                        />
                        Shop
                    </Menu.Item>
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
                    <Menu.Item as={Link} to='/cart'>
                        <Icon
                            name='cart'
                            size='large'
                        />
                        Cart
                    </Menu.Item>

                </Container>
            </Menu>
        </nav>
    </header>
);

export default Header;