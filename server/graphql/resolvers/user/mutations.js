import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Retrieve the JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const userMutations = {
    // eslint-disable-next-line no-unused-vars
    registerUser: async (_, { registerInput }, { user, prisma }) => {
        const { firstName, lastName, dateOfBirth, gender, email, password, confirmPassword } = registerInput;

        // Validate passwords
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match!');
        }

        try {
            // Check if email already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

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

            // Generate JWT token
            const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
            return {
                token: token,
            };

        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // eslint-disable-next-line no-unused-vars
    loginUser: async (_, args, { user, prisma }) => {
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

            return {
                token: token,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default userMutations;
