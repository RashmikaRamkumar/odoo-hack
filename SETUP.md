# GlobeTrotter - Complete Setup Guide

A full-stack travel planning application built with **React + Vite** (Frontend) and **Node.js + Express + MongoDB** (Backend).

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or Atlas cloud)

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
npm run backend:install
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and add to `backend/.env`

### 4. Configure Backend Environment

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/globetrotter
PORT=5000
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

### 5. Seed Database (Optional)
```bash
npm run backend:seed
```

### 6. Start Development Servers

**Terminal 1 - Backend:**
```bash
npm run backend:dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
App runs on `http://localhost:5173`

## 📁 Project Structure

```
globetrotter-app/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # API logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & utilities
│   ├── server.js        # Express server
│   ├── seed.js          # Database seeding
│   └── package.json
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── context/         # AppContext (state management)
│   ├── services/        # API client
│   ├── data/            # Mock data (for development)
│   └── App.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔑 Key Features

✅ **User Authentication** - Register, login with JWT tokens
✅ **Trip Management** - Create, update, delete trips
✅ **City & Activities** - Browse and add to trips
✅ **Budget Tracking** - Track expenses in INR
✅ **Professional Design** - Modern, clean UI with Tailwind CSS
✅ **API-Driven** - All data from MongoDB backend

## 💱 Currency

All monetary values are in **Indian Rupees (₹)**
- Database: INR
- API: INR
- Frontend: ₹ symbol

## 🔐 Authentication Flow

1. User registers → Password hashed with bcrypt
2. Login → JWT token issued (expires in 7 days)
3. Token stored in localStorage
4. API requests include `Authorization: Bearer <token>`
5. Protected endpoints verify token

## 📡 API Examples

### Register User
```bash
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Trip
```bash
POST /api/trips
Headers: Authorization: Bearer <token>
{
  "name": "Europe Tour",
  "startDate": "2024-06-01",
  "endDate": "2024-06-30",
  "totalBudgetINR": 200000
}
```

### Get Cities
```bash
GET /api/cities?region=Europe&search=Paris
```

## 🛠️ Available Scripts

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run backend:dev` - Start with nodemon (auto-reload)
- `npm run backend:start` - Start production server
- `npm run backend:seed` - Seed database with sample data

## 📋 Models & Relationships

```
User
├── Trips (1-to-Many)
    └── Stops (1-to-Many)
        └── Activities (Many-to-Many)
```

## 🧪 Testing with Postman/Insomnia

1. Import API endpoints from `backend/` folder
2. Set up environment variables:
   - `BASE_URL`: http://localhost:5000/api
   - `TOKEN`: JWT token from login
3. Test endpoints with auth token in header

## 🐛 Common Issues

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- For Atlas: Whitelist your IP

### CORS Error
- Backend already has CORS enabled
- If issues persist, update `backend/server.js`

### API Call Fails
- Check backend is running on port 5000
- Verify token is in localStorage
- Check browser console for errors

## 📚 Useful Resources

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Heroku)
```bash
git push heroku main
# Use MongoDB Atlas for database
```

## 📞 Support

Check individual README files:
- `backend/README.md` - Backend setup & API docs
- Frontend issues - Check browser console

## 📝 License

ISC License

---

**Happy Traveling! 🌍✈️**
