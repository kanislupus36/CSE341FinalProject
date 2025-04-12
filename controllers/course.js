const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Utility function to validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

const getAllCourses = async (req, res) => {
  //#swagger.tags=['Course']
  try {
    const result = await mongodb.getDatabase().db('FinalProject').collection('course').find();
    const courses = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Courses', details: err.message });
  }
};

const getSingleCourse = async (req, res) => {
  //#swagger.tags=['Course']
  try {
    const courseId = req.params.id;
    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ error: 'Invalid Course ID format' });
    }

    const result = await mongodb.getDatabase().db('FinalProject').collection('course').find({ _id: new ObjectId(courseId) });
    const courses = await result.toArray();
    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the Course', details: err.message });
  }
};

const createCourse = async (req, res) => {
  //#swagger.tags=['Course']
    try {
      const { title, courseID, credits, location } = req.body;
  
      // Input validation
      if (!title || !courseID || !credits || !location) {
        return res.status(400).json({ error: 'Missing required fields: title, courseID, credits, location' });
      }
  
      const course = { title, courseID, credits, location };
      const response = await mongodb.getDatabase().db('FinalProject').collection('course').insertOne(course);
  
      if (response.acknowledged) {
        res.status(201).json({ message: 'Course created successfully' });
      } else {
        res.status(500).json({ error: 'Some error occurred while creating the Course' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to create Course', details: err.message });
    }
  };

  const updateCourse = async (req, res) => {
    //#swagger.tags=['Course']
    try {
      const courseId = req.params.id;
      if (!isValidObjectId(courseId)) {
        return res.status(400).json({ error: 'Invalid Course ID format' });
      }
  
      const { title, courseID, credits, location } = req.body;
  
      // Input validation
      if (!title || !courseID || !credits || !location) {
        return res.status(400).json({ error: 'Missing required fields: title, courseID, credits, location' });
      }
  
      const course = { title, courseID, credits, location };
      const response = await mongodb.getDatabase().db('FinalProject').collection('course').replaceOne({ _id: new ObjectId(courseId) }, course);
  
      if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Course updated successfully' });
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to update Course', details: err.message });
    }
  };

  const deleteCourse = async (req, res) => {
    //#swagger.tags=['Course']
    try {
      const courseId = req.params.id;
      if (!isValidObjectId(courseId)) {
        return res.status(400).json({ error: 'Invalid Course ID format' });
      }
  
      const response = await mongodb.getDatabase().db('FinalProject').collection('course').deleteOne({ _id: new ObjectId(courseId) });
  
      if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Course deleted successfully' });
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Course', details: err.message });
    }
  };

  module.exports =  {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
  }