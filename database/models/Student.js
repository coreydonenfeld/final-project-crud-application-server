/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    imageUrl: {
        type: Sequelize.TEXT,
    },

    gpa: {
        type: Sequelize.DECIMAL(10, 1),
        validate: {
            min: 0.0,
            max: 4.0
        },
    },

    avatarColors: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ["#000000", "#000000"],
    },
});

// Export the student model
module.exports = Student;