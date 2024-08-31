import express from 'express';
import cors from 'cors';
import graphqlServer from './graphql/index.js'

const app = express();

// Configure CORS options if needed
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL or '*' to allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to support cookies or authentication
};

// Use CORS middleware
app.use(cors(corsOptions));


const startApolloServer = async () => {
    await graphqlServer.start(); // Start the Apollo Server
    graphqlServer.applyMiddleware({
        app,
    });
};

startApolloServer();

export default app;