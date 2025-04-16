const request = require('supertest');
const app = require('../app');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Mock DB
jest.mock('../data/database');

describe('Teacher Routes', () => {
  const fakeTeachers = [
    { _id: new ObjectId(), name: 'Alice' },
    { _id: new ObjectId(), name: 'Bob' }
  ];

  beforeEach(() => {
    const mockDb = {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn()
    };

    mongodb.getDatabase.mockReturnValue(mockDb);
    mongodb.getDatabase().toArray.mockResolvedValue(fakeTeachers);
  });

  it('GET /teachers - should return all teachers', async () => {
    const res = await request(app).get('/teachers');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('name', 'Alice');
  });

  it('GET /teachers/:id - should return a teacher by ID', async () => {
    const teacherId = fakeTeachers[0]._id.toString();
    mongodb.getDatabase().toArray.mockResolvedValue([fakeTeachers[0]]);

    const res = await request(app).get(`/teachers/${teacherId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Alice');
  });

  it('GET /teachers/:id - should return 400 for invalid ID format', async () => {
    const res = await request(app).get('/teachers/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid Teacher ID format');
  });

  it('GET /teachers/:id - should return 404 if teacher not found', async () => {
    const notFoundId = new ObjectId().toString();
    mongodb.getDatabase().toArray.mockResolvedValue([]);

    const res = await request(app).get(`/teachers/${notFoundId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Teacher not found');
  });
});
