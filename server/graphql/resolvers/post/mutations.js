import { postIncludeOptions, postMapLikesCount } from '../utils.js' // Adjust the path as needed
import { pubsub, POST_UPDATED } from './subscriptions.js';

const postMutations = {
    createPost: async (_, { input }, { user, prisma }) => {
        const { content, categories } = input;
        if (!user) {
            throw new Error('Not Authenticated');
        }

        try {
            // Use a Prisma transaction to ensure atomicity
            const post = await prisma.$transaction(async (prisma) => {
                // Step 1: Create the post
                const newPost = await prisma.post.create({
                    data: {
                        author: { connect: { id: Number(user.userId) } },
                        categories: {
                            connect: categories.map(categoryId => ({ id: Number(categoryId) })),
                        },
                    },
                });

                // Step 2: Create the post history for the new post
                const postHistory = await prisma.postHistory.create({
                    data: {
                        content: content,
                        post: { connect: { id: newPost.id } },
                    },
                });

                // Step 3: Update the post with the current version
                await prisma.post.update({
                    where: { id: newPost.id },
                    data: {
                        currentVersion: { connect: { id: postHistory.id } },
                    },
                });

                // Return the new post and its history
                return newPost;
            });

            // Fetch the post with updated details
            const postUpdated = await prisma.post.findUnique({
                where: { id: post.id },
                include: postIncludeOptions,
            });
            const postWithLikes = postMapLikesCount(postUpdated);
            pubsub.publish(POST_UPDATED, { postUpdated: postWithLikes });
            // Map likes count to the post object
            return postWithLikes;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updatePost: async (_, { input }, { user, prisma }) => {
        const { postId, content, categories } = input;
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            // Check if the user is the author of the post
            const checkPost = await prisma.post.findUnique({
                where: { id: Number(postId) },
                select: { authorId: true } // Fetch only the authorId
            });

            if (!checkPost) {
                throw new Error('Post not found');
            }

            if (checkPost.authorId !== user.userId) {
                throw new Error('Not authorized to update this post');
            }

            // Start a transaction
            const post = await prisma.$transaction(async (tx) => {
                let postHistoryId;

                // If content is provided, create a new PostHistory
                if (content) {
                    const history = await tx.postHistory.create({
                        data: {
                            content,
                            post: { connect: { id: Number(postId) } }
                        }
                    });
                    postHistoryId = history.id;
                }

                // Update the post
                const updatedPost = await tx.post.update({
                    where: { id: Number(postId) },
                    data: {
                        // Update currentVersion if content is provided
                        currentVersion: content
                            ? { connect: { id: postHistoryId } }
                            : undefined,
                        // Update categories if provided
                        categories: categories
                            ? { set: categories.map(categoryId => ({ id: Number(categoryId) })) }
                            : undefined
                    },
                    include: postIncludeOptions,
                });

                return updatedPost;
            });

            // Map likes count and publish the updated post
            const postWithLikes = postMapLikesCount(post);
            pubsub.publish(POST_UPDATED, { postUpdated: postWithLikes });

            return postWithLikes;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update post');
        }
    },

    revertToPreviousVersion: async (_, { input }, { user, prisma }) => {
        const { postId, postHistoryId } = input
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            // Check if the user is the author of the post
            const post = await prisma.post.findUnique({
                where: { id: Number(postId) },
                select: { authorId: true } // Fetch only the authorId
            });

            if (!post) {
                throw new Error('Post not found');
            }

            if (post.authorId !== user.userId) {
                throw new Error('Not authorized to update this post');
            }
            // Fetch the specified PostHistory entry and ensure it's associated with the given postId
            const postHistory = await prisma.postHistory.findUnique({
                where: { id: Number(postHistoryId) },
                include: {
                    post: true // Include the post associated with this history entry
                }
            });

            if (!postHistory) {
                throw new Error('PostHistory entry not found');
            }

            // Check if the PostHistory entry is associated with the provided postId
            if (postHistory.postId !== Number(postId)) {
                throw new Error('PostHistory entry does not belong to the provided postId');
            }

            // Update the post's currentVersion to the specified PostHistory entry
            const updatedPost = await prisma.post.update({
                where: { id: Number(postId) },
                data: {
                    currentVersion: { connect: { id: Number(postHistoryId) } }
                },
                include: postIncludeOptions
            });

            // Map likes count and publish the updated post
            const postWithLikes = postMapLikesCount(updatedPost);
            pubsub.publish(POST_UPDATED, { postUpdated: postWithLikes });

            return postWithLikes;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to revert to previous version');
        }
    }
};


export default postMutations;
