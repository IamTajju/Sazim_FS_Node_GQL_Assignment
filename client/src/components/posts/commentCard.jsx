// src/components/comments/CommentCard.jsx
import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';

const CommentCard = ({ comment }) => {
    return (
        <Box marginBottom={2} border={1} borderRadius={2} padding={2}>
            <Typography variant="body1">{comment.content}</Typography>
            <Grid2 container justifyContent="space-between" marginTop={1}>
                <Typography variant="body2" color="textSecondary">{comment.user.firstName} {comment.user.secondName}</Typography>
                <Typography variant="body2" color="textSecondary">{new Date(comment.createdAt).toLocaleDateString()}</Typography>
            </Grid2>
        </Box>
    );
};

export default CommentCard;
