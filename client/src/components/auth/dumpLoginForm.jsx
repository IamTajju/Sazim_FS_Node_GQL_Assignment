// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define validation schema with Yup
const schema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});

function LoginForm() {
    // Initialize react-hook-form with yup resolver for validation
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log(data);
        // You can replace this with your login logic, e.g., API call
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', padding: '20px' }}
        >
            <Typography variant="h5" align="center">Login</Typography>

            {/* Email Input Field */}
            <Controller
                name="email"
                control={control}
                defaultValue=""
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

            {/* Password Input Field */}
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                )}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </Box>
    );
}

export default LoginForm;
