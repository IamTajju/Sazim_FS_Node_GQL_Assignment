
import { port } from './config/environment/index.js';
import { app, startApolloServer } from './app.js';

// Start the Apollo Server and HTTP server
const start = async () => {
    try {
        const { httpServer } = await startApolloServer(app);

        // Start the HTTP server
        httpServer.listen(port, () => {
            console.log(`🚀  GraphQL server running at http://localhost:${port}/graphql`);
        });
    } catch (error) {
        console.error('Failed to start the server', error);
    }
};

start();