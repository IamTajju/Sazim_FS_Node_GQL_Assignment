import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const client_origin = process.env.CLIENT_ORIGIN

// You may use this as a boolean value for different situations
const env = {
    development: process.env.NODE_ENV === 'development',
    // test: process.env.NODE_ENV === 'test',
    // staging: process.env.NODE_ENV === 'staging',
    production: process.env.NODE_ENV === 'production',
};

export { port, env, client_origin };