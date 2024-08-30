import { ApolloServer } from 'apollo-server-express';
import schema from './schema.js';
const apolloServer = new ApolloServer({
    // Schema pending...
    schema,
});

export default apolloServer;