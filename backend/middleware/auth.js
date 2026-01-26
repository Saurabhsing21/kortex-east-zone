import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_123';

// Middleware to verify JWT authentication
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.auth = decoded; // Attach decoded payload (userId, role) to req
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

export const requireAdmin = (req, res, next) => {
    if (req.auth.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied: Admin only' });
    }
    next();
};

export const requireUser = (req, res, next) => {
    // Both Admin and User can access user routes
    next();
};
