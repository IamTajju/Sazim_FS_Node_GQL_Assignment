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
        }
    }
`;