// post/subscriptions.js
import { PubSub } from 'graphql-subscriptions';

// Initialize PubSub instance
const pubsub = new PubSub();
const POST_UPDATED = 'POST_UPDATED';

// Subscription resolvers for posts
const postSubscriptions = {
    Subscription: {
        postUpdated: {
            subscribe: () => pubsub.asyncIterator([POST_UPDATED]),
        },
    },
};

// Export the pubsub instance and the subscriptions resolver
export { pubsub, POST_UPDATED, postSubscriptions };
