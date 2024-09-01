import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
  }
}
`;

export const REGISTER_USER = gql`
mutation RegisterUser($registerInput: UserCreateInput!) {
    registerUser(registerInput: $registerInput) {
        token
    }
}
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            id
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
            likedByCurrentUser
        }
    }
`;


export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
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

export const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $postId: ID!) {
    addComment(content: $content, postId: $postId) {
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

export const REVERT_TO_PREVIOUS_VERSION = gql`
  mutation RevertToPreviousVersion($postId: ID!, $versionId: ID!) {
    revertToPreviousVersion(postId: $postId, versionId: $versionId) {
      id
      author{
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

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes
      likedByCurrentUser
    }
  }
`;