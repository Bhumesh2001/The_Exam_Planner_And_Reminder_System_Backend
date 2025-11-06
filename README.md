# 🧭 The Exam Planner & Reminder System — Backend

A robust and modular backend built using **Node.js**, **Express**, and **MongoDB (Mongoose)**.
It powers the _Exam Planner & Reminder System_ application, providing APIs for authentication, exams, notes, reminders, and admin management.

---

## 🚀 Features

- 🔐 **User Authentication** (Register & Login using JWT)
- 🎓 **Exam Management** (CRUD operations with sorting)
- 🗒️ **Notes System** (Parent-child hierarchical notes)
- ⏰ **Reminders** (Automatic reminder scheduling using `node-cron`)
- 🧑‍💼 **Admin APIs** (Manage users and view all exams)
- 🪄 Modular MVC structure for scalability
- 🧭 Environment-based configuration with `.env`
- 🧩 Seed command to populate initial test data

---

## 🏗️ Tech Stack

- **Node.js** — runtime environment
- **Express.js** — web framework
- **MongoDB + Mongoose** — database & ORM
- **bcryptjs** — password hashing
- **jsonwebtoken (JWT)** — authentication
- **dotenv** — environment configuration
- **node-cron** — scheduled reminders

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── examController.js
│   ├── noteController.js
│   ├── reminderController.js
│   └── adminController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Exam.js
│   ├── Note.js
│   └── Reminder.js
├── routes/
│   ├── authRoutes.js
│   ├── examRoutes.js
│   ├── noteRoutes.js
│   ├── reminderRoutes.js
│   └── adminRoutes.js
├── seed/
│   └── seed.js
├── .env
├── package.json
└── server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Bhumesh2001/The_Exam_Planner_And_Reminder_System_Backend
cd exam-planner-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/exam_planner
JWT_SECRET=your_jwt_secret
REMINDER_CHECK_INTERVAL_MINUTES=1
```

### 4. Run the server

```bash
npm run dev
```

This starts the server on **[http://localhost:5000](http://localhost:5000)**

---

## 🧩 Available NPM Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `npm start`    | Runs the server in production mode               |
| `npm run dev`  | Starts the server with nodemon (development)     |
| `npm run seed` | Runs database seeding script to insert test data |

---

## 🧠 API Endpoints Overview

### 🔑 Authentication

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register new user       |
| POST   | `/api/auth/login`    | Login and get JWT token |

### 🎓 Exams

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | `/api/exams`     | Get all exams (with sorting options) |
| POST   | `/api/exams`     | Create a new exam                    |
| DELETE | `/api/exams/:id` | Delete an exam by ID                 |

### 🗒️ Notes

| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/api/notes`     | Get all notes (with parent-child hierarchy) |
| POST   | `/api/notes`     | Create new note                             |
| DELETE | `/api/notes/:id` | Delete note by ID                           |

### ⏰ Reminders

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| GET    | `/api/reminders`     | Get all reminders                 |
| POST   | `/api/reminders`     | Create reminder linked to an exam |
| DELETE | `/api/reminders/:id` | Delete reminder                   |

### 🧑‍💼 Admin

| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/api/admin/users` | Get list of all users             |
| GET    | `/api/admin/exams` | Get all exams (with user details) |

---

## 🧪 Database Seeding

To populate sample data for testing:

```bash
npm run seed
```

Example inserted data includes:

- 2 Users (Admin + Regular User)
- 2 Exams
- 2 Notes
- 2 Reminders

---

## 🔒 JWT Authentication Flow

1. On successful login, a JWT token is issued.
2. The token is stored in localStorage (frontend).
3. Protected routes (like `/exams`, `/notes`, `/reminders`) verify token via middleware.
4. Invalid or expired tokens result in `401 Unauthorized`.

---

## 🧩 Reminder Cron Job

- Uses **node-cron** to check upcoming reminders every few minutes (based on `REMINDER_CHECK_INTERVAL_MINUTES`).
- Automatically sends console notifications (or can be extended for email/SMS alerts).

---

## 🧱 Sample Data (JSON)

### Example Exam Record

```json
{
  "title": "Operating Systems Midterm",
  "subject": "Information Technology",
  "date": "2025-11-25T14:00:00Z",
  "priority": 1
}
```

### Example Reminder Record

```json
{
  "message": "Prepare for OS Midterm",
  "remindAt": "2025-11-24T18:00:00Z",
  "examId": "6730846f91f41023cc1a9df7"
}
```

---

## 🌍 Deployment

You can deploy this backend on:

- **Render**
- **Railway**
- **Vercel (Serverless API)**
- **AWS EC2**
- **DigitalOcean**

Make sure to:

1. Use a production MongoDB (Atlas).
2. Set proper environment variables in your hosting panel.
3. Allow CORS for your frontend domain.

---

## 👨‍💻 Author

**Bhumesh Kewat**
Software Engineer | Full Stack Developer
📧 [bhumesh21@navgurukul.org](mailto:bhumesh21@navgurukul.org)

---

## 🪪 License

This project is open source and available under the **MIT License**.

---

**✨ Built with Node.js, Express, and MongoDB — powering The Exam Planner & Reminder System.**
