import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        loading: false
    });

    const { name, email, password, password2, successMsg, errorMsg, loading } = formData;


    /************ events *************/
    const handleChange = evt => {
        setFormData({
            ...formData,
            errorMsg: false,
            successMsg: false,
            [evt.target.name]: evt.target.value
        });
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
            <Form className='attached fluid segment' success={Boolean(successMsg)} error={Boolean(errorMsg)}>
                <Message success header='Success!' content={successMsg} />
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

    
    /************ display *************/
    return (
        <section>
            {/* { JSON.stringify(formData) } */}
            { showSignupForm() }
        </section>
    )

}

export default Signup;