# 💬 ChatSphere

> A modern real-time chat application built with the **MERN Stack** that enables users to connect instantly through secure authentication and live messaging.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

# 📖 Overview

ChatSphere is a full-stack real-time chat application built using the **MERN Stack** and **Socket.IO**. It allows users to securely register, log in, chat instantly, see online users, and enjoy a responsive messaging experience.

The application uses JWT authentication, Socket.IO for real-time communication, and MongoDB for storing user and chat data.

---

# ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 💬 Real-Time Messaging
- 🟢 Online/Offline User Status
- 📸 Profile Picture Upload
- 🔍 Search Users
- 📱 Fully Responsive UI
- 🌙 Modern Clean Interface
- 🔒 Protected Routes
- 🚀 Fast & Scalable Backend

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Zustand
- Axios
- React Router DOM
- React Hot Toast
- Lucide React

## Backend
- Node.js
- Express.js
- Socket.IO

## Database
- MongoDB
- Mongoose

## Authentication
- JWT
- bcrypt

## Tools
- Git
- GitHub
- Postman
- Cloudinary (for image uploads)
- dotenv

---

# 📂 Project Structure

```text
ChatSphere/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── socket/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Rohanpathak-18/ChatSphere.git
```

## Move into Project

```bash
cd ChatSphere
```

## Install Backend Dependencies

```bash
cd backend
npm install
```

## Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Run the Application

## Backend

```bash
cd backend
npm run dev
```

## Frontend

```bash
cd frontend
npm run dev
```

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |
| POST | /api/auth/logout | Logout User |
| GET | /api/auth/check | Verify User |

---

## Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messages/:id | Get Conversation |
| POST | /api/messages/send/:id | Send Message |

---

## Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get All Users |

---

# 💬 Real-Time Features

- Instant Messaging
- Online User Tracking
- Socket.IO Integration
- Live Message Delivery
- Automatic Chat Updates

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Secure Cookies
- Environment Variables
- MongoDB Validation

---

# 📸 Screenshots

Add screenshots here.

```
images/
├── login.png
├── signup.png
├── home.png
├── chat.png
├── profile.png
└── mobile-view.png
```

---

# 🚀 Future Enhancements

- ✅ Group Chats
- ✅ Voice Messages
- ✅ Video Calling
- ✅ Message Reactions
- ✅ Typing Indicator
- ✅ Read Receipts
- ✅ Emoji Picker
- ✅ Push Notifications
- ✅ Dark/Light Theme
- ✅ File Sharing

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Rohan Kumar Pathak**

GitHub: https://github.com/Rohanpathak-18

LinkedIn: *(Add your LinkedIn Profile)*

---

# ⭐ Support

If you found this project useful, please give this repository a ⭐.

It motivates me to build more exciting open-source projects.

---

# 📜 License

This project is licensed under the MIT License.

---

### Made with ❤️ by Rohan Kumar Pathak
