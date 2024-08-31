import prisma from "../../../prisma/db.js";

const categoryQueries = {
    // eslint-disable-next-line no-unused-vars
    categories: async (_, args) => {
        try {
            const categories = await prisma.category.findMany();
            return categories;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default categoryQueries;
