import path from 'path';
import fs from 'fs';
import request from 'supertest';
import express from 'express';
import { upload } from '../../middleware/verify.middleware';

const app = express();
const uploadRoute = '/upload-test';

// Setup route using multer middleware
app.post(
  uploadRoute,
  upload.single('file'),
  (req: express.Request, res: express.Response): void => {
    if (req.file) {
      res.status(200).json({ filename: req.file.filename });
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  },
);

describe('upload middleware', () => {
  const uploadDir = path.join(__dirname, '../../../../uploads');

  beforeAll(() => {
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  });

  afterAll(() => {
    // Cleanup uploaded files (optional in CI)
    const files = fs.readdirSync(uploadDir);
    for (const file of files) {
      fs.unlinkSync(path.join(uploadDir, file));
    }
  });

  it('should upload a file successfully', async () => {
    const res = await request(app)
      .post(uploadRoute)
      .attach('file', Buffer.from('dummy content'), 'test.txt');

    expect(res.status).toBe(200);
    expect(res.body.filename).toMatch(/test\.txt$/);
  });

  it('should reject request without a file', async () => {
    const res = await request(app).post(uploadRoute);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('No file uploaded');
  });

  it('should reject large files >5MB', async () => {
    const bigBuffer = Buffer.alloc(6 * 1024 * 1024); // 6 MB
    const res = await request(app)
      .post(uploadRoute)
      .attach('file', bigBuffer, 'largefile.txt');

    expect(res.status).toBe(500); // multer throws an error
    expect(res.text).toMatch(/File too large/);
  });
});
