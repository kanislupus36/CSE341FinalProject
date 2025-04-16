const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Utility function to validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

const getAllMajors = async (req, res) => {
  //#swagger.tags=['Major']
  try {
    const result = await mongodb.getDatabase().db('FinalProject').collection('major').find();
    const courses = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Majors', details: err.message });
  }
};

const getSingleMajor = async (req, res) => {
  //#swagger.tags=['Major']
  try {
    const majorId = req.params.id;
    if (!isValidObjectId(majorId)) {
      return res.status(400).json({ error: 'Invalid Major ID format' });
    }

    const result = await mongodb.getDatabase().db('FinalProject').collection('major').find({ _id: new ObjectId(majorId) });
    const majors = await result.toArray();
    if (majors.length === 0) {
      return res.status(404).json({ error: 'Major not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(majors[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the Major', details: err.message });
  }
};

const createMajor = async (req, res) => {
  //#swagger.tags=['Major']
    try {
      const { title, creditHours, program } = req.body;
  
      // Input validation
      if (!title || !creditHours || !program) {
        return res.status(400).json({ error: 'Missing required fields: title, creditHours, program' });
      }
  
      const major = { title, creditHours, program };
      const response = await mongodb.getDatabase().db('FinalProject').collection('major').insertOne(major);
  
      if (response.acknowledged) {
        res.status(201).json({ message: 'Major created successfully' });
      } else {
        res.status(500).json({ error: 'Some error occurred while creating the Major' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to create Major', details: err.message });
    }
  };

  const updateMajor = async (req, res) => {
    //#swagger.tags=['Major']
    try {
      const majorId = req.params.id;
      if (!isValidObjectId(majorId)) {
        return res.status(400).json({ error: 'Invalid Major ID format' });
      }
  
      const { title, creditHours, program } = req.body;
  
      // Input validation
      if (!title || !creditHours || !program) {
        return res.status(400).json({ error: 'Missing required fields: title, creditHours, program' });
      }
  
      const major = { title, creditHours, program };
      const response = await mongodb.getDatabase().db('FinalProject').collection('major').replaceOne({ _id: new ObjectId(majorId) }, major);
  
      if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Major updated successfully' });
      } else {
        res.status(404).json({ error: 'Major not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to update Major', details: err.message });
    }
  };

  const deleteMajor = async (req, res) => {
    //#swagger.tags=['Major']
    try {
      const majorId = req.params.id;
      if (!isValidObjectId(majorId)) {
        return res.status(400).json({ error: 'Invalid Major ID format' });
      }
  
      const response = await mongodb.getDatabase().db('FinalProject').collection('major').deleteOne({ _id: new ObjectId(majorId) });
  
      if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Major deleted successfully' });
      } else {
        res.status(404).json({ error: 'Major not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Major', details: err.message });
    }
  };

  module.exports =  {
    getAllMajors,
    getSingleMajor,
    createMajor,
    updateMajor,
    deleteMajor
  }