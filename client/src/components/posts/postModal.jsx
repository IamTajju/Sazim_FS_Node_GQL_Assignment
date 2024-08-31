// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Box, Button, MenuItem, TextField, Select, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useCategories } from '../../context/categoriesContext';
import { CREATE_POST, UPDATE_POST } from '../../graphql/mutations';

const PostModal = ({ open, onClose, post, isEditMode }) => {
    const categories = useCategories();

    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Use mutation based on the mode
    const [createPost] = useMutation(CREATE_POST);
    const [updatePost] = useMutation(UPDATE_POST);

    // Set initial values if in edit mode
    useEffect(() => {
        if (isEditMode && post) {
            setContent(post.currentVersion.content);
            setSelectedCategories(post.categories.map(c => c.id));
        } else {
            setContent('');
            setSelectedCategories([]);
        }
    }, [isEditMode, post]);

    const handleSubmit = () => {
        const variables = isEditMode
            ? { input: { postId: post.id, content, categories: selectedCategories } }
            : { input: { content, categories: selectedCategories } };

        const mutation = isEditMode ? updatePost : createPost;

        mutation({ variables, onCompleted: () => onClose() });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{isEditMode ? 'Edit Post' : 'Create Post'}</DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Content"
                    multiline
                    rows={4}
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Box my={2}></Box>
                <Select
                    multiple
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    fullWidth
                    renderValue={(selected) => selected.map(id => categories.find(c => c.id === id)?.name).join(', ')}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    {isEditMode ? 'Save' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// PropTypes validation
PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.shape({
        id: PropTypes.string,
        currentVersion: PropTypes.shape({
            content: PropTypes.string,
        }),
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
    }),
    isEditMode: PropTypes.bool.isRequired,
};

// Default props
PostModal.defaultProps = {
    post: null,
};

export default PostModal;
