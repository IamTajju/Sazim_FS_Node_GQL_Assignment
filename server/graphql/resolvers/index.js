import { userQueries, userMutations } from './user/index.js';
import { postQueries, postMutations, postSubscriptions } from './post/index.js';
import { categoryQueries } from './category/index.js'
import { commentQueries, commentMutations } from './comment/index.js'

const resolvers = {
    Query: {
        ...userQueries,
        ...postQueries,
        ...categoryQueries,
        ...commentQueries
    },
    Mutation: {
        ...userMutations,
        ...postMutations,
        ...commentMutations,
    },
    Subscription: {
        ...postSubscriptions.Subscription,
    }
};

export default resolvers;