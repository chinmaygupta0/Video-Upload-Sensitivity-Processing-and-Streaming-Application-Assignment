# 🎥 Video Upload, Sensitivity Processing & Streaming Platform

## 📌 Project Overview

This is a full-stack video management platform that allows users to upload videos, process them for content sensitivity, receive real-time processing updates, and securely stream processed videos.

The application is built using **Node.js, Express, MongoDB, React (Vite)** and leverages **Socket.io** for real-time updates and **FFmpeg** for video metadata extraction.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 🏢 Multi-Tenant Architecture (Organization-level isolation)
- 👥 Role-Based Access Control (Admin, Editor, Viewer)
- 📤 Video Upload with Validation
- ⚙️ Background Video Processing
- 📡 Real-Time Progress Updates (Socket.io)
- 🛡 Sensitivity Analysis (Safe / Flagged)
- 🎬 Secure Video Streaming (HTTP Range Requests)
- 🎨 Clean, Responsive Frontend UI

---

## 🧱 Tech Stack

### Backend
- Node.js (Latest LTS)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io
- Multer (File Uploads)
- FFmpeg (fluent-ffmpeg + ffmpeg-static)

### Frontend
- React (Vite)
- React Router
- Axios
- Socket.io Client
- CSS (No Tailwind)

---

## 🏗️ System Architecture


---

## 🔐 Authentication & Authorization

### Authentication
- JWT tokens are generated on login
- Tokens are stored in `localStorage`
- Tokens are sent via `Authorization: Bearer <token>`

### Role Permissions

| Role   | View Videos | Upload Videos | Stream |
|------|------------|---------------|--------|
| Admin | ✅ | ✅ | ✅ |
| Editor | ✅ | ✅ | ✅ |
| Viewer | ✅ | ❌ | ✅ |

---

## 🏢 Multi-Tenant Architecture

- Each user belongs to one organization
- Each video is linked to an organization
- API queries are filtered using `organizationId`
- Users cannot access data from other organizations

---

## 🔄 Video Processing Pipeline

1. Video upload with validation
2. Secure file storage (`uploads/{organizationId}/{userId}`)
3. Metadata extraction using FFmpeg
4. Sensitivity analysis (mock logic)
5. Real-time progress updates via Socket.io
6. Final classification (SAFE / FLAGGED)
7. Video becomes streamable

---

## 📡 Real-Time Updates

- Processing progress is sent via Socket.io events:
```js
{
  videoId,
  progress,
  status
}


backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── services/
│   ├── sockets/
│   └── utils/
├── uploads/
└── .env

frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx


PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


cd backend
npm install
npm run dev


cd frontend
npm install
npm run dev
