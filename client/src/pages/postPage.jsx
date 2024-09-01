// src/pages/PostPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PostCard from '../components/posts/postCard';
import { GET_POST, GET_COMMENTS_FOR_POST, GET_POST_HISTORIES } from '../graphql/queries';
import { ADD_COMMENT, REVERT_TO_PREVIOUS_VERSION } from '../graphql/mutations';
import CommentCard from '../components/posts/commentCard';
import { AuthContext } from '../context/authContext';

const PostPage = () => {
    const { id } = useParams(); // Get postId from URL
    const { user } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [isAuthor, setAuthor] = useState(false);
    const { data: postData, loading: postLoading, error: postError } = useQuery(GET_POST, {
        variables: { id },
    });

    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to handle the alert visibility
    const [alertMessage, setAlertMessage] = useState(''); // Alert message state
    const [postHistories, setPostHistories] = useState([]); // State to store post histories

    const { data: commentsData, loading: commentsLoading, error: commentsError } = useQuery(GET_COMMENTS_FOR_POST, {
        variables: { postId: id },
    });

    const { data: postHistoriesData, loading: postHistoriesLoading, error: postHistoriesError } = useQuery(GET_POST_HISTORIES, {
        variables: { postId: id },
    });

    const [addComment] = useMutation(ADD_COMMENT, {
        onCompleted: (data) => {
            if (data && data.addComment) {
                setComments((prevComments) => [...prevComments, data.addComment]);
                setShowAlert(true);
                setAlertMessage('Comment added successfully!');
            }
        },
        onError: (error) => {
            console.error("Error adding comment:", error);
        }
    });

    const [revertToPreviousVersion] = useMutation(REVERT_TO_PREVIOUS_VERSION, {
        onCompleted: (data) => {
            if (data && data.revertToPreviousVersion) {
                console.log(data.revertToPreviousVersion);
                setPost(data.revertToPreviousVersion);
                setShowAlert(true);
                setAlertMessage('Post reverted to the selected version successfully!');
            }
        },
        onError: (error) => {
            console.error("Error reverting post:", error);
        }
    });

    useEffect(() => {
        if (postData) {
            setPost(postData.post);
            setAuthor(user && postData.post.author.id == user.userId)
        }
    }, [postData]);

    useEffect(() => {
        if (commentsData && commentsData.commentsForPosts) {
            setComments(commentsData.commentsForPosts);
        }
    }, [commentsData]);

    useEffect(() => {
        if (postHistoriesData && postHistoriesData.getPostHistories) {
            setPostHistories(postHistoriesData.getPostHistories);
            console.log(postHistoriesData);
        }

    }, [postHistoriesData]);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                await addComment({
                    variables: { content: newComment, postId: id }
                });
                setNewComment('');
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const handleRevertVersion = async (versionId) => {
        try {
            await revertToPreviousVersion({
                variables: { postId: id, versionId }
            });
        } catch (error) {
            console.error("Error reverting post version:", error);
        }
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    if (postLoading || commentsLoading || postHistoriesLoading) return <p>Loading...</p>;
    if (postError || commentsError || postHistoriesError) return <p>Error: {postError?.message || commentsError?.message || postHistoriesError?.message}</p>;

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
                    {alertMessage}
                </Alert>
            )}
            {isAuthor && (
                <Box marginBottom={4}>
                    <Typography variant="h6" gutterBottom>Post History</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Serial</TableCell>
                                    <TableCell>Content</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Revert</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {postHistories.map((history, index) => (
                                    <TableRow key={history.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{history.content}</TableCell>
                                        <TableCell>{new Date(history.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleRevertVersion(history.id)}
                                            >
                                                Revert
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
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
