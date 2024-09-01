import { postIncludeOptions, postMapLikesCount } from "../utils.js";

const postQueries = {
    post: async (_, args, { user, prisma }) => {
        const { id } = args;
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            const post = await prisma.post.findUnique({
                where: { id: Number(id) },
                include: postIncludeOptions
            });
            return postMapLikesCount(post, user.userId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    posts: async (_, args, { user, prisma }) => {
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            const posts = await prisma.post.findMany({
                include: postIncludeOptions
            });

            return postMapLikesCount(posts, user.userId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    postsByUser: async (_, args, { user, prisma }) => {
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            const postsByUser = await prisma.post.findMany({
                where: { authorId: Number(user.userId) },
                include: postIncludeOptions
            });
            // Use helper function to transform the posts
            return postMapLikesCount(postsByUser, user.userId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getPostHistories: async (_, { postId }, { user, prisma }) => {
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            // Fetch post histories for a specific post ID
            const postHistories = await prisma.postHistory.findMany({
                where: {
                    postId: parseInt(postId),
                },
                orderBy: {
                    createdAt: 'desc', // Order by creation date descending (most recent first)
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                },
            });

            return postHistories;
        } catch (error) {
            console.error('Error fetching post histories:', error);
            throw error;
        }
    },
};

export default postQueries;