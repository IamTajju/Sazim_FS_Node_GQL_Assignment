import jwt from 'jsonwebtoken'; // or another JWT library
import prisma from '../prisma/db.js';

// Your secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const context = ({ req }) => {
    const token = req.headers.authorization || '';

    try {
        if (token) {
            // Verify the token
            const decoded = jwt.verify(token, SECRET_KEY);
            // Extract authorId or other user-related information
            return { user: decoded, prisma };
        }
    } catch (e) {
        console.error('JWT verification failed:', e);
        return { user: null, prisma };
    }

    return { user: null, prisma };
};

export default context;
