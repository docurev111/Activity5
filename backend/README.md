# Wuthering Waves Blog - Backend API

Backend API for the Wuthering Waves Blog Platform built with NestJS, TypeScript, and SQLite.

## Features

- 🔐 JWT Authentication
- 👥 User Management (Admin & Regular Users)
- 📝 Blog Posts CRUD (Admin Only)
- 💬 Comments System
- ❤️ Reactions/Likes System
- 📄 Pagination Support
- 📚 Swagger API Documentation
- 🗄️ SQLite Database

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite with TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
The `.env` file is already configured with default values. You can modify it if needed.

## Running the Application

1. Start the development server:
```bash
npm run start:dev
```

2. Seed the database with initial data (admin user and sample posts):
```bash
npm run seed
```

3. Access the API:
- API: http://localhost:3000
- Swagger Documentation: http://localhost:3000/api/docs

## Default Admin Credentials

After running the seed script:
- **Email**: admin@wutheringwaves.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Posts
- `GET /posts` - Get all posts (with pagination)
- `GET /posts/:id` - Get post by ID
- `GET /posts/category/:category` - Get posts by category
- `POST /posts` - Create post (Admin only)
- `PATCH /posts/:id` - Update post (Admin only)
- `DELETE /posts/:id` - Delete post (Admin only)

### Comments
- `GET /comments/post/:postId` - Get comments for a post
- `POST /comments` - Create comment (Authenticated users)
- `PATCH /comments/:id` - Update comment (Owner only)
- `DELETE /comments/:id` - Delete comment (Owner only)

### Reactions
- `GET /reactions/post/:postId` - Get reactions for a post
- `POST /reactions` - Add/Update reaction (Authenticated users)
- `DELETE /reactions/post/:postId` - Remove reaction (Authenticated users)

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

## Database Schema

### Users
- id, email, password, username, role, avatar, bio, createdAt, updatedAt

### Posts
- id, title, content, coverImage, category, tags, views, published, authorId, createdAt, updatedAt

### Comments
- id, content, userId, postId, createdAt, updatedAt

### Reactions
- id, type, userId, postId, createdAt

## Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run seed` - Seed the database with initial data
- `npm run lint` - Lint the code
- `npm run test` - Run tests

## Project Structure

```
src/
├── auth/              # Authentication module
├── users/             # Users module
├── posts/             # Posts module
├── comments/          # Comments module
├── reactions/         # Reactions module
├── common/            # Shared utilities (guards, decorators)
├── app.module.ts      # Root module
├── main.ts            # Application entry point
└── seed.ts            # Database seeding script
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRATION=7d
DATABASE_PATH=./database.sqlite
ADMIN_EMAIL=admin@wutheringwaves.com
ADMIN_PASSWORD=admin123
ADMIN_USERNAME=WutheringAdmin
CORS_ORIGIN=http://localhost:5173
```

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation with class-validator
- CORS configuration

## License

MIT
