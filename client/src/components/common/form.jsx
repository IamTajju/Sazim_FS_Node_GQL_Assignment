/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box } from '@mui/material';

const formatLabel = (fieldName) => {
    return fieldName
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};

// Define the Form component
const Form = ({ fields, defaultValues, showBackButton, onSubmit, onBack, buttonText, isLoading }) => {
    const formInstance = useForm({
        defaultValues: useMemo(() => defaultValues, [defaultValues]),
    });

    const { handleSubmit, register, reset, setValue, getValues, formState: { errors } } = formInstance;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleBack = () => {
        const values = formInstance.getValues();
        onBack(values);
    };

    // Render Material UI components based on field type with error handling
    const renderField = (field) => {
        const fieldError = errors[field.name];

        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
            case 'confirmPassword':
                return (
                    <TextField
                        key={field.name}
                        label={formatLabel(field.name)}
                        type={field.type === 'password' || field.type === 'confirmPassword' ? 'password' : 'text'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!fieldError}
                        helperText={fieldError ? fieldError.message : ''}
                        {...register(field.name, {
                            required: 'This field is required',
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
                                validate: (value) => value === getValues('password') || 'Passwords do not match',
                            }),
                        })}
                    />
                );
            case 'date':
                return (
                    <TextField
                        key={field.name}
                        label={formatLabel(field.name)}
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={!!fieldError}
                        helperText={fieldError ? fieldError.message : ''}
                        {...register(field.name, {
                            required: 'This field is required',
                        })}
                    />
                );
            case 'select':
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
                                required: 'This field is required',
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

            case 'select-multiple':
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
                            multiple
                            value={getValues(field.name) || []} // Ensure the value is an array
                            // onChange={(e) => setValue(e.target.value)}
                            renderValue={(selected) => selected.map(id => field.options.find(option => option.value === id)?.label).join(', ')}
                            {...register(field.name, {
                                required: 'This field is required',
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
                        error={!!fieldError}
                        helperText={fieldError ? fieldError.message : ''}
                        {...register(field.name)}
                    />
                );
        }
    };

    return (
        <FormProvider {...formInstance}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map(renderField)}
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        {showBackButton && (
                            <Button variant="contained" onClick={handleBack} style={{ marginRight: 16 }}>
                                Back
                            </Button>
                        )}
                        <Button variant="contained" type="submit">
                            {buttonText}
                        </Button>
                    </Box>
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
            type: PropTypes.string,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired
                })
            ),
        })
    ).isRequired,
    defaultValues: PropTypes.object.isRequired,
    showBackButton: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
};

export default Form;
