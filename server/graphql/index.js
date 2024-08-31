import { ApolloServer } from 'apollo-server-express';
import schema from './schema.js';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import context from './context.js';


const startApolloServer = async (app) => {
    // Create an HTTP server
    const httpServer = http.createServer(app);

    // Create a WebSocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    // Create Apollo Server
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
        context,
    });

    // wsServer.on('connection', (ws) => {
    //     ws.on('message', (message) => {
    //         console.log(message);
    //     });
    // });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Set up WebSocket server for GraphQL subscriptions
    useServer({ schema }, wsServer);

    return { httpServer };
};

export default startApolloServer;