import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      author {
        id
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

export const GET_POSTS = gql`
  query Posts {
    posts {
      id
      author {
        id
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

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export const GET_COMMENTS_FOR_POST = gql`
  query CommentsForPosts($postId: ID!) {
    commentsForPosts(postId: $postId) {
      id
      content
      author {
        id
        firstName
        lastName
      }
      createdAt
      post {
        id
      }
    }
  }
`;

export const GET_POST_HISTORIES = gql`
  query GetPostHistories($postId: ID!) {
    getPostHistories(postId: $postId) {  # Ensure this matches your schema
      id
      content
      createdAt
    }
  }
`;


