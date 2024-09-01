// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import { Card, CardContent, Typography, Chip, IconButton, Grid2, Link } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import PostMutationModal from './postMutationModal';
import { AuthContext } from '../../context/authContext';
import { useMutation } from '@apollo/client';
import { LIKE_POST, DELETE_POST } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';



export default function PostCard({ post, inPage }) {
    const { id, author, currentVersion, categories, likes, likedByCurrentUser } = post;
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [isAuthor, setAuthor] = useState(user && author.id == user.userId);
    const [likeStatus, setLikeStatus] = useState(likedByCurrentUser);
    const [likeCount, setLikeCount] = useState(likes);
    let navigate = useNavigate();


    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id },
        onCompleted: (data) => {
            setLikeStatus(data.likePost.likedByCurrentUser);
            setLikeCount(data.likePost.likes);
        },
        onError: (error) => {
            console.error('Error liking the post:', error);
        }
    });


    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLikeClick = () => {
        likePost();
    };

    const handleDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost();
        }
    };

    const [deletePost] = useMutation(DELETE_POST, {
        variables: { postId: id },
        onCompleted: (data) => {
            if (data.deletePost.success) {
                alert('Post deleted successfully');
                navigate("/");
            } else {
                alert(data.deletePost.message || 'Failed to delete post');
            }
        },
        onError: (error) => {
            console.error('Error deleting the post:', error);
        }
    });

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
                            <IconButton aria-label="like" onClick={handleLikeClick}>
                                {likeStatus ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                            </IconButton>
                            <Typography variant="body2">{likeCount} likes</Typography>
                        </Grid2>
                        {!inPage ? (
                            <Grid2 container item alignItems="center" justifyContent="space-between">
                                <IconButton aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                                <Link href={`/post/${id}`} underline="none">View comments</Link>
                            </Grid2>
                        ) : isAuthor && (
                            <Grid2 container item alignItems="center" justifyContent="space-between">
                                <IconButton aria-label="delete" color="error" onClick={handleDeleteClick}>
                                    <DeleteIcon />
                                </IconButton>
                                {/* Optionally add more elements or functionality here */}
                            </Grid2>
                        )}
                    </Grid2>
                </CardContent>
            </Card>
            <PostMutationModal
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
        id: PropTypes.string.isRequired,
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
        likedByCurrentUser: PropTypes.bool,
    }).isRequired,
    inPage: PropTypes.bool,
};
