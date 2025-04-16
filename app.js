const express = require('express');
const app = express();
const studentController = require('./controllers/student');
const courseController = require('./controllers/course');
const teacherController = require('./controllers/teacher');
const majorController = require('./controllers/major');

app.get('/students', studentController.getAllStudents);
app.get('/students/:id', studentController.getSingleStudent);
app.get('/courses', courseController.getAllCourses);
app.get('/courses/:id', courseController.getSingleCourse);
app.get('/teachers', teacherController.getAllTeachers);
app.get('/teachers/:id', teacherController.getSingleTeacher);
app.get('/majors', majorController.getAllMajors);
app.get('/majors/:id', majorController.getSingleMajor);

module.exports = app;
