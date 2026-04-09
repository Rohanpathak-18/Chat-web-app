# 💬 Chatty - Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack with Socket.IO for instant communication.

---

## 🚀 Features

- 🔐 User Authentication (Signup / Login / Logout)
- 🟢 Real-time Online User Status
- 💬 Instant Messaging with Socket.IO
- 🖼️ Image Sharing in Chat
- 👤 User Profile Management
- 🌙 Clean and Responsive UI
- 🔄 Persistent Sessions (JWT + Cookies)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Zustand (State Management)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 Socket.IO Implementation

- Real-time messaging using WebSockets
- Online users tracked via socket connections
- Events:
  - `sendMessage`
  - `receiveMessage`
  - `userConnected`
  - `userDisconnected`

---

## 🧠 Learnings

- Implementing real-time systems with Socket.IO
- Managing global state using Zustand
- Handling authentication & protected routes
- Designing scalable REST APIs

---

## 🙏 Acknowledgements

Special thanks to Chetan Majumdar (chetanthecoder) for guidance and support.

---

## 📬 Contact

- LinkedIn: https://linkedin.com/in/your-profile
- GitHub: https://github.com/your-username

---

## ⭐ Show Your Support

If you like this project, please ⭐ the repo!
