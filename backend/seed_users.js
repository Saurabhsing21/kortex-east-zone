import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedUsers = async () => {
    const users = [
        {
            id: '1',
            username: 'admin',
            password: await bcrypt.hash('admin123', 10),
            fullName: 'Admin User',
            role: 'admin'
        },
        {
            id: '2',
            username: 'user',
            password: await bcrypt.hash('user123', 10),
            fullName: 'Regular User',
            role: 'user'
        }
    ];

    const dataDir = path.join(__dirname, 'data');

    // Ensure data directory exists
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }

    await fs.writeFile(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
    console.log('Users seeded successfully');
};

seedUsers().catch(console.error);
