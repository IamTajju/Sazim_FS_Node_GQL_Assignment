const commentQueries = {
    // eslint-disable-next-line no-unused-vars
    commentsForPosts: async (_, args, { user, prisma }) => {
        const { postId } = args;
        try {
            const comments = await prisma.comment.findMany({
                where: { postId: Number(postId) },
                include: {
                    author: true,
                    post: true,
                }
            });
            return comments;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default commentQueries;