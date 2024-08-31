// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types';
import { Link, Typography } from '@mui/material';

export default function RedirectLink({ text, link, linkText }) {
    return (
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            {text}{' '}
            <Link href={link} color="info" underline="hover">
                {linkText}
            </Link>
        </Typography>
    );
}

// PropTypes for props validation
RedirectLink.propTypes = {
    text: PropTypes.string.isRequired, // Ensure text is a required string
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired, // Ensure link is a required string
};