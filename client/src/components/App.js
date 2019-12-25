import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
// components
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import Shop from './Shop';
import Cart from './Cart';
import NoMatch from './NoMatch';



const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/signin' component={Signin} />
                    <Route exact path='/shop' component={Shop} />
                    <Route exact path='/cart' component={Cart} />
                    <Route component={NoMatch} />
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default App;