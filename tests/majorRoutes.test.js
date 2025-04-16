const request = require('supertest');
const app = require('../app');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Mock DB
jest.mock('../data/database');

describe('Major Routes', () => {
  const fakeMajors = [
    { _id: new ObjectId(), name: 'Math' },
    { _id: new ObjectId(), name: 'English' }
  ];

  beforeEach(() => {
    const mockDb = {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn()
    };

    mongodb.getDatabase.mockReturnValue(mockDb);
    mongodb.getDatabase().toArray.mockResolvedValue(fakeMajors);
  });

  it('GET /majors - should return all majors', async () => {
    const res = await request(app).get('/majors');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('name', 'Math');
  });

  it('GET /majors/:id - should return a major by ID', async () => {
    const majorId = fakeMajors[0]._id.toString();
    mongodb.getDatabase().toArray.mockResolvedValue([fakeMajors[0]]);

    const res = await request(app).get(`/majors/${majorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Math');
  });

  it('GET /majors/:id - should return 400 for invalid ID format', async () => {
    const res = await request(app).get('/majors/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid Major ID format');
  });

  it('GET /majors/:id - should return 404 if major not found', async () => {
    const notFoundId = new ObjectId().toString();
    mongodb.getDatabase().toArray.mockResolvedValue([]);

    const res = await request(app).get(`/majors/${notFoundId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Major not found');
  });
});
