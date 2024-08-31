

const categoryQueries = {
    // eslint-disable-next-line no-unused-vars
    categories: async (_, args, { user, prisma }) => {
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
