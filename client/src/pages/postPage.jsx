// src/pages/PostPage.jsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Box, TextField, Button, Grid2, Typography } from '@mui/material';
import PostCard from '../components/posts/postCard';
import { GET_POST } from '../graphql/queries';
// import { ADD_COMMENT } from '../graphql/mutations';

const PostPage = () => {
    const { id } = useParams(); // Get postId from URL
    const { data: postData, loading: postLoading, error: postError } = useQuery(GET_POST, {
        variables: { id },
    });

    const [post, setPost] = useState();

    useEffect(() => {
        if (postData) {
            setPost(postData.post);
            console.log(postData.post);
            console.log(post)
        }
    }, [postData]);
    // const { data: commentsData, loading: commentsLoading, error: commentsError } = useQuery(GET_COMMENTS, {
    //     variables: { postId: id },
    // });
    // const [addComment] = useMutation(ADD_COMMENT);
    // const [newComment, setNewComment] = useState('');

    // const handleAddComment = async () => {
    //     if (newComment.trim()) {
    //         await addComment({ variables: { postId: id, content: newComment } });
    //         setNewComment(''); // Clear the input field
    //     }
    // };

    // if (postLoading || commentsLoading) return <p>Loading...</p>;
    // if (postError || commentsError) return <p>Error: {postError?.message || commentsError?.message}</p>;

    if (postLoading) return <p>Loading...</p>;
    if (postError) return <p>Error: {postError.message}</p>;
    // const post = postData.post;
    // const comments = commentsData.commentsForPosts;

    return (
        <Container maxWidth="md">
            <Box marginBottom={4}>
                {post ? (
                    <PostCard post={post} inPage={true} />
                ) : (
                    <Typography>No post found.</Typography>
                )}
            </Box>
            {/* <Box marginBottom={4}>
                <Typography variant="h6" gutterBottom>Comments</Typography>
                {comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </Box> */}
            {/* <Box>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    // value={newComment}
                    // onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <Button
                    variant="contained"
                    // onClick={handleAddComment}
                    style={{ marginTop: '1rem' }}
                >
                    Submit
                </Button>
            </Box> */}
        </Container>
    );
};

export default PostPage;
