# Activity 5: Wuthering Waves Blog Platform

A full-stack blog platform built with NestJS (backend) and React (frontend), themed around Wuthering Waves content.

## 🎮 Features

### Backend (NestJS + TypeScript + SQLite)
- **Authentication**: JWT-based authentication with role-based access control
- **User Management**: Register, login, and profile management
- **Posts**: CRUD operations with pagination, categories, and tags
- **Comments**: Users can comment on posts
- **Reactions**: Like/unlike posts
- **Admin Controls**: Only admin can create, edit, and delete posts
- **API Documentation**: Swagger UI available at `/api/docs`

### Frontend (React + Vite)
- **Responsive Design**: Wuthering Waves themed UI
- **Authentication**: Login and registration pages
- **Home Page**: Browse posts with category filtering and pagination
- **Post Details**: View full posts with comments and reactions
- **Admin Dashboard**: Create and edit posts (admin only)
- **Comment System**: Authenticated users can comment
- **Reaction System**: Like posts

## 🚀 Tech Stack

### Backend
- NestJS
- TypeScript
- TypeORM
- SQLite
- JWT Authentication
- Bcrypt
- Swagger

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- React Icons
- React Toastify
- date-fns

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Activity5/backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with default values:
   - Port: 3000
   - Admin credentials: admin@wutheringwaves.com / admin123
   - JWT secret (change in production!)

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run start:dev
```

The backend will be running at `http://localhost:3000`
API Documentation: `http://localhost:3000/api/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Activity5/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

## 👤 Default Admin Credentials

- **Email**: admin@wutheringwaves.com
- **Password**: admin123

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile

### Posts
- `GET /posts` - Get all posts (with pagination)
- `GET /posts/:id` - Get single post
- `GET /posts/category/:category` - Get posts by category
- `POST /posts` - Create post (admin only)
- `PATCH /posts/:id` - Update post (admin only)
- `DELETE /posts/:id` - Delete post (admin only)

### Comments
- `GET /comments/post/:postId` - Get comments for a post
- `POST /comments` - Create comment (authenticated)
- `PATCH /comments/:id` - Update comment (owner only)
- `DELETE /comments/:id` - Delete comment (owner only)

### Reactions
- `GET /reactions/post/:postId` - Get reactions for a post
- `POST /reactions` - Add reaction (authenticated)
- `DELETE /reactions/:postId` - Remove reaction (authenticated)

### Users
- `GET /users/profile` - Get user profile
- `PATCH /users/profile` - Update user profile

## 🎨 Features Breakdown

### Admin Features
- Create new blog posts
- Edit existing posts
- Delete posts
- Manage post categories and tags
- Add cover images to posts

### User Features
- Register and login
- View all blog posts
- Filter posts by category
- Read full post content
- Comment on posts
- Like/unlike posts
- View their profile

### Public Features
- Browse all published posts
- View post details
- Pagination for posts

## 📱 Screenshots

See the Activity5_Document.docx for detailed screenshots of:
- Home page with post listings
- Post detail page with comments
- Admin post creation interface
- Login/Register pages
- API documentation (Swagger)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control (ADMIN/USER)
- Protected routes
- Input validation
- CORS configuration

## 📝 Database Schema

### Users
- id, email, password, username, role, createdAt, updatedAt

### Posts
- id, title, content, coverImage, category, tags, published, authorId, createdAt, updatedAt

### Comments
- id, content, postId, userId, createdAt, updatedAt

### Reactions
- id, type, postId, userId, createdAt

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Login with admin credentials to create posts
4. Register a new user account to test commenting and reactions
5. Test all CRUD operations
6. Check API documentation at `http://localhost:3000/api/docs`

## 📦 Project Structure

```
Activity5/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # Users module
│   │   ├── posts/         # Posts module
│   │   ├── comments/      # Comments module
│   │   ├── reactions/     # Reactions module
│   │   ├── common/        # Guards, decorators, filters
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── seed.ts
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🚧 Future Enhancements

- Image upload functionality
- Post search feature
- User profiles with avatars
- Email notifications
- Post drafts
- Rich text editor
- Social sharing
- Post analytics

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as Activity 5 for the Web Development course.
