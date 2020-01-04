import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import Shop from './Shop';
import Cart from './Cart';
import PrivateRoute from './PrivateRoute';
import UserDashboard from './UserDashboard';
import AdminRoute from './AdminRoute';
import AdminDashboard from './AdminDashboard';
import NoMatch from './NoMatch';



const App = () => {
    const [showSideNavbar, setShowSideNavbar] = useState(false);

    let handleToggle = evt => {
        setShowSideNavbar(!showSideNavbar);
    }

    return (
        <BrowserRouter>

            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    visible={showSideNavbar}
                    width='thin'
                    inverted
                    vertical
                    icon='labeled'
                >
                    <Menu.Item>
                        <Icon 
                            name="sidebar"
                            size='large'
                            onClick={handleToggle}
                        />
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={showSideNavbar}>
                    <Navbar handleToggle={handleToggle} />
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/signup' component={Signup} />
                            <Route exact path='/signin' component={Signin} />
                            <Route exact path='/shop' component={Shop} />
                            <Route exact path='/cart' component={Cart} />
                            <PrivateRoute exact path='/user/dashboard' component={UserDashboard} />
                            <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
                            <Route component={NoMatch} />
                        </Switch>
                    </main>  
                </Sidebar.Pusher>

            </Sidebar.Pushable>
            
        </BrowserRouter>
    )
}

export default App;