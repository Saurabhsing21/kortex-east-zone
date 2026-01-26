import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

const router = express.Router();

async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await readUsers();

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create Token
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                username: user.username
            },
            process.env.JWT_SECRET || 'dev_secret_key_123',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ME (Verify Token)
router.get('/me', requireAuth, async (req, res) => {
    try {
        const users = await readUsers();
        const user = users.find(u => u.id === req.auth.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            role: user.role
        });
    } catch (error) {
        console.error('Me error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
