import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty, isEmail } from 'validator';
import { Container, Message, Form, Button } from 'semantic-ui-react';

const Signin = () => {
    
    /************ component state *************/
    // eslint-disable-next-line
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        success: false,
        errorMsg: false,
        isLoading: false,
        redirectUser: false
    });

    // eslint-disable-next-line
    const { email, password, success, errorMsg, isLoading, redirectUser } = formData;



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

        // clientside validation
        if ( isEmpty(email) || isEmpty(password) ) {
            setFormData({ ...formData, errorMsg: 'Please enter all fields' });
        } else if ( !isEmail(email) ) {
            setFormData({ ...formData, errorMsg: 'Please enter a valid email' });
        } else {
            // success - send user data to server via HTTP Request
            
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




    /************ output *************/
    return (
        <section>
            { showSigninForm() }
        </section>
    );

};

export default Signin;