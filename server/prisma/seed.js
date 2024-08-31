import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create some dummy users
    await prisma.user.createMany({
        data: [
            {
                firstName: "Tahzeeb",
                lastName: "Ahmed",
                dateOfBirth: new Date("1999-09-19"),
                gender: "MALE",
                email: "tahzeeb2g@gmail.com",
                password: "password1", // Note: Store hashed passwords in production!
            },
            {
                firstName: "John",
                lastName: "Doe",
                dateOfBirth: new Date("1992-02-02"),
                gender: "MALE",
                email: "john.doe@example.com",
                password: "password2",
            },
            {
                firstName: "Jane",
                lastName: "Doe",
                dateOfBirth: new Date("1995-02-02"),
                gender: "FEMALE",
                email: "jane.doe@example.com",
                password: "password3",
            },
        ],
    });

    // Create post categories
    await prisma.category.createMany({
        data: [
            { name: "Technology" },
            { name: "Travel" },
            { name: "Food" },
            { name: "Lifestyle" },
            { name: "Fashion" },
            { name: "Entertainment" },
            { name: "DIY" },
            { name: "Business" },
            { name: "Sports" },
        ],
    });

    // Fetch all users and categories to use in post creation
    const users = await prisma.user.findMany();
    const categories = await prisma.category.findMany();

    // Function to get random categories for posts
    const getRandomCategories = () => {
        const shuffled = [...categories].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.floor(Math.random() * 3));
    };

    // Create posts with random categories and post history
    for (const user of users) {
        for (let i = 0; i < 4; i++) {
            await prisma.$transaction(async (prisma) => {
                // Step 1: Create a post with a placeholder currentVersion
                const post = await prisma.post.create({
                    data: {
                        author: { connect: { id: user.id } },
                        categories: {
                            connect: getRandomCategories().map((category) => ({
                                id: category.id,
                            })),
                        },
                    },
                });

                // Step 2: Create post histories linked to the created post
                await prisma.postHistory.createMany({
                    data: [
                        {
                            version: 1,
                            content: `Initial content of the post ${i} of ${user.firstName}`,
                            createdAt: new Date(),
                            postId: post.id, // Link to the created post
                        },
                        {
                            version: 2,
                            content: `Updated content of the post ${i} of ${user.firstName}`,
                            createdAt: new Date(),
                            postId: post.id, // Link to the created post
                        },
                        {
                            version: 3,
                            content: `Latest content of the post ${i} of ${user.firstName}`,
                            createdAt: new Date(),
                            postId: post.id, // Link to the created post
                        },
                    ],
                });

                // Step 3: Get the latest post history to set as the current version
                const lastPostHistory = await prisma.postHistory.findFirst({
                    where: { postId: post.id },
                    orderBy: { id: 'desc' },
                    take: 1,
                });

                // Step 4: Update the post with the current version
                await prisma.post.update({
                    where: { id: post.id },
                    data: {
                        currentVersion: { connect: { id: lastPostHistory.id } },
                    },
                });
            });
        }
    }
}

// Execute the main function
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
