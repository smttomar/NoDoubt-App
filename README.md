# 🚀 Full Stack Web Application (Internship Task)

## 📌 Overview

This project is a full-stack web application built using **React, Node.js, Express, MongoDB, and WebSocket**.

The application:

- Fetches posts from an external API
- Stores them in MongoDB
- Displays them on the frontend
- Provides **real-time search using WebSocket**

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas

### Real-Time

- WebSocket (`ws`)

### Deployment

- Frontend: Vercel
- Backend + WebSocket: Render

---

## ⚙️ Features

- ✅ Fetch posts from external API
- ✅ Store posts in MongoDB
- ✅ Display all posts on frontend
- ✅ Real-time search using WebSocket
- ✅ Debounced search (optimized performance)
- ✅ Loading and empty state handling
- ✅ Clean and responsive UI (Tailwind CSS)

---

## 🔗 API Endpoints

### 1. Fetch & Store Posts

GET `/api/fetch-posts`
Fetches posts from JSONPlaceholder and stores in MongoDB.

### 2. Get All Posts

GET `/api/posts`
Returns all stored posts.

### 3. Get Single Post

GET `/api/posts/:id`
Returns a single post by MongoDB `_id`.

---

## ⚡ WebSocket

- Endpoint: `wss://nodoubt-app.onrender.com`
- Used for real-time search

### How it works:

1. Client sends search query
2. Server filters posts from MongoDB
3. Sends matching results instantly

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── websocket/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
MONGO_URI=your_mongodb_connection
PORT=10000
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=https://your-backend-url
VITE_WS_URL=wss://your-backend-url
```

---

## ▶️ How to Run Locally

### 1. Clone Repository

```
git clone <your-repo-link>
cd project-root
```

---

### 2. Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🌍 Live Demo

- 🔗 Frontend: https://no-doubt-app.vercel.app/
- 🔗 Backend: https://nodoubt-app.onrender.com

---

## ⚠️ Notes

- Render free tier may sleep after inactivity
- First request may take some time
- WebSocket works on same backend server

---

## 🎯 Conclusion

This project demonstrates:

- Full-stack development
- REST API integration
- Database handling
- Real-time communication using WebSocket
- Deployment on cloud platforms

---

## 🙌 Thank You
