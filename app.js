const express = require('express');
const app = express();
const studentController = require('./controllers/student');
const courseController = require('./controllers/course');

app.get('/students', studentController.getAllStudents);
app.get('/students/:id', studentController.getSingleStudent);
app.get('/courses', courseController.getAllCourses);
app.get('/courses/:id', courseController.getSingleCourse);

module.exports = app;
