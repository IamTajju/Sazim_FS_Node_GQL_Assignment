// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import { Card, CardContent, Typography, Chip, IconButton, Grid2, Link } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import PostModal from './postModal';
import { AuthContext } from '../../context/authContext';



export default function PostCard({ post }) {
    const { author, currentVersion, categories, likes } = post;
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [isAuthor, setAuthor] = useState(user && author.id == user.userId);


    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const categoryNames = categories.map(category => category.name).join(', ');

    return (
        <>
            <Card
                sx={{
                    px: 2,
                    py: 1,
                    my: 1,
                    minWidth: {
                        xs: 'auto', // Default for smaller screens
                        sm: 600,
                        // Minimum width for screens 600px and up
                    }
                }}
            >
                <CardContent>
                    <Grid2 container item md={12} alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">
                            {isAuthor ? 'You' : `${author.firstName} ${author.lastName}`}
                        </Typography>
                        {isAuthor && (
                            <IconButton aria-label="edit" onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        )}
                    </Grid2>

                    {categoryNames !== "" &&
                        (
                            <Chip color='info' label={categoryNames} />
                        )
                    }

                    <Typography variant="body1" sx={{ mb: 3, mt: 2 }}>
                        {currentVersion.content}
                    </Typography>



                    <Grid2 container justifyContent="space-between" alignItems="center">
                        <Grid2 container item alignItems="center" justifyContent="space-between">
                            <IconButton aria-label="like">
                                <ThumbUpAltIcon />
                            </IconButton>
                            <Typography variant="body2">{likes}</Typography>
                        </Grid2>
                        <Grid2 container item alignItems="center" justifyContent="space-between">
                            <IconButton aria-label="comments">
                                <CommentIcon />
                            </IconButton>
                            <Link href="#comments" underline="none">View comments</Link>
                        </Grid2>
                    </Grid2>
                </CardContent>
            </Card>
            <PostModal
                open={modalOpen}
                onClose={handleCloseModal}
                post={post}
                isEditMode={true}
            />

        </>
    );
}

// PropTypes validation
PostCard.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.shape({
            id: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }).isRequired,
        currentVersion: PropTypes.shape({
            content: PropTypes.string.isRequired,
        }),
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        likes: PropTypes.number.isRequired,
    }).isRequired,
};
