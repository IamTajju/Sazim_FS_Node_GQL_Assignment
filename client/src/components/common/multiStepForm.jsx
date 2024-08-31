// FormWizard.jsx

// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState } from 'react';
import Form from './form'; // Import the Form component
import PropTypes from 'prop-types';

const FormWizard = ({ steps, defaultValues, onSubmit, isLoading }) => {
    const [values, setValues] = useState({});
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const activeStep = useMemo(() => steps[activeStepIndex], [activeStepIndex, steps]);
    const isLastStep = useMemo(() => activeStepIndex === steps.length - 1, [activeStepIndex, steps.length]);

    const goNextStep = () => {
        setActiveStepIndex((index) => index + 1);
    };

    const goPrevStep = () => {
        setActiveStepIndex((index) => index - 1);
    };

    const handleNextStep = (stepValues) => {
        const newValues = { ...values, ...stepValues };
        setValues(newValues);

        if (isLastStep) {
            onSubmit(newValues);
        } else {
            goNextStep();
        }
    };

    const handleBackStep = (stepValues) => {
        const newValues = { ...values, ...stepValues };
        setValues(newValues);
        goPrevStep();
    };

    if (!activeStep) {
        return null; // No active step, return null
    }

    return (
        <div>
            <Form
                key={activeStep.id} // Important: Key helps React keep track of form instances
                fields={activeStep.fields}
                defaultValues={{ ...defaultValues, ...values }}
                showBackButton={activeStepIndex > 0}
                onSubmit={handleNextStep}
                onBack={handleBackStep}
                buttonText={isLastStep ? 'Submit' : 'Next'}
                isLoading={isLoading}
            />
        </div>
    );
};

// PropTypes for props validation
FormWizard.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string, // Optional, defaults to 'text' if not provided
                })
            ).isRequired,
        })
    ).isRequired,
    defaultValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default FormWizard;
