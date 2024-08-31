import prisma from "../../../prisma/db.js";

const userQueries = {
    user: async (_, args) => {
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
    users: async (_, args) => {
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
