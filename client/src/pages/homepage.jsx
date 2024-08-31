// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import PostCard from '../components/posts/postCard';
import { Container, Box } from '@mui/material';
import { GET_POSTS } from '../graphql/queries';

import { POST_UPDATED } from '../graphql/subscriptions';


const HomePage = () => {
    const { data, loading, error, subscribeToMore } = useQuery(GET_POSTS);
    const { data: subscriptionData } = useSubscription(POST_UPDATED);


    const [posts, setPosts] = useState([]);

    // Update posts state when data is loaded
    useEffect(() => {
        if (data && data.posts) {
            setPosts(data.posts);
        }
    }, [data]);

    // Handle real-time updates from the subscription
    useEffect(() => {
        if (subscriptionData && subscriptionData.postUpdated) {
            const updatedPost = subscriptionData.postUpdated;
            setPosts(prevPosts => {
                // Update the list with the new or updated post
                const postExists = prevPosts.some(post => post.id === updatedPost.id);
                if (postExists) {
                    return prevPosts.map(post =>
                        post.id === updatedPost.id ? updatedPost : post
                    );
                } else {
                    // Add new post to the list if it doesn't already exist
                    return [updatedPost, ...prevPosts];
                }
            });
        }
    }, [subscriptionData]);

    useEffect(() => {
        // Set up subscription to receive real-time updates
        if (subscribeToMore) {
            subscribeToMore({
                document: POST_UPDATED,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const updatedPost = subscriptionData.data.postUpdated;

                    return {
                        ...prev,
                        posts: prev.posts.map(post =>
                            post.id === updatedPost.id ? updatedPost : post
                        )
                    };
                }
            });
        }
    }, [subscribeToMore]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container maxWidth="md" justifyContent="center"> {/* Center content with maxWidth */}
            <Box textAlign="center" marginBottom={4}>
                <h1>All Posts</h1>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
            >
                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default HomePage;
