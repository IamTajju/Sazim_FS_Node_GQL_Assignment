const userQueries = {
    // eslint-disable-next-line no-unused-vars
    user: async (_, args, { user, prisma }) => {
        const { id } = args;
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    // eslint-disable-next-line no-unused-vars
    users: async (_, args, { user, prisma }) => {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default userQueries;
