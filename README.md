# Wuthering Waves Blog Platform

A full-stack blog platform with admin-only post creation and user commenting system.

## 🎮 About

This is a blog platform where:
- **Admin** (you) can create, edit, and delete blog posts
- **Users** can register, login, comment, and like posts
- Built with NestJS (backend) and React (frontend)

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
npm run seed        # Creates admin account and sample data
npm run start:dev   # Starts server on http://localhost:3000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev         # Starts app on http://localhost:5173
```

## 👤 Admin Login

- **Email**: admin@wutheringwaves.com
- **Password**: admin123

## 📚 Tech Stack

**Backend**: NestJS, TypeScript, SQLite, JWT, Swagger  
**Frontend**: React, Vite, React Router, Axios

## ✨ Features

### Admin Can:
- ✅ Create blog posts
- ✅ Edit posts
- ✅ Delete posts
- ✅ Add categories and tags

### Users Can:
- ✅ Register and login
- ✅ View all posts
- ✅ Comment on posts
- ✅ Like posts
- ✅ Filter by category

## 📖 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs

## 🔒 Security

- JWT authentication
- Password hashing (bcrypt)
- Role-based access (Admin/User)
- Protected routes

## 📁 Project Structure

```
Activity5/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── auth/     # Authentication
│   │   ├── posts/    # Blog posts
│   │   ├── comments/ # Comments
│   │   └── users/    # User management
│   └── database.sqlite
├── frontend/         # React UI
│   ├── src/
│   │   ├── pages/    # Pages
│   │   ├── components/ # Components
│   │   └── services/ # API calls
└── README.md
```

## 🎯 Key Endpoints

- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `GET /posts` - Get all posts
- `POST /posts` - Create post (admin only)
- `POST /comments` - Add comment
- `POST /reactions` - Like post

## 📝 Notes

- SQLite database is created automatically
- Admin account is created when you run `npm run seed`
- Frontend connects to backend via proxy (configured in vite.config.js)

## 🛠️ Development

**Backend**: `npm run start:dev` (auto-reload on changes)  
**Frontend**: `npm run dev` (hot module replacement)

## 📦 Build for Production

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
```

---

**Made with ❤️ for Wuthering Waves fans**
