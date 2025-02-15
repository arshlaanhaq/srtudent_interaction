# 🎓 Student Course Dashboard Web App

A **MERN Stack**-based web application that allows students to **apply for courses, manage their profile, and track applications**. The system includes JWT-based authentication and an interactive user interface built with **React.js and Tailwind CSS**.

---

## ✨ Features

- ✅ **Student Authentication** (Register/Login with JWT)
- ✅ **Apply for Courses** (Submit applications)
- ✅ **Profile Management** (Update phone, address, course, and DOB)
- ✅ **Dashboard View** (List of applied courses)
- ✅ **Secure API Communication**
- ✅ **Mobile Responsive UI**

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: JWT (JSON Web Token)  
- **Database**: MongoDB Atlas  
- **Hosting**: Vercel (Frontend) & Render (Backend)  

---

## 💽 Installation & Setup

### 1. Clone the Repository
  ```bash
  git clone https://github.com/arshlaanhaq/student-course-dashboard.git
  cd student-dashboard
  ```
### 2. Backend Setup
  ```bash
  cd backend
  npm install
  node server.js
  ```
### 3. Frontend Setup
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
### 4. Environment Variables
Create a .env file in the backend directory:
  ```env
  
  MONGO_URI=your_mongodb_connection
  JWT_SECRET=your_secret_key
  ```
---

## 📞 API Endpoints
### User Authentication
- POST /auth/register - Register a new student
- POST /auth/login - Login student & return JWT

### Student Profile
- GET /student/profile - Get student profile data
- PUT /student/profile - Update student profile

### Courses
- GET /application - Get list of applied courses
- POST /application/apply - Apply for a new course

---  

## 🛠️ Future Enhancements
- 🚀 Teacher Login & Dashboard (Allow teachers to manage students & courses)
- 🚀 Admin Panel (Manage users & system settings)
- 🚀 File Upload Support (Allow students to upload documents)
---

## 🤝 Contribution
Feel free to contribute to this project by creating a PR!
For major changes, please open an issue first to discuss what you'd like to change.

