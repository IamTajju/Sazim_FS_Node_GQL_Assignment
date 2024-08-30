import { userQueries, userMutations } from './user/index.js';
// import { bookQueries, bookMutations } from './book';
// import { publisherQueries, publisherMutations } from './publisher';

const resolvers = {
    Query: {
        ...userQueries,
    },
    Mutation: {
        ...userMutations,
    },
};

export default resolvers;