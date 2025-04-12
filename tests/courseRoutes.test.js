const request = require('supertest');
const app = require('../app');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

//mock DB
jest.mock('../data/database');

describe('Course Routes', () => {
  const fakeCourses = [
    { _id: new ObjectId(), title: 'Math' },
    { _id: new ObjectId(), title: 'Science' }
  ];

  beforeEach(() => {
    const mockDb = {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn()
    };

    mongodb.getDatabase.mockReturnValue(mockDb);
    mongodb.getDatabase().toArray.mockResolvedValue(fakeCourses);
  });

  it('GET /courses - should return all courses', async () => {
    const res = await request(app).get('/courses');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('title', 'Math');
  });

  it('GET /courses/:id - should return a course by ID', async () => {
    const courseId = fakeCourses[0]._id.toString();
    mongodb.getDatabase().toArray.mockResolvedValue([fakeCourses[0]]);

    const res = await request(app).get(`/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Math');
  });

  it('GET /courses/:id - should return 400 for invalid ID', async () => {
    const res = await request(app).get('/courses/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid Course ID format');
  });

  it('GET /courses/:id - should return 404 if not found', async () => {
    const notFoundId = new ObjectId().toString();
    mongodb.getDatabase().toArray.mockResolvedValue([]);

    const res = await request(app).get(`/courses/${notFoundId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Course not found');
  });
});
