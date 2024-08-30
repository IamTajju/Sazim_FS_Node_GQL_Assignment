// import LoginForm from "../components/auth/loginForm";
import Form from "../components/common/form";
// Define the fields for the form
const fields = [
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'dateOfBirth', type: 'date' },
    {
        name: 'gender',
        type: 'select',
        options: [
            { value: '', label: 'Select Gender' }, // Default option
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
        ],
    },
];

// Define default values
const defaultValues = {
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
};

// Han

// Function to handle form submission
const handleSubmit = (values) => {
    console.log('Form Submitted with values:', values);
};

// Function to handle back button action
const handleBack = (values) => {
    console.log('Back button clicked, current values:', values);
};




function LoginPage() {
    return (
        <div>
            <h1>This is the login page.</h1>
            {/* <LoginForm /> */}
            <Form
                fields={fields}
                defaultValues={defaultValues}
                showBackButton={false} // Show the back button
                onSubmit={handleSubmit} // Handle form submission
                onBack={handleBack}
                buttonText="Submit" // Handle back button click
            />
        </div>
    )
}

export default LoginPage;
