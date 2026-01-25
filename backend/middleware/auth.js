import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify Clerk authentication
export const requireAuth = ClerkExpressRequireAuth({
    secretKey: process.env.CLERK_SECRET_KEY
});

// Middleware to check if user is Admin
export const requireAdmin = (req, res, next) => {
    const { userId, sessionClaims } = req.auth;

    // Check if user has admin role in metadata
    const userRole = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;

    if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }

    next();
};

// Middleware to check if user is authenticated (Admin or User)
export const requireUser = (req, res, next) => {
    const { userId } = req.auth;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};
