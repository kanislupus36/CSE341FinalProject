const request = require('supertest');
const app = require('../app');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Mock DB
jest.mock('../data/database');

describe('Student Routes', () => {
  const fakeStudents = [
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
    mongodb.getDatabase().toArray.mockResolvedValue(fakeStudents);
  });

  it('GET /students - should return all students', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('name', 'Alice');
  });

  it('GET /students/:id - should return a student by ID', async () => {
    const studentId = fakeStudents[0]._id.toString();
    mongodb.getDatabase().toArray.mockResolvedValue([fakeStudents[0]]);

    const res = await request(app).get(`/students/${studentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Alice');
  });

  it('GET /students/:id - should return 400 for invalid ID format', async () => {
    const res = await request(app).get('/students/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid Student ID format');
  });

  it('GET /students/:id - should return 404 if student not found', async () => {
    const notFoundId = new ObjectId().toString();
    mongodb.getDatabase().toArray.mockResolvedValue([]);

    const res = await request(app).get(`/students/${notFoundId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Student not found');
  });
});
