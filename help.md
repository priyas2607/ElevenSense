# 🚀 ElevenSense – Developer Setup Guide

Welcome to the ElevenSense developer environment!  
This guide explains how to run **frontend**, **backend**, **database**, and **optional Redis OTP system** locally.

---

## 📦 Requirements

Make sure the following are installed on your system:

- **Node.js 18+**
- **npm** (or yarn)
- **MongoDB** (local or Atlas cloud)
- **Redis** (optional — required only for OTP feature)
- **Git**

---

## 📂 Project Structure

```
ElevenSense/
 ├── frontend/
 ├── backend/
 │    ├── models/
 │    ├── routes/
 │    ├── seed.js
 │    ├── server.js
 │    └── .env
 └── README.md
```

---

## 🔧 1. Clone the Repository

```sh
git clone <repo-url>
cd ElevenSense
```

---

## 🔐 2. Backend Environment Setup

Create `.env` inside the **backend/** folder:

```
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5174
PORT=5000
```

If you are using OTP:

```
REDIS_URL=redis://localhost:6379
```

---

## 📥 3. Install Dependencies

### Backend:

```sh
cd backend
npm install
```

### Frontend:

```sh
cd ../frontend
npm install
```

---

## 🗄️ 4. Start MongoDB

### If using **local MongoDB**:

```sh
mongod
```

### If using **MongoDB Atlas**  
No local service required — just ensure your `MONGO_URI` is correct.

---

## ♻️ Optional: Start Redis (for OTP System)

```sh
redis-server
```
node server.js is enough

If Redis is *not* running, OTP routes will fail gracefully.

---

## 🌱 5. Seed Initial Feed Data (run once)

Inside **backend/**:

```sh
node seed.js
```

This populates MongoDB with sample feed posts used in the Feed page.

---

## ▶️ 6. Run the Backend Server

Inside the **backend** folder:

```sh
node server.js
```

Expected output:

```
Backend running on http://localhost:5000
MongoDB connected
Redis connected (or Redis error if not running)
```

---

## 🖥️ 7. Run the Frontend Application

Open a new terminal:

```sh
cd frontend
npm run dev
```

Your app will run at:

```
http://localhost:5174
```

---

## 🎯 Project Endpoints

| Service | URL |
|--------|-----|
| **Frontend** | http://localhost:5174 |
| **Backend API** | http://localhost:5000 |
| **Feed API** | http://localhost:5000/api/feed |
| **Auth API** | http://localhost:5000/api/auth/... |

You may also test feed directly from browser:

```
http://localhost:5000/api/feed
```

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS error** | Ensure `CLIENT_ORIGIN` matches the frontend port |
| **Invalid Hook Call** | Hooks must be inside component functions (e.g. Feed.jsx) |
| **MongoDB connection error** | Check your `MONGO_URI` & network access |
| **Redis connection refused** | Start Redis server or disable OTP routes |
| **API returning empty feed** | Ensure `node seed.js` was run successfully |
| **"Module not found" errors** | Verify correct file paths, especially import casing |

---

## 📘 Developer Notes

- Always start backend **before** frontend.
- Restart backend after modifying models or routes.
- Use **MongoDB Compass** or **Atlas UI** to visualize database.
- Use VS Code search to find imports or resolve errors quickly.

---

## 🤝 Contributing

If you are adding new pages, API routes, or database models:
- Follow project conventions.
- Add schema definitions under `backend/models`.
- Register new API routes in `server.js`.
- Keep components modular in `frontend`.

---

Need help? Ping the team!  
Happy building 🚀
