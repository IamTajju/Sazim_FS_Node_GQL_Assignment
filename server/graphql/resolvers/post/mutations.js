import prisma from "../../../prisma/db.js";
import { postIncludeOptions, postMapLikesCount } from '../utils.js' // Adjust the path as needed

const postMutations = {
    createPost: async (_, { input }) => {
        const { content, authorId, categories } = input;

        try {
            // Use a Prisma transaction to ensure atomicity
            const post = await prisma.$transaction(async (prisma) => {
                // Step 1: Create the post
                const newPost = await prisma.post.create({
                    data: {
                        author: { connect: { id: Number(authorId) } },
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

            // Map likes count to the post object
            return postMapLikesCount(postUpdated);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default postMutations;
