// post/subscriptions.js
import { PubSub } from 'graphql-subscriptions';

// Initialize PubSub instance
const pubsub = new PubSub();
const POST_UPDATED = 'POST_UPDATED';
const POST_DELETED = 'POST_DELETED';

// Subscription resolvers for posts
const postSubscriptions = {
    Subscription: {
        postUpdated: {
            subscribe: () => pubsub.asyncIterator([POST_UPDATED]),
        },
        postDeleted: { // Add this resolver
            subscribe: () => pubsub.asyncIterator([POST_DELETED]),
        },
    },
};

// Export the pubsub instance and the subscriptions resolver
export { pubsub, POST_UPDATED, POST_DELETED, postSubscriptions };
