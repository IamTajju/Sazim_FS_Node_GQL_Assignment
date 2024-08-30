import prisma from "../../../prisma/db.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';

const userMutations = {
     
    registerUser: async (_, args) => {
        const { firstName, lastName, dateOfBirth, gender, email, password } = args;
        try {
            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    dateOfBirth: new Date(dateOfBirth),
                    gender,
                    email,
                    password, // Note: Consider hashing passwords in a real application
                },
            });
            return newUser;
        } catch (error) {
            console.error(error);
            throw new Error('Error registering user');
        }
    },
     
    loginUser: async (_, args) => {
        const { email, password } = args;
        try {
            // Find user (make this findUNIQUE OR THROW)
            const user = await prisma.user.findUnique({
                where: { email },
            });

            // Check password (no hashing in this example, be sure to hash passwords in production)
            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            return token;
        } catch (error) {
            console.error(error);
            throw new Error('Error logging in user');
        }
    },
};

export default userMutations;
