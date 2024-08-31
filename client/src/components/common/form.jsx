// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types'; // Import prop-types for props validation
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';


const formatLabel = (fieldName) => {
    // Split camel case into words and capitalize the first word
    return fieldName
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
};

// Define the Form component
const Form = ({ fields, defaultValues, showBackButton, onSubmit, onBack, buttonText, isLoading }) => {
    const formInstance = useForm({
        defaultValues: useMemo(() => defaultValues, [defaultValues]),
    });

    const { handleSubmit, register, reset, formState: { errors } } = formInstance;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleBack = () => {
        const values = formInstance.getValues();
        onBack(values);
    };

    // Render Material UI components based on field type with error handling
    const renderField = (field) => {
        const fieldError = errors[field.name]; // Get error for the current field

        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
            case 'confirmPassword': // Added password case
                return (
                    <TextField
                        key={field.name}
                        label={formatLabel(field.name)}
                        type={field.type === 'password' || field.type === 'confirmPassword' ? 'password' : 'text'} // Set type for password
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!fieldError} // Show error if there is one
                        helperText={fieldError ? fieldError.message : ''} // Display error message
                        {...register(field.name, {
                            required: 'This field is required', // Example validation rule
                            ...(field.type === 'email' && {
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            }),
                            ...(field.type === 'number' && {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Number must be non-negative',
                                },
                            }),
                            ...(field.type === 'confirmPassword' && {
                                validate: (value) => value === formInstance.getValues('password') || 'Passwords do not match',
                            }),
                        })}
                    />
                );
            case 'date': // Added date case
                return (
                    <TextField
                        key={field.name}
                        label={formatLabel(field.name)}
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Ensure label is not cut off for date inputs
                        error={!!fieldError}
                        helperText={fieldError ? fieldError.message : ''}
                        {...register(field.name, {
                            required: 'This field is required', // Example validation rule
                        })}
                    />
                );
            case 'select': // Added select case
                return (
                    <FormControl
                        key={field.name}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!fieldError}
                    >
                        <InputLabel>{formatLabel(field.name)}</InputLabel>
                        <Select
                            label={field.name}
                            defaultValue={defaultValues[field.name] || ''}
                            {...register(field.name, {
                                required: 'This field is required', // Example validation rule
                            })}
                        >
                            {field.options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {fieldError && <p style={{ color: 'red' }}>{fieldError.message}</p>}
                    </FormControl>
                );
            default:
                return (
                    <TextField
                        key={field.name}
                        label={field.name}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!fieldError} // Show error if there is one
                        helperText={fieldError ? fieldError.message : ''} // Display error message
                        {...register(field.name)}
                    />
                );
        }
    };

    return (
        <FormProvider {...formInstance}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map(renderField)}
                {isLoading ? ( // Conditionally render CircularProgress or buttons
                    <CircularProgress />
                ) : (
                    <>
                        {showBackButton && (
                            <Button variant="contained" onClick={handleBack} style={{ marginRight: 16 }}>
                                Back
                            </Button>
                        )}
                        <Button variant="contained" type="submit">
                            {buttonText}
                        </Button>
                    </>
                )}
            </form>
        </FormProvider>
    );
};

// PropTypes for props validation
Form.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string, // Optional, defaults to 'text' if not provided
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired
                })
            ), // For select fields
        })
    ).isRequired,
    defaultValues: PropTypes.object.isRequired,
    showBackButton: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    isLoading: PropTypes.bool, // Add prop for button text
};

export default Form;
