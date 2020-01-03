import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isEmpty, isEmail } from 'validator';
import { signin } from '../api/auth';
import { 
    setTokenInStorage, 
    removeTokenInStorage,
    setUserInStorage,
    getUserInStorage,
    removeUserInStorage
} from '../utils/localStorage';
import { Container, Message, Form, Button } from 'semantic-ui-react';

const Signin = () => {
    
    /************ component state *************/
    // eslint-disable-next-line
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
        isLoading: false,
        redirectToDashboard: false
    });

    // eslint-disable-next-line
    const { email, password, errorMsg, isLoading, redirectToDashboard } = formData;


    
    /************ events *************/
    const handleChange = evt => {
        setFormData({
            ...formData,
            errorMsg: false,
            [evt.target.name]: evt.target.value
        });
    }


    const handleSubmit = evt => {
        evt.preventDefault();

        setFormData({ ...formData, isLoading: true });

        // clientside validation
        if ( isEmpty(email) || isEmpty(password) ) {
            setFormData({ ...formData, errorMsg: 'Please enter all fields' });
        } else if ( !isEmail(email) ) {
            setFormData({ ...formData, errorMsg: 'Please enter a valid email' });
        } else {
            // make clientside HTTP Request to server
            signin(email, password)
                .then(response => {
                    setTokenInStorage(response.data.token);
                    setUserInStorage(response.data.user);

                    setFormData({ ...formData, isLoading: false, redirectToDashboard: true });
                })
                .catch(err => {
                    removeTokenInStorage();
                    removeUserInStorage();

                    setFormData({ ...formData, isLoading: false, errorMsg: err.response.data.errorMsg });
                    console.log(err);
                });   
        }
    }


    /************ views *************/
    const showSigninForm = () => (
        <Container className='container-signin-form' text>
            <Message
                color='blue'
                icon='privacy'
                header='Welcome Back!'
                content='Signin with email and password'
            />
            <Form className='attached fluid segment' loading={isLoading} error={Boolean(errorMsg)} onSubmit={handleSubmit} noValidate>
                <Message error header='Oops!' content={errorMsg} />
                <Form.Input
                    fluid
                    type='email'
                    icon='mail'
                    iconPosition='left'
                    label='Email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    color='orange'
                    icon='sign in'
                    content='Signin'
                />
            </Form>
            <Message attached='bottom' warning>
                <p>New user? <Link to='/signup'>Signup</Link> here</p>
            </Message>
        </Container>
    );



    /************ redirect *************/
    const redirect = () => {
        if ( redirectToDashboard ) {
            const user = getUserInStorage();
            
            if ( user && user.role === 1 ) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }   
    }


    /************ output *************/
    return (
        <section>
            {/* { JSON.stringify(formData) } */}
            { redirect() }
            { showSigninForm() }
        </section>
    );

};

export default Signin;