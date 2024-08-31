import { gql } from '@apollo/client';

export const POST_UPDATED = gql`
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