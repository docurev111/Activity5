# 🚀 Quick Setup Instructions for Activity 5

## Prerequisites
- Node.js v16 or higher installed
- npm installed

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd Activity5/backend

# Dependencies are already installed, but if needed:
# npm install

# Seed the database with admin user and sample posts
npm run seed

# Start the backend server
npm run start:dev
```

**Backend will run at:** `http://localhost:3000`  
**API Documentation:** `http://localhost:3000/api/docs`

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend directory
cd Activity5/frontend

# Dependencies are already installed, but if needed:
# npm install

# Start the frontend development server
npm run dev
```

**Frontend will run at:** `http://localhost:5173`

### 3. Access the Application

1. Open your browser and go to: `http://localhost:5173`
2. You'll see the Wuthering Waves Blog home page

### 4. Login as Admin

Use these credentials to login as admin:
- **Email:** `admin@wutheringwaves.com`
- **Password:** `admin123`

### 5. Test Admin Features

1. Click "Create Post" in the navigation bar
2. Fill in the post details:
   - Title: "Welcome to Wuthering Waves"
   - Category: Select from dropdown
   - Cover Image: (optional) Add an image URL
   - Tags: "wuthering waves, guide, tips"
   - Content: Write your post content
3. Click "Create Post"
4. View your post on the home page
5. Click on the post to see details
6. Try editing or deleting the post

### 6. Test User Features

1. Logout from admin account
2. Click "Register" and create a new user account
3. Login with your new account
4. Browse posts on the home page
5. Click on a post to view details
6. Click the heart icon to like the post
7. Write a comment and submit it
8. See your comment appear below the post

### 7. Explore API Documentation

1. Open: `http://localhost:3000/api/docs`
2. Browse all available endpoints
3. Try out endpoints using the "Try it out" button
4. See request/response examples

## 🎯 Key Features to Test

### Admin Features (Login as admin)
- ✅ Create new posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Manage categories and tags

### User Features (Login as regular user)
- ✅ Register new account
- ✅ Login/Logout
- ✅ View all posts
- ✅ Filter posts by category
- ✅ Read full post content
- ✅ Comment on posts
- ✅ Like/unlike posts
- ✅ View profile

### Public Features (No login required)
- ✅ Browse all posts
- ✅ View post details
- ✅ See comments and reactions
- ✅ Pagination

## 📊 Sample Data

After running `npm run seed`, you'll have:
- 1 Admin user (admin@wutheringwaves.com)
- 5 Sample blog posts about Wuthering Waves
- Various categories: Guides, News, Tips, Announcements

## 🔧 Troubleshooting

### Backend won't start
```bash
cd Activity5/backend
rm -rf node_modules package-lock.json
npm install
npm run seed
npm run start:dev
```

### Frontend won't start
```bash
cd Activity5/frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database issues
```bash
cd Activity5/backend
# Delete the database file
rm database.sqlite
# Re-seed
npm run seed
```

### Port already in use
- Backend (3000): Change PORT in `.env` file
- Frontend (5173): Vite will automatically use next available port

## 📝 Important Notes

1. **Admin Account**: Only ONE admin account exists (the one you login with)
2. **Post Creation**: Only admin can create posts
3. **Comments**: Any authenticated user can comment
4. **Reactions**: Any authenticated user can like posts
5. **Database**: SQLite database file is created in backend directory

## 🎨 UI Theme

The application uses a Wuthering Waves inspired theme:
- Dark background (#0a0e27)
- Blue accents (#4a90e2)
- Purple highlights (#9b59b6)
- Responsive design for all screen sizes

## 📚 Additional Resources

- **Backend README**: `Activity5/backend/README.md`
- **Main README**: `Activity5/README.md`
- **Activity Document**: `Activity5/Activity5_Document.md`
- **API Docs**: http://localhost:3000/api/docs (when backend is running)

## ✅ Verification Checklist

- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 5173
- [ ] Can access home page
- [ ] Can login as admin
- [ ] Can create a post as admin
- [ ] Can register new user
- [ ] Can comment as user
- [ ] Can like posts as user
- [ ] API documentation accessible
- [ ] All features working correctly

## 🎉 You're All Set!

Your Wuthering Waves Blog Platform is now ready to use. Enjoy exploring all the features!

For any issues or questions, refer to the detailed documentation in the README files.
