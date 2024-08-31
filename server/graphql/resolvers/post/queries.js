import prisma from "../../../prisma/db.js";
import { postIncludeOptions, postMapLikesCount } from "../utils.js";

const postQueries = {
    post: async (_, args) => {
        const { id } = args;
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



    // eslint-disable-next-line no-unused-vars
    posts: async (_, args) => {
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

    postsByUser: async (_, args) => {
        const { userId } = args;
        try {
            const postsByUser = await prisma.post.findMany({
                where: { authorId: Number(userId) },
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