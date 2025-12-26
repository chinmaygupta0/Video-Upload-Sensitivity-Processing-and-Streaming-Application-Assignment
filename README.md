# 🎥 Video Upload, Sensitivity Processing & Streaming Platform

---

## 📌 Project Overview
This project is a full-stack video management platform that enables users to upload videos, process them for content sensitivity, receive real-time processing updates, and securely stream processed videos.
The application is built using Node.js, Express, MongoDB, React (Vite) and leverages Socket.io for real-time communication and FFmpeg for video metadata extraction.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 🏢 Multi-Tenant Architecture (Organization-level isolation)
- 👥 Role-Based Access Control (Admin, Editor, Viewer)
- 📤 Video Upload with File Validation
- ⚙️ Background Video Processing
- 📡 Real-Time Processing Progress (Socket.io)
- 🛡 Sensitivity Analysis (Safe / Flagged)
- 🎬 Secure Video Streaming (HTTP Range Requests)
- 🎨 Clean, Responsive Frontend UI

---

## 🧱 Tech Stack


## Backend

- Node.js (Latest LTS)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io
- Multer (File Uploads)
- FFmpeg (fluent-ffmpeg + ffmpeg-static)



## Frontend

- React (Vite)
- React Router
- Axios
- Socket.io Client
- CSS 

---

## 🏗️ System Architecture
- Frontend (React)
- REST APIs + JWT
- Backend (Express)
- MongoDB (Multi-Tenant)
- Video Processing (FFmpeg)
- Real-Time Updates (Socket.io)
  
---

## 🔐 Authentication & Authorization

## Authentication

- JWT tokens are generated during login
- Tokens are stored in localStorage
- Tokens are sent with every request using:

 ## Authorization
 
- Role-Based Access Control (RBAC)
- Role - View Upload Stream
- Admin✅✅✅  Editor✅✅✅  Viewer✅❌✅

---

## 🏢 Multi-Tenant Architecture

- Each user belongs to one organization
- Each video is associated with an organizationId
- All database queries are filtered using organizationId
- Users cannot access videos from other organizations

---

## 📡 Real-Time Progress Updates
- The backend emits live updates during video processing using Socket.io.
- videoId → Unique video identifier
- progress → Processing percentage (0–100)
- status → PROCESSING | SAFE | FLAGGED

---

## 🔌 API Endpoints
- Authentication 

  POST /api/auth/register <br />
  
  POST /api/auth/login <br />

- Video 

  POST /api/videos/upload <br />
  
  GET /api/videos <br />
  
  GET /api/videos/:id <br />
  
  GET /api/videos/:id/stream <br />
  

---

## ⚙️ Environment Variables Setup
- Create a .env file inside the backend directory:
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key

---

## ▶️ Running the Project Locally

## Backend Setup

- cd backend
- npm install
- npm run dev
- Backend runs at: http://localhost:5000


## Frontend Setup

- cd frontend
- npm install
- npm run dev
- Frontend runs at: http://localhost:5173

---

## 🌐 Local Development URLs

- URL Frontend http://localhost:5173
- URL Backend http://localhost:5000

---

## 🎯 User Workflow

- User registers or logs in
- Redirected to dashboard
- Uploads a video
- Sees real-time processing progress
- Video marked SAFE or FLAGGED
- Streams video securely

---

## 🧠 Design Decisions & Assumptions

- Sensitivity analysis uses mock logic (easily extendable)
- FFmpeg used for metadata extraction only
- JWT chosen for scalable authentication
- Socket.io used for real-time communication

---

## 🏁 Conclusion
This project demonstrates:

- Secure full-stack development
- Real-time event-driven systems
- Multi-tenant SaaS architecture
- Clean and maintainable codebase
