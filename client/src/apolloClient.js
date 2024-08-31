import { ApolloClient, createHttpLink, split, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql"
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:8000/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            // Include any required headers or authentication tokens here
            // authToken: localStorage.getItem("token") || ""
        }
    }
}));

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    }
});

// Use split for proper "routing" of the requests
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;

