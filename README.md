# MERN Stack Campus Numérique Project - README

This repository contains a MERN (MongoDB, Express, React, Node.js) stack project
with separate directories for the backend and frontend. This README file will guide
you through the installation process and provide instructions on how to connect the
database in the backend directory.

### **Prerequisites:**

Before you begin, make sure you have the following installed on your machine:

Node.js (version 12 or above)
MongoDB (running instance)

### **Installation:**

Clone the repository:
git clone <repository_url>

Navigate to the backend directory:
cd backend

Install the dependencies:
npm install

Create a .env file in the backend directory and add the following content:
DB_CONNECTION=<your_mongodb_connection_string>

Replace <your_mongodb_connection_string> with your actual MongoDB connection
string. Make sure it includes the necessary authentication credentials and points
to the correct MongoDB instance.

Save the .env file.

Return to the project's root directory:
cd ..

Navigate to the frontend directory:
cd frontend

Install the dependencies:
npm install

### **Installation:**

To run the project, follow these steps:

Start the backend server:
cd backend
npm start
The backend server will run on http://localhost:5000.

Start the frontend development server:
cd frontend
npm start
The frontend development server will run on http://localhost:3000.

Open your web browser and visit http://localhost:3000 to access the application.

### **Acknowledgments:**

This project was created using the MERN stack, a combination of MongoDB, Express.
js, React, and Node.js. We would like to express our gratitude to the open-source
community for providing these amazing tools and frameworks.

This work presents a webapplication developed with the aim of providing access to
online learning for all students. The introduction discusses the theme of online
learning and emphasizes the importance of providing an accessible and inclusive
platform.

The working methodology adopted for this project is based on the MERN (MongoDB,
Express.js, React.js, and Node.js) and Flutter technology stack. This approach
enabled the development of a robust web and mobile application, offering a
user-friendly interface and advanced online learning features. The project results
highlight the successful achievement of the main objective, which was to create an
online learning platform accessible to all students. Key features such as course
management, grade management for teachers, and module management have been
successfully implemented, providing an enriching learning experience.
