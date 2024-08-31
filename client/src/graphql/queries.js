import { gql } from '@apollo/client';

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

