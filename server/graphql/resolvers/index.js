import { userQueries, userMutations } from './user/index.js';
import { postQueries, postMutations } from './post/index.js';
import { categoryQueries } from './category/index.js'

const resolvers = {
    Query: {
        ...userQueries,
        ...postQueries,
        ...categoryQueries,
    },
    Mutation: {
        ...userMutations,
        ...postMutations,
    },
};

export default resolvers;