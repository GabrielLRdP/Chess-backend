## ♟️ Chess Backend

This is the backend API for the [Online Chess Game](https://github.com/GabrielLRdP/chess-frontend), built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It handles **authentication**, **real-time multiplayer communication**, and **persistent game/session data**.

---

## 🚀 Features

- 🔐 User authentication via **JWT** (pseudo + password)
- ♻️ Stateless auth: JWT is stored in **sessionStorage** and sent via HTTP headers
- ⚡ Real-time game management with **Socket.IO**
- 🧠 No chess logic handled here – purely infrastructure (auth, sockets, DB)
- ☁️ MongoDB database for users and session-related data

---

## 🧩 Tech Stack

- **Node.js** + **Express**
- **Socket.IO** for real-time communication
- **MongoDB** with **Mongoose**
- **JWT** for stateless authentication
- **CORS**, **Helmet**, and Express middlewares for enhanced security

---

## 📦 Socket.IO Events

| Event Name          | Description                              |
|---------------------|----------------------------------------|
| `join-users-room`   | Join a game room (identified by user IDs) |
| `send-invitation`   | Send a game invitation to another user  |
| `respond-invitation`| Accept or decline a game invitation     |
| `make-move`         | Emit a chess move during a game         |

> ⚠️ Disconnected players are not currently handled – this is a planned improvement.

---

## 📁 MongoDB Collections

- `users`: stores registered users (pseudo + hashed password)
- `games` *(optional)*: you can mention this if you persist game data – otherwise omit

---

## 🔐 Authentication

- Auth flow is based on **pseudo/password**
- JWT is issued on login and stored on the **client’s sessionStorage**
- Protected routes require the token in the `Authorization` header:  
  `Authorization: Bearer <token>`

> No roles or permissions yet – all users have the same level of access.

---

## 🛠️ Getting Started

```bash
git clone https://github.com/yourusername/chess-backend.git
cd chess-backend
npm install
```

Create a .env file at the root of the project:

```bash
PORT=3000
ACCESS_TOKEN_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/chess
```
Then run the development server:

```bash
npm run dev
```

## 📌 Roadmap

 - Handle player disconnection gracefully

 - Add refresh tokens

 - Add game history persistence
