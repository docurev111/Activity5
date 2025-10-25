# ⚡ Quick Start Guide - Activity 5

## 🎯 Get Started in 3 Steps

### Step 1: Start Backend (Terminal 1)
```bash
cd Activity5/backend
npm run start:dev
```
✅ Backend running at: http://localhost:3000  
✅ API Docs at: http://localhost:3000/api/docs

### Step 2: Start Frontend (Terminal 2)
```bash
cd Activity5/frontend
npm run dev
```
✅ Frontend running at: http://localhost:5173

### Step 3: Login & Test
1. Open browser: http://localhost:5173
2. Login with:
   - **Email:** admin@wutheringwaves.com
   - **Password:** admin123

## ✨ What You Can Do

### As Admin (already logged in)
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Comment on posts
- ✅ Like posts

### As Regular User
1. Click "Logout"
2. Click "Register" 
3. Create account (username, email, password)
4. Login with new account
5. Now you can:
   - ✅ View all posts
   - ✅ Comment on posts
   - ✅ Like posts
   - ❌ Cannot create/edit/delete posts (admin only)

## 🎮 Test Features

### Test Post Creation (Admin Only)
1. Click "Create Post" in navbar
2. Fill in:
   - Title: "My First Post"
   - Category: Select one
   - Content: Write something
3. Click "Create Post"
4. See your post on home page!

### Test Comments
1. Click on any post
2. Scroll to comments section
3. Write a comment
4. Click "Post Comment"
5. See your comment appear!

### Test Reactions
1. Click on any post
2. Click the ❤️ heart icon
3. See the like count increase!
4. Click again to unlike

### Test Category Filter
1. Go to home page
2. Click different category buttons
3. See posts filtered by category

## 📊 Sample Data Included

After seeding, you have:
- ✅ 1 Admin user
- ✅ 3 Sample posts about Wuthering Waves
- ✅ Categories: Guides, News, Tips, Announcements

## 🔧 Troubleshooting

### Backend won't start?
```bash
cd Activity5/backend
npm install
npm run seed
npm run start:dev
```

### Frontend won't start?
```bash
cd Activity5/frontend
npm install
npm run dev
```

### Can't login?
- Email: admin@wutheringwaves.com
- Password: admin123
- Make sure backend is running!

### Port already in use?
- Backend: Change PORT in `.env`
- Frontend: Vite will use next available port

## 📚 More Info

- **Full Documentation:** README.md
- **Setup Guide:** SETUP_INSTRUCTIONS.md
- **Project Summary:** PROJECT_SUMMARY.md
- **API Docs:** http://localhost:3000/api/docs (when running)

## 🎉 You're Ready!

Everything is set up and ready to go. Just start both servers and begin testing!

**Happy Coding! 🚀**
