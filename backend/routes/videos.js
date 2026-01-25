import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { requireAuth, requireAdmin, requireUser } from '../middleware/auth.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept video files only
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'), false);
        }
    }
});

// Path to videos.json file
const videosFilePath = path.join(__dirname, '../data/videos.json');

// Helper function to read videos from JSON file
async function readVideos() {
    try {
        const data = await fs.readFile(videosFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write videos to JSON file
async function writeVideos(videos) {
    await fs.writeFile(videosFilePath, JSON.stringify(videos, null, 2));
}

// GET all videos - accessible by both Admin and User
router.get('/', requireAuth, requireUser, async (req, res) => {
    try {
        const videos = await readVideos();
        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// POST upload video - Admin only
router.post('/upload', requireAuth, requireAdmin, upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Video title is required' });
        }

        // Upload video to Cloudinary using upload_stream
        const uploadPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: 'kortex-east-zone',
                    public_id: `video_${Date.now()}`,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(req.file.buffer);
        });

        const result = await uploadPromise;

        // Create video metadata
        const videoMetadata = {
            id: Date.now().toString(),
            title,
            public_id: result.public_id,
            secure_url: result.secure_url,
            uploadedBy: req.auth.userId,
            createdAt: new Date().toISOString(),
            duration: result.duration,
            format: result.format
        };

        // Save to videos.json
        const videos = await readVideos();
        videos.push(videoMetadata);
        await writeVideos(videos);

        res.status(201).json({
            message: 'Video uploaded successfully',
            video: videoMetadata
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
});

// DELETE video - Admin only
router.delete('/:publicId', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { publicId } = req.params;

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

        // Remove from videos.json
        let videos = await readVideos();
        videos = videos.filter(video => video.public_id !== publicId);
        await writeVideos(videos);

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

export default router;
