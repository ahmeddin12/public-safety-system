Public Safety and Emergency System
This is a web-based application designed to improve public safety and emergency response coordination. It enables citizens to send emergency alerts with one click, facilitates real-time communication between responders, and provides detailed incident reporting and management.

Table of Contents
Project Overview

Features

Tech Stack

Installation

Clone the Repository

Backend Setup

Frontend Setup

Database Setup

API Documentation

Endpoints

Contributors

Project Overview
The Public Safety and Emergency System aims to connect citizens, law enforcement, and emergency responders through an efficient and reliable communication platform. It is designed to:

Allow one-click emergency alerts with real-time location data.

Enable real-time communication between responders and dispatchers.

Track and manage incidents from initial alert to resolution.

Generate detailed reports for incident analysis.

Features
One-Click Emergency Alert: Citizens can send emergency alerts with a single click, along with their location and message to the authorities.

Real-Time Communication: Law enforcement and emergency responders can communicate in real-time to coordinate responses.

Incident Tracking: Tracks incidents from the initial alert through resolution, providing updates on progress and resources.

Incident Reporting: After an incident, detailed reports are generated, including a timeline of actions taken and the resolution.

User Management: Admins can manage users, including responders, citizens, and authorities.

Commander Dashboard: Admins can assign tasks to responders based on availability and proximity to the incident.

Tech Stack
Frontend: React.js

Backend: Node.js with Express.js

Database: PostgreSQL

Authentication: JWT (JSON Web Tokens) for user authentication

Real-Time Communication: Socket.io for live communication

Environment Variables: dotenv for managing sensitive information

Deployment: Docker (optional for production)

Installation
To run the project locally, follow these steps:

1. Clone the Repository
   bash
   Copy
   Edit
   git clone https://github.com/your-username/public-safety-system.git
   cd public-safety-system
2. Backend Setup
   Navigate to the backend/ directory:

bash
Copy
Edit
cd backend
Install backend dependencies:

bash
Copy
Edit
npm install
Set up your PostgreSQL database (refer to the Database Setup section below).

Run the backend server:

bash
Copy
Edit
npm run dev
The backend will be running on http://localhost:5000.

3. Frontend Setup
   Navigate to the frontend/ directory:

bash
Copy
Edit
cd frontend
Install frontend dependencies:

bash
Copy
Edit
npm install
Run the frontend development server:

bash
Copy
Edit
npm start
The frontend will be running on http://localhost:3000.

4. Database Setup
   Install and configure PostgreSQL.

Create a database called public_safety (or use the name provided in the environment variables).

Update the .env file with the correct database URL in both backend and frontend environments.

Example .env for Backend:

plaintext
Copy
Edit
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/public_safety
API Documentation
The following endpoints are available for interaction between the frontend and backend.

Endpoints
POST /api/alerts

Create a new emergency alert.

Body:

json
Copy
Edit
{
"alertType": "fire",
"location": "latitude, longitude",
"message": "Help needed!"
}
Response:

json
Copy
Edit
{
"success": true,
"message": "Alert sent successfully"
}
GET /api/incidents

Fetch all incidents.

Response:

json
Copy
Edit
[
{
"id": 1,
"status": "open",
"type": "fire",
"location": "latitude, longitude",
"time": "2025-04-02T12:00:00Z"
}
]
POST /api/incident/:id/assign

Assign an officer or responder to an incident.

Parameters: id (incident ID), responderId

Response:

json
Copy
Edit
{
"success": true,
"message": "Responder assigned"
}
GET /api/report

Fetch detailed incident report.

Response:

json
Copy
Edit
{
"incidentId": 1,
"actions": [
{
"time": "2025-04-02T12:05:00Z",
"action": "Responder dispatched"
}
]
}
