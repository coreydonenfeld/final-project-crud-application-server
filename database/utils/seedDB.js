/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models
const getRandomColors = require('./colors');  // Import a function to generate random colors

// Seed database
const seedDB = async () => {
    // Create a new campus
    const dummy_campus = await Campus.create({
        name: "Hunter College",
        address: "695 Park Ave, New York, NY 10065",
        description: "This is a school in New York, New York.",
        imageUrl: "https://s29068.pcdn.co/wp-content/uploads/hunter-campus.jpg",
    });
    // Create a new campus
    const dummy_campus2 = await Campus.create({
        name: "Queens College",
        address: "65-30 Kissena Blvd, Queens, NY 11367",
        description: "This is a school in Queens, New York.",
        imageUrl: "https://coursedog-images-public.s3.us-east-2.amazonaws.com/undefined/QNS01%20Clock-tower-image%20for%20catalog%20landing%20page.jpg"
    });
    // Create a new campus
    const dummy_campus3 = await Campus.create({
        name: "Brooklyn College",
        address: "2900 Bedford Ave, Brooklyn, NY 11210",
        description: "This is a school in Brooklyn, New York.",
        imageUrl: "https://www.brooklyn.cuny.edu/web/com_socialImages/BrooklynCollegeLibrary_1200x628.jpg",
    });

    const [background1, text1] = getRandomColors();
    const [background2, text2] = getRandomColors();

    // Create a new student for a campus
    const dummy_student = await Student.create({
        firstname: "Joe",
        lastname: "Smith",
        email: "joe.smith@example.com",
        gpa: 3.5,
        avatarColors: [background1, text1],
    });
    // Create a new student for a campus
    const dummy_student2 = await Student.create({
        firstname: "Mary",
        lastname: "Johnson",
        email: "mary.johnson@school.edu",
        gpa: 3.8,
        avatarColors: [background2, text2],
    });

    // Add students to campuses
    await dummy_student.setCampus(dummy_campus);
    await dummy_student2.setCampus(dummy_campus2);
}

// Export the database seeding function
module.exports = seedDB;