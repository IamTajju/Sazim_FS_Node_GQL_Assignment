// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { Alert, Container } from '@mui/material';
import Form from '../common/form';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;


export default function LoginForm() {
    const context = useContext(AuthContext);
    let navigate = useNavigate();


    // Define default values
    const initialValues = {
        email: '',
        password: '',
    };
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState(initialValues)

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: token } }) {
            context.login(token);
            navigate('/');

        },
        onError({ graphQLErrors, networkError }) {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(`GraphQL error: ${message}`, { locations, path })
                );
                setErrors(graphQLErrors);
            }
            if (networkError) {
                console.log(`Network error: ${networkError.message}`);
            }
        },
    })

    const fields = [
        { name: 'email', type: 'email' },
        { name: 'password', type: 'password' },
    ];

    const handleSubmit = (values) => {
        setFormData(values)
        loginUser({ variables: { email: values.email, password: values.password } });
    };

    // Function to handle back button action
    const handleBack = (values) => {
        console.log('Back button clicked, current values:', values);
    };


    return (
        <Container spacing={2} maxWidth="sm">
            {errors.map((error, index) => (
                <Alert key={index} severity='error' sx={{ mt: 2 }}>
                    {error.message}
                </Alert>
            ))}
            <Form
                fields={fields}
                defaultValues={formData}
                showBackButton={false} // Show the back button
                onSubmit={handleSubmit} // Handle form submission
                onBack={handleBack}
                buttonText="Login"
                isLoading={loading} // Handle back button click
            />
        </Container>

    )
}
