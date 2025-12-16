📌 Project Setup Guide
This guide explains how to install and run both the frontend (React) and backend (Node.js + MySQL) for this application.
🚀 How to Run This Application

# Open your terminal

Navigate to the project root folder:
cd your-project-folder

# Install Frontend Dependencies

Go to the frontend directory:
cd frontend
Install all required packages:
npm install
Start the React development server:
npm start

# Install Backend Dependencies

Open a second terminal window
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Because Nodemon is installed, the backend will automatically restart when server files change.

# Run the Backend Server

In the backend folder:
npm run dev
You should see:
Server running on port xxxx
MySQL connected
🛠️ Setting Up the Backend in Your Own Project
If you want to recreate this backend from scratch:

1. Create backend folder
   mkdir backend
   cd backend
2. Initialize Node project
   npm init -y
   This generates a package.json.
3. Replace contents of package.json
   Use the example provided in this project.
4. Install backend dependencies
   npm install
5. Create essential files
   server.js
   /routes folder
   /controllers
   /models for Sequelize tables
   .env for MySQL credentials
   Copy the structure and content exactly as shown in this project.
   ⚠️ Important Notes
   Backend setup takes time, and you may run into errors — that’s normal.
   Follow the steps in the same order as shown in the tutorial.
   Make sure your MySQL database and credentials are correctly set in your .env file.
