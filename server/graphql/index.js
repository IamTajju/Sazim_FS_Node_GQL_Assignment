import { ApolloServer } from 'apollo-server-express';
import schema from './schema.js';
const apolloServer = new ApolloServer({
    schema,
});

export default apolloServer;