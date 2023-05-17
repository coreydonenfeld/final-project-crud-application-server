/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/

/**
 * Express router providing students-related routes.
 * @module routers/users
 * @requires express
 */

/**
 * Express module.
 * @const
 */
const express = require('express');

/**
 * Express router to mount students related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Database models.
 * @const
 */
const { Student, Campus } = require('../database/models');

/**
 * Middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code).
 * @const
 */
const asyncHandler = require('express-async-handler');

/* GET ALL STUDENTS: async/await using express-async-handler (asyncHandler) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', asyncHandler(async (req, res) => {
    let students = await Student.findAll({ include: [Campus] });
    res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */

// if not found, it will return null

router.get('/:id', asyncHandler(async (req, res) => {
    console.log('Get student:', req.params.id);
    // Find student by Primary Key
    let student = await Student.findByPk(req.params.id, { include: [Campus] });  // Get the student and its associated campus
    res.status(200).json(student);  // Status code 200 OK - request succeeded
}));

/* ADD NEW STUDENT */
router.post('/', function (req, res, next) {
    Student.create(req.body)
        .then(createdStudent => res.status(200).json(createdStudent))
        .catch(err => next(err));
});

/* DELETE STUDENT */
router.delete('/:id', function (req, res, next) {
    Student.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json("Deleted a student!"))
        .catch(err => next(err));
});

/* EDIT STUDENT */
router.put('/:id', asyncHandler(async (req, res) => {
    await Student.update(req.body,
        { where: { id: req.params.id } }
    );
    // Find student by Primary Key
    let student = await Student.findByPk(req.params.id);
    res.status(201).json(student);  // Status code 201 Created - successful creation of a resource
}));

// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;