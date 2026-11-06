const request = require('supertest');
const app = require('../src/app');

describe('SpendWise Unit Tests', () => {
  it('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});

