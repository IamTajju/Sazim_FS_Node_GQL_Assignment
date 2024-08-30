// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define schema using Yup for validation
const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    dateOfBirth: yup.date().required('Date of Birth is required').typeError('Invalid date format'),
    gender: yup.mixed().oneOf(['MALE', 'FEMALE', 'UNSPECIFIED']).required('Gender is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function RegistrationForm() {
    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [step, setStep] = useState(1); // State to track the current step
    const [formData, setFormData] = useState({}); // State to store form data

    // Handle form submission
    const onSubmit = (data) => {
        console.log(data);
        // Add your submission logic here, e.g., send data to the server
    };

    // Handle next step
    const handleNext = () => {
        const currentValues = getValues();
        setFormData(prev => ({ ...prev, ...currentValues }));
        setStep(prev => prev + 1);
    };

    // Handle previous step
    const handleBack = () => {
        const currentValues = getValues();
        setFormData(prev => ({ ...prev, ...currentValues }));
        setStep(prev => prev - 1);
    };

    // Render each form step
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* First Name Field */}
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue={formData.firstName || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName ? errors.firstName.message : ''}
                                />
                            )}
                        />

                        {/* Last Name Field */}
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue={formData.lastName || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName ? errors.lastName.message : ''}
                                />
                            )}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Date of Birth Field */}
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            defaultValue={formData.dateOfBirth || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Date of Birth"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                />
                            )}
                        />

                        {/* Gender Field */}
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue={formData.gender || ''}
                            render={({ field }) => (
                                <FormControl variant="outlined" fullWidth error={!!errors.gender}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        {...field}
                                        label="Gender"
                                    >
                                        <MenuItem value="MALE">Male</MenuItem>
                                        <MenuItem value="FEMALE">Female</MenuItem>
                                        <MenuItem value="UNSPECIFIED">Unspecified</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Email Field */}
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={formData.email || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            )}
                        />

                        {/* Password Field */}
                        <Controller
                            name="password"
                            control={control}
                            defaultValue={formData.password || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                            )}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '300px', margin: 'auto', padding: '20px' }}
        >
            {/* <Typography variant="h5" align="center">Register</Typography> */}

            {renderStep()}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                {step > 1 && (
                    <Button variant="outlined" onClick={handleBack}>
                        Previous
                    </Button>
                )}
                {step < 3 ? (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                ) : (
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default RegistrationForm;
