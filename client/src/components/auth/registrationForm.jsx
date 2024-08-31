// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import FormWizard from '../common/multiStepForm';
import { AuthContext } from '../../context/authContext';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { Alert, Container } from '@mui/material';



const REGISTER_USER = gql`
    mutation RegisterUser($registerInput: UserCreateInput!) {
        registerUser(registerInput: $registerInput) {
            token
        }
    }
`;

export default function RegistrationForm() {

    const context = useContext(AuthContext);

    let navigate = useNavigate();

    // Define initial values for the form fields
    const initialValues = {
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        gender: null,
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [errors, setErrors] = useState([])

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: token } }) {
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


    // Define the steps for the form wizard
    const steps = [
        {
            id: 'Name',
            fields: [
                { name: 'firstName', type: 'text', required: true },
                { name: 'lastName', type: 'text' },
            ],
        },
        {
            id: 'Particulars',
            fields: [
                { name: 'dateOfBirth', type: 'date' },
                {
                    name: 'gender',
                    type: 'select',
                    options: [
                        { value: '', label: 'Select Gender' }, // Default option
                        { value: 'MALE', label: 'Male' },
                        { value: 'FEMALE', label: 'Female' },
                        { value: 'UNSPECIFIED', label: 'UNSPECIFIED' },
                    ],
                },
            ],
        },
        {
            id: 'Credentials',
            fields: [
                { name: 'email', type: 'email' },
                { name: 'password', type: 'password' },
                { name: 'confirmPassword', type: 'confirmPassword' },
            ],
        },
    ];


    const handleSubmit = (values) => {
        registerUser({ variables: { registerInput: values } });
    };


    return (
        <Container spacing={2} maxWidth="sm">
            {errors.map((error, index) => (
                <Alert key={index} severity='error' sx={{ mt: 2 }}>
                    {error.message}
                </Alert>
            ))}
            <FormWizard
                steps={steps}
                defaultValues={initialValues}
                onSubmit={handleSubmit}
                isLoading={loading}
            />
        </Container>
    )
}
