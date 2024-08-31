// src/pages/PostPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import PostCard from '../components/posts/postCard';
import { GET_POST, GET_COMMENTS_FOR_POST } from '../graphql/queries';
import { ADD_COMMENT } from '../graphql/mutations';
import CommentCard from '../components/posts/commentCard';

const PostPage = () => {
    const { id } = useParams(); // Get postId from URL
    const { data: postData, loading: postLoading, error: postError } = useQuery(GET_POST, {
        variables: { id },
    });

    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to handle the alert visibility

    const { data: commentsData, loading: commentsLoading, error: commentsError } = useQuery(GET_COMMENTS_FOR_POST, {
        variables: { postId: id },
    });

    const [addComment] = useMutation(ADD_COMMENT, {
        onCompleted: (data) => {
            // When the mutation is completed, add the new comment to the comments state
            if (data && data.addComment) {
                setComments((prevComments) => [...prevComments, data.addComment]);
                setShowAlert(true); // Show the success alert
            }
        },
        onError: (error) => {
            console.error("Error adding comment:", error);
        }
    });

    useEffect(() => {
        if (postData) {
            setPost(postData.post);
        }
    }, [postData]);

    useEffect(() => {
        if (commentsData && commentsData.commentsForPosts) {
            setComments(commentsData.commentsForPosts); // Set the comments state with the fetched comments
        }
    }, [commentsData]);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                await addComment({
                    variables: { content: newComment, postId: id }
                });
                setNewComment(''); // Clear the input field after adding comment
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    // Close the alert after 3 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    if (postLoading || commentsLoading) return <p>Loading...</p>;
    if (postError || commentsError) return <p>Error: {postError?.message || commentsError?.message}</p>;

    return (
        <Container maxWidth="md">
            <Box marginBottom={4}>
                {post ? (
                    <PostCard post={post} inPage={true} />
                ) : (
                    <Typography>No post found.</Typography>
                )}
            </Box>
            <Box marginBottom={4}>
                <Typography variant="h6" gutterBottom>Comments</Typography>
                {comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </Box>
            {showAlert && (
                <Alert severity="success" onClose={() => setShowAlert(false)}>
                    Comment added successfully!
                </Alert>
            )}
            <Box>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <Button
                    variant="contained"
                    onClick={handleAddComment}
                    style={{ marginTop: '1rem' }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default PostPage;
