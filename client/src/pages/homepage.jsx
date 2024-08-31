// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import PostCard from '../components/posts/postCard';
import { Container, Box } from '@mui/material';

// Define the query to fetch all posts
const GET_POSTS = gql`
  query Posts {
    posts {
      id
      author {
        firstName
        lastName
      }
      currentVersion {
        content
      }
      categories {
        id
        name
      }
      updatedAt
      createdAt
      likes
    }
  }
`;

// Define the subscription to listen for post updates
const POST_UPDATED = gql`
  subscription PostUpdated {
    postUpdated {
      id
      author {
        firstName
        lastName
      }
      currentVersion {
        content
      }
      categories {
        name
      }
      updatedAt
      createdAt
      likes
    }
  }
`;


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
                <h1>Posts</h1>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center" // Center items horizontally
                gap={1} // Optional: space between cards
            >
                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        userIsLoggedIn={true} // Set this based on your authentication logic
                    />
                ))}
            </Box>
        </Container>
    );
};

export default HomePage;
