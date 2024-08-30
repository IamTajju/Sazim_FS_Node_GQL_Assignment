import express from 'express';
import graphqlServer from './graphql/index.js'

const app = express();

const startApolloServer = async () => {
    await graphqlServer.start(); // Start the Apollo Server
    graphqlServer.applyMiddleware({
        app,
    });
};

startApolloServer();

export default app;