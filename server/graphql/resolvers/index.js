import { userQueries, userMutations } from './user/index.js';
import { postQueries, postMutations, postSubscriptions } from './post/index.js';
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
    Subscription: {
        ...postSubscriptions.Subscription,
    }
};

export default resolvers;