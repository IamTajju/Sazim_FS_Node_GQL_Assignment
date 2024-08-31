
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/index.js';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';


gqlFiles.forEach((file) => {
    typeDefs += readFileSync(join(__dirname, './typedefs', file), {
        encoding: 'utf8',
    });
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;