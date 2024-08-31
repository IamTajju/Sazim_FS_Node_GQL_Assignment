// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Box, Button, MenuItem, TextField, Select, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useCategories } from '../../context/categoriesContext';
import { UPDATE_POST } from '../../graphql/mutations';


const EditPostModal = ({ open, onClose, post }) => {
    const categories = useCategories();

    const [content, setContent] = useState(post.currentVersion.content);
    const [selectedCategories, setSelectedCategories] = useState(post.categories.map(c => c.id));

    const [updatePost] = useMutation(UPDATE_POST);

    const handleSubmit = () => {
        updatePost({
            variables: {
                input: {
                    postId: post.id,
                    content,
                    categories: selectedCategories,
                }
            },
            onCompleted: () => {
                onClose(); // Close the modal on success
            },
        });
    };



    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Edit Post</DialogTitle>
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
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

// PropTypes validation
EditPostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        currentVersion: PropTypes.shape({
            content: PropTypes.string.isRequired,
        }).isRequired,
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default EditPostModal;