import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty, isEmail, isLength } from 'validator';
import { signup } from '../api/auth';
import { Container, Form, Message, Button } from 'semantic-ui-react';


const Signup = () => {

    /************ component state *************/
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        isLoading: false
    });

    const { name, email, password, password2, successMsg, errorMsg, isLoading } = formData;


    /************ events *************/
    const handleChange = evt => {
        setFormData({
            ...formData,
            errorMsg: false,
            successMsg: false,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = evt => {
        evt.preventDefault();

        // clientside validation
        if ( isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(password2) ) {
            setFormData({ ...formData, errorMsg: 'Please enter all fields' });
        } else if ( !isEmail(email) ) {
            setFormData({ ...formData, errorMsg: 'Please enter a valid email' });
        } else if ( !isLength(password, {min: 6}) ) {
            setFormData({ ...formData, errorMsg: 'Password must be at least 6 characters long' });
        } else if ( password !== password2 ) {
            setFormData({ ...formData, errorMsg: 'Passwords do not match' });
        } else {
            // Success (submit form data to backend via HTTP Request)
            setFormData({ ...formData, isLoading: true });
            signup({ name, email, password })
                .then(res => {
                    setFormData({ ...formData, successMsg: true, isLoading: false });
                })
                .catch(err => {
                    setFormData({ ...formData, errorMsg: err.response.data.errorMsg, isLoading: false });
                });
        }
    }

    

    /************ views *************/
    const showSignupForm = () => (
        <Container className='container-signup-form' text>
            <Message
                color='teal'
                icon='signup'
                header='Welcome to El Balcon!'
                content='Fill out the form below to signup for a new account'
            />
            <Form className='attached fluid segment' loading={isLoading} success={Boolean(successMsg)} error={Boolean(errorMsg)} onSubmit={handleSubmit} noValidate>
                {/* <Message success header='Success!' content={successMsg} /> */}
                <Message success>
                    <Message.Header>Success!</Message.Header>
                    <p>Please <Link to='/signin'>signin</Link>&nbsp;here</p>
                </Message>
                <Message error header='Oops!' content={errorMsg} />
                <Form.Input
                    fluid
                    type='text'
                    icon='user'
                    iconPosition='left'
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={handleChange}
                />
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
                <Form.Input
                    fluid
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    color='orange'
                    icon='signup'
                    content='Signup'
                />
            </Form>
            <Message attached='bottom' warning>   
                Already signed up?&nbsp;<Link to='/signin'>Login here</Link>&nbsp;instead.
            </Message>
        </Container>
    );

    
    /************ output *************/
    return (
        <section>
            {/* { JSON.stringify(formData) } */}
            { showSignupForm() }
        </section>
    )

}

export default Signup;