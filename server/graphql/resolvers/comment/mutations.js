const commentMutations = {
    addComment: async (_, args, { user, prisma }) => {
        const { content, postId } = args;
        if (!user) {
            throw new Error('Not Authenticated');
        }
        try {
            const newComment = await prisma.comment.create({
                data: {
                    author: { connect: { id: Number(user.userId) } },
                    content,
                    post: { connect: { id: Number(postId) } }
                },
                include: {
                    author: true,
                    post: true,
                },
            });
            return newComment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}

export default commentMutations;