# 🚀 GlobeTrotter Quick Reference

## Installation & Setup (5 Steps)

### Step 1: Install Dependencies
```bash
npm install                    # Frontend
npm run backend:install       # Backend
```

### Step 2: MongoDB Setup
```bash
# Local: Start MongoDB
mongod

# OR Cloud: Get URI from MongoDB Atlas
```

### Step 3: Configure Backend
Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/globetrotter
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Step 4: Seed Database (Optional)
```bash
npm run backend:seed
```

### Step 5: Start Servers
```bash
# Terminal 1 - Backend
npm run backend:dev
# → http://localhost:5000

# Terminal 2 - Frontend  
npm run dev
# → http://localhost:5173
```

## 🔐 First Time User Flow

1. **Register** 
   - Click "Sign Up"
   - Enter name, email, password
   - JWT token stored automatically

2. **Login**
   - Enter credentials
   - Token saved to localStorage
   - Redirected to Dashboard

3. **Create Trip**
   - Click "Plan New Trip"
   - Set dates and budget (in ₹)
   - Trip saved to MongoDB

4. **Add Destinations**
   - Click "Add Stop"
   - Select cities (or search)
   - Choose start/end dates

5. **Add Activities**
   - Browse cities in "Explore Cities"
   - View activities for each city
   - Add to your itinerary

## 📡 API Endpoints Quick List

### Users
```
POST   /api/users/register     # Register
POST   /api/users/login        # Login
GET    /api/users/profile      # Get profile (auth)
PUT    /api/users/profile      # Update profile (auth)
```

### Cities
```
GET    /api/cities             # Get all cities
GET    /api/cities/:id         # Get single city
POST   /api/cities             # Create (auth)
PUT    /api/cities/:id         # Update (auth)
DELETE /api/cities/:id         # Delete (auth)
```

### Activities
```
GET    /api/activities/city/:cityId  # Get by city
GET    /api/activities/:id           # Get single
POST   /api/activities               # Create (auth)
PUT    /api/activities/:id           # Update (auth)
DELETE /api/activities/:id           # Delete (auth)
```

### Trips
```
GET    /api/trips              # Get user's trips (auth)
POST   /api/trips              # Create trip (auth)
GET    /api/trips/:id          # Get single (auth)
PUT    /api/trips/:id          # Update (auth)
DELETE /api/trips/:id          # Delete (auth)

POST   /api/trips/:tripId/stops/:stopId/activities/:activityId
DELETE /api/trips/:tripId/stops/:stopId/activities/:activityId
```

## 🗂️ Important Files

### Backend
- `server.js` - Main server
- `models/` - Database schemas
- `controllers/` - API logic
- `routes/` - Endpoints
- `middleware/auth.js` - JWT verification

### Frontend
- `src/context/AppContext.jsx` - State management
- `src/services/api.js` - API client
- `src/pages/` - Page components

## 🔑 Key Features

✅ User authentication with JWT
✅ MongoDB database persistence  
✅ All costs in Indian Rupees (₹)
✅ Trip planning with dates
✅ City & activity database
✅ Budget tracking
✅ Professional UI
✅ Fully dynamic (no mock data)

## 💱 Currency

**Everything is in ₹ (Indian Rupees)**

Sample costs:
- Paris daily: ₹4,500
- Bali daily: ₹2,000  
- Eiffel Tower: ₹2,000
- Broadway: ₹8,000

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | `lsof -i :5000` then `kill -9 <PID>` |
| MongoDB won't connect | Start `mongod` or check Atlas URI |
| API calls fail | Check backend is running on 5000 |
| Login fails | Ensure user exists, check console errors |
| Blank page | Check browser console for JS errors |

## 📝 Environment Variables

### Backend `.env`
```
MONGODB_URI       # MongoDB connection string
PORT              # Server port (default: 5000)
JWT_SECRET        # Secret for signing tokens
NODE_ENV          # development or production
```

### Frontend
Configured in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'
```

## 🧪 Test the API

### Using Postman/Insomnia
1. Create new request
2. Set to POST
3. URL: `http://localhost:5000/api/users/login`
4. Body (JSON):
```json
{
  "email": "test@test.com",
  "password": "password123"
}
```
5. Copy returned token

### Using cURL
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

## 📊 Sample Test Data

**After seeding:**
- 8 Cities (Paris, Tokyo, New York, Bali, Barcelona, Dubai, Rome, Sydney)
- 10 Activities across cities
- Sample user: None (must register first)

## 🚢 Deployment Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (cloud)
- [ ] Deploy backend to Heroku/Railway
- [ ] Deploy frontend to Vercel
- [ ] Update API_BASE_URL to production backend
- [ ] Enable HTTPS
- [ ] Setup domain name

## 📚 Full Documentation

- `backend/README.md` - Backend API docs
- `SETUP.md` - Complete setup guide  
- `BACKEND_SUMMARY.md` - Implementation overview

## ✨ Features Included

### Authentication
- Register with email/password
- Login with JWT token
- Token expires in 7 days
- Protected API endpoints

### Trip Management
- Create unlimited trips
- Set start/end dates
- Track total budget (₹)
- Manage multiple stops

### Destinations
- Browse 8+ sample cities
- Filter by region
- Search by name/country
- View activity costs (₹)

### Budget Tracking
- See total trip cost (₹)
- Calculate daily average
- Breakdown by category
- Persistent data (MongoDB)

### Professional Design
- Clean, modern UI
- Responsive layout
- Professional color scheme
- Smooth animations

## 🎯 Next Actions

1. ✅ Read `SETUP.md` for detailed setup
2. ✅ Run `npm install` for both frontend & backend
3. ✅ Setup MongoDB locally or Atlas
4. ✅ Create `.env` in backend folder
5. ✅ Run `npm run backend:seed` (optional)
6. ✅ Start both servers
7. ✅ Register a new user
8. ✅ Create your first trip!

---

**Questions?** Check the README files or backend/README.md for detailed documentation.

**Happy travels! 🌍✈️**
