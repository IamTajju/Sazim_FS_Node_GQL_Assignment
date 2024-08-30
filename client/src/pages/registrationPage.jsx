// eslint-disable-next-line no-unused-vars
import React from 'react'
// import RegistrationForm from '../components/auth/registrationForm'
import FormWizard from '../components/common/multiStepForm';



export default function RegistrationPage() {

    // Define the steps for the form wizard
    const steps = [
        {
            id: 'step1',
            fields: [
                { name: 'firstName', type: 'text' },
                { name: 'email', type: 'email' },
            ],
        },
        {
            id: 'step2',
            fields: [
                { name: 'age', type: 'number' },
                { name: 'comments', type: 'text' },
            ],
        },
        {
            id: 'step3',
            fields: [
                { name: 'agreement', type: 'checkbox' }, // Example of a different field type
            ],
        },
    ];

    // Define default values for the form fields
    const defaultValues = {
        firstName: '',
        email: '',
        age: 0,
        comments: '',
        agreement: false,
    };

    // Handle form submission
    const handleSubmit = (values) => {
        console.log('Form submitted with values:', values);
        // Perform submission logic here (e.g., send data to an API)
    };



    return (
        <div>
            <center><h2>Registration Page</h2></center>
            {/* <RegistrationForm /> */}
            <FormWizard
                steps={steps}
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
