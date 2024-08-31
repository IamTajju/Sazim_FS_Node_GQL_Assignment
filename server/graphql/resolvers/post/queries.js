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
            return postMapLikesCount(post);
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

            // Use helper function to transform the posts
            return postMapLikesCount(posts);
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
            return postMapLikesCount(postsByUser);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default postQueries;