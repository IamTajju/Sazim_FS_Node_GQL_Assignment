// Form.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types'; // Import prop-types for props validation
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

// Define the Form component
const Form = ({ fields, defaultValues, showBackButton, onSubmit, onBack, buttonText }) => {
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
                return (
                    <TextField
                        key={field.name}
                        label={field.name}
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
                        })}
                    />
                );
            // Add other field types here as needed
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
                {showBackButton && (
                    <Button variant="contained" onClick={handleBack} style={{ marginRight: 16 }}>
                        Back
                    </Button>
                )}
                <Button variant="contained" type="submit">
                    {buttonText}
                </Button>
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
        })
    ).isRequired,
    defaultValues: PropTypes.object.isRequired,
    showBackButton: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired, // Add prop for button text
};

export default Form;
