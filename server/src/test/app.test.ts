import request from 'supertest';
import app from '../app';

describe('App Endpoints', () => {
  it('should return 200 on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('my server');
  });

  it('should return 404 on non-existing route', async () => {
    const res = await request(app).get('/non-existing');
    expect(res.statusCode).toBe(404);
  });
});
