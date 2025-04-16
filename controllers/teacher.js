const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Utility function to validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

const getAllTeachers = async (req, res) => {
  //#swagger.tags=['Teacher']
  try {
    const result = await mongodb.getDatabase().db('FinalProject').collection('teacher').find();
    const students = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Teachers', details: err.message });
  }
};

const getSingleTeacher = async (req, res) => {
  //#swagger.tags=['Teacher']
  try {
    const teacherId = req.params.id;
    if (!isValidObjectId(teacherId)) {
      return res.status(400).json({ error: 'Invalid Teacher ID format' });
    }

    const result = await mongodb.getDatabase().db('FinalProject').collection('teacher').find({ _id: new ObjectId(teacherId) });
    const teachers = await result.toArray();
    if (teachers.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(teachers[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the Teacher', details: err.message });
  }
};

const createTeacher = async (req, res) => {
  //#swagger.tags=['Teacher']
    try {
      const { firstName, lastName, email, birthday, teachID, subject } = req.body;
  
      // Input validation
      if (!firstName || !lastName || !email || !birthday || !teachID || !subject) {
        return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email, birthday, teachID, subject' });
      }
  
      const teacher = { firstName, lastName, email, birthday, teachID, subject };
      const response = await mongodb.getDatabase().db('FinalProject').collection('teacher').insertOne(teacher);
  
      if (response.acknowledged) {
        res.status(201).json({ message: 'Teacher created successfully' });
      } else {
        res.status(500).json({ error: 'Some error occurred while creating the Teacher' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to create Teacher', details: err.message });
    }
  };

  const updateTeacher = async (req, res) => {
    //#swagger.tags=['Teacher']
    try {
      const teacherId = req.params.id;
      if (!isValidObjectId(teacherId)) {
        return res.status(400).json({ error: 'Invalid Teacher ID format' });
      }
  
      const { firstName, lastName, email, birthday, teachID, subject } = req.body;
  
      // Input validation
      if (!firstName || !lastName || !email || !birthday || !teachID || !subject) {
        return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email, birthday, teachID, subject' });
      }
  
      const teacher = { firstName, lastName, email, birthday, teachID, subject };
      const response = await mongodb.getDatabase().db('FinalProject').collection('teacher').replaceOne({ _id: new ObjectId(teacherId) }, teacher);
  
      if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Teacher updated successfully' });
      } else {
        res.status(404).json({ error: 'Teacher not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to update Teacher', details: err.message });
    }
  };

  const deleteTeacher = async (req, res) => {
    //#swagger.tags=['Teacher']
    try {
      const teacherId = req.params.id;
      if (!isValidObjectId(teacherId)) {
        return res.status(400).json({ error: 'Invalid Teacher ID format' });
      }
  
      const response = await mongodb.getDatabase().db('FinalProject').collection('teacher').deleteOne({ _id: new ObjectId(teacherId) });
  
      if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Teacher deleted successfully' });
      } else {
        res.status(404).json({ error: 'Teacher not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Teacher', details: err.message });
    }
  };

  module.exports =  {
    getAllTeachers,
    getSingleTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
  }