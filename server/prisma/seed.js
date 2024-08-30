import prisma from './db.js';

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
};

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
