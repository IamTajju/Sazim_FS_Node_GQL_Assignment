// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

const CommentCard = ({ comment }) => {
    return (
        <Box marginBottom={2} border={1} borderRadius={2} padding={2}>
            <Typography variant="body1">{comment.content}</Typography>
            <Grid2 container justifyContent="space-between" marginTop={1}>
                <Typography variant="body2" color="textSecondary">
                    User: {comment.author.firstName} {comment.author.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Posted on: {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
            </Grid2>
        </Box>
    );
};

CommentCard.propTypes = {
    comment: PropTypes.shape({
        content: PropTypes.string.isRequired,
        author: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

export default CommentCard;
