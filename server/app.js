import express from 'express';
import cors from 'cors';
import startApolloServer from './graphql/index.js'
import { client_origin } from './config/environment/index.js';
const app = express();

const corsOptions = {
    origin: [
        'https://studio.apollographql.com', // Apollo Studio URL
        client_origin
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

export { app, startApolloServer };
