const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Utility function to validate ObjectId
//const isValidObjectId = (id) => ObjectId.isValid(id);

const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db('FinalProject').collection('student').find();
    const students = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Students', details: err.message });
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    // if (!isValidObjectId(studentId)) {
    //   return res.status(400).json({ error: 'Invalid Student ID format' });
    // }

    const result = await mongodb.getDatabase().db('FinalProject').collection('student').find({ _id: new ObjectId(studentId) });
    const students = await result.toArray();
    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the Student', details: err.message });
  }
};

const createStudent = async (req, res) => {
    try {
      const { firstName, lastName, email, birthday, studentID, gradDate } = req.body;
  
    //   // Input validation
    //   if (!firstName || !lastName || !email || !birthday || !studentID || !gradDate) {
    //     return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email, birthday, studentID, gradDate' });
    //   }
  
      const student = { firstName, lastName, email, birthday, studentID, gradDate };
      const response = await mongodb.getDatabase().db('FinalProject').collection('student').insertOne(student);
  
      if (response.acknowledged) {
        res.status(201).json({ message: 'Student created successfully' });
      } else {
        res.status(500).json({ error: 'Some error occurred while creating the Student' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to create Student', details: err.message });
    }
  };

  const updateStudent = async (req, res) => {
    try {
      const studentId = req.params.id;
    //   if (!isValidObjectId(studentId)) {
    //     return res.status(400).json({ error: 'Invalid Student ID format' });
    //   }
  
      const { firstName, lastName, email, birthday, studentID, gradDate } = req.body;
  
    //   // Input validation
    //   if (!firstName || !lastName || !email || !birthday || !studentID || !gradDate) {
    //     return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email, birthday, studentID, gradDate' });
    //   }
  
      const student = { firstName, lastName, email, birthday, studentID, gradDate };
      const response = await mongodb.getDatabase().db('FinalProject').collection('student').replaceOne({ _id: new ObjectId(studentId) }, student);
  
      if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Student updated successfully' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to update Student', details: err.message });
    }
  };

  const deleteStudent = async (req, res) => {
    try {
      const studentId = req.params.id;
    //   if (!isValidObjectId(studentId)) {
    //     return res.status(400).json({ error: 'Invalid Student ID format' });
    //   }
  
      const response = await mongodb.getDatabase().db('FinalProject').collection('student').deleteOne({ _id: new ObjectId(studentId) });
  
      if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Student deleted successfully' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Student', details: err.message });
    }
  };

  module.exports =  {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
  }