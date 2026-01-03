# 📊 Data Flow & Backend Seeding Guide

## ✅ Is Frontend Connected to Backend?

**YES!** The frontend is fully connected to the backend. Here's the complete flow:

## 🔄 Complete Data Flow

```
┌──────────────────────────────────────┐
│  Frontend (React Component)          │
│  src/pages/CitySearch.jsx           │
└────────────┬─────────────────────────┘
             │
             │ 1. User clicks button
             │    or page loads
             │
             ↓
┌──────────────────────────────────────────────────┐
│  React Component calls AppContext                │
│  const { cities } = useApp();                   │
│  useEffect(() => searchCities(query), [query]) │
└────────────┬──────────────────────────────────────┘
             │
             │ 2. AppContext function triggered
             │    (src/context/AppContext.jsx)
             │
             ↓
┌──────────────────────────────────────────────────┐
│  AppContext makes API call                      │
│  const response =                               │
│    await cityAPI.getAllCities({...});          │
└────────────┬──────────────────────────────────────┘
             │
             │ 3. API Service Client (src/services/api.js)
             │    Adds token to header:
             │    Authorization: Bearer <JWT_TOKEN>
             │
             ↓
      HTTP REQUEST (Port 5000)
      GET /api/cities
      Headers: { Authorization: Bearer ... }
             │
             ↓
┌──────────────────────────────────────┐
│  Backend Express Server              │
│  backend/server.js                   │
│  Receives request                    │
└────────────┬─────────────────────────┘
             │
             │ 4. CORS middleware checks origin
             │ 5. Parse JSON/body
             │
             ↓
┌──────────────────────────────────────┐
│  Route Handler (cityRoutes.js)       │
│  GET /api/cities                     │
└────────────┬─────────────────────────┘
             │
             │ 6. Route directs to controller
             │
             ↓
┌──────────────────────────────────────┐
│  Controller (cityController.js)      │
│  getAllCities()                      │
│  - Validate request                  │
│  - Query MongoDB                     │
│  - Return data                       │
└────────────┬─────────────────────────┘
             │
             │ 7. MongoDB Query
             │    City.find(query)
             │
             ↓
┌──────────────────────────────────────┐
│  MongoDB Database                    │
│  Collections: cities, users,         │
│               activities, trips       │
│                                       │
│  Returns: [                          │
│    { _id, name, costIndexINR, ... }, │
│    { _id, name, costIndexINR, ... }  │
│  ]                                   │
└────────────┬─────────────────────────┘
             │
             │ 8. Response sent back (JSON)
             │    status: 200
             │    body: [cities array]
             │
             ↓
      HTTP RESPONSE (Port 5173)
      Status: 200 OK
      Body: JSON array of cities
             │
             ↓
┌──────────────────────────────────────┐
│  Frontend receives response           │
│  axios interceptor catches it         │
│  AppContext updates state             │
│  setCities(response.data)             │
└────────────┬─────────────────────────┘
             │
             │ 9. UI Re-renders
             │    Component gets new data
             │
             ↓
┌──────────────────────────────────────┐
│  User sees Cities in UI              │
│  - Paris, Tokyo, New York, etc.     │
│  - Cost, popularity, images          │
│  - All from MongoDB                  │
└──────────────────────────────────────┘
```

## 🗄️ What is `npm run backend:seed`?

**Bulk Data Insertion Script**

The seed script **automatically inserts sample data** into MongoDB:

```
npm run backend:seed
    ↓
Runs: node seed.js
    ↓
1. Connects to MongoDB
2. DELETES all existing data
3. INSERTS 8 cities
4. INSERTS 10 activities
5. Links activities to cities
6. Disconnects
```

## 📝 How Seeding Works (Step by Step)

### Step 1: Delete Old Data
```javascript
await City.deleteMany({});        // Remove all cities
await Activity.deleteMany({});    // Remove all activities
```

### Step 2: Insert Cities
```javascript
const cities = await City.insertMany([
  {
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    costIndexINR: 4500,           // ₹4500 per day
    popularity: 95,               // Out of 100
    image: 'https://...',
    description: 'The City of Light...',
    coordinates: { latitude: 48.8566, longitude: 2.3522 }
  },
  {
    name: 'Tokyo',
    // ... more cities
  },
  // ... total 8 cities
]);
```

**Result:** 8 cities inserted into MongoDB

### Step 3: Insert Activities
```javascript
await Activity.insertMany([
  {
    name: 'Eiffel Tower Visit',
    cityId: cities[0]._id,        // Link to Paris
    category: 'Sightseeing',
    duration: 2,                  // hours
    costINR: 2000,                // ₹2000 per activity
    description: 'Visit the iconic...',
    image: 'https://...',
    rating: 4.8
  },
  // ... total 10 activities
]);
```

**Result:** 10 activities inserted, all linked to cities

## 💾 What Data Gets Seeded?

### Cities (8 Total)
| City | Country | Region | Cost/Day | Popularity |
|------|---------|--------|----------|------------|
| Paris | France | Europe | ₹4,500 | 95% |
| Tokyo | Japan | Asia | ₹5,500 | 92% |
| New York | USA | North America | ₹5,800 | 94% |
| Bali | Indonesia | Asia | ₹2,000 | 88% |
| Barcelona | Spain | Europe | ₹3,500 | 90% |
| Dubai | UAE | Middle East | ₹4,200 | 87% |
| Rome | Italy | Europe | ₹3,200 | 91% |
| Sydney | Australia | Oceania | ₹4,800 | 85% |

### Activities (10 Total - Linked to Cities)
| Activity | City | Cost | Duration |
|----------|------|------|----------|
| Eiffel Tower Visit | Paris | ₹2,000 | 2h |
| Seine River Cruise | Paris | ₹1,800 | 1.5h |
| Tokyo Food Tour | Tokyo | ₹5,000 | 3h |
| Shibuya Crossing | Tokyo | Free | 1h |
| Statue of Liberty | New York | ₹3,000 | 3h |
| Broadway Show | New York | ₹8,000 | 2.5h |
| Ubud Rice Terrace Trek | Bali | ₹2,500 | 4h |
| Beach Sunset & Dinner | Bali | ₹3,500 | 3h |
| Sagrada Familia Tour | Barcelona | ₹2,500 | 2h |
| Tapas Crawl | Barcelona | ₹4,000 | 3h |

## 🔧 How to Run Seeding

### Option 1: From Root Directory
```bash
cd d:\globetrotter-app
npm run backend:seed
```

### Option 2: From Backend Directory
```bash
cd d:\globetrotter-app\backend
npm run seed
```

### Output Example
```
🔄 Clearing existing data...
📍 Seeding cities...
🎯 Seeding activities...
✅ Database seeded successfully!
```

## 📊 Bulk Data Upload Methods

### Method 1: Seeding Script (Current - Easy)
```bash
npm run backend:seed
# Automatically adds 8 cities + 10 activities
```
✅ **Pros:** Simple, instant, pre-configured
❌ **Cons:** Fixed data only

### Method 2: Manually Add via API
```bash
# Create new city
POST /api/cities
Headers: Authorization: Bearer <token>
Body: {
  "name": "London",
  "country": "UK",
  "region": "Europe",
  "costIndexINR": 4000,
  "popularity": 93,
  "image": "https://...",
  "description": "Historic capital..."
}

# Create activity
POST /api/activities
Body: {
  "name": "Big Ben Tour",
  "cityId": "<city_id>",
  "costINR": 1500,
  ...
}
```
✅ **Pros:** Flexible, add custom data
❌ **Cons:** Requires authentication, slower

### Method 3: Create Custom Seed Script
```javascript
// Create new file: backend/bulkSeed.js
import mongoose from 'mongoose';
import City from './models/City.js';
import Activity from './models/Activity.js';

const bulkData = [
  // Your custom cities and activities
];

const seedBulk = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Insert your data
    const cities = await City.insertMany(bulkData.cities);
    const activities = await Activity.insertMany(bulkData.activities);
    
    console.log('✅ Bulk data inserted!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedBulk();
```

Then run: `node backend/bulkSeed.js`

✅ **Pros:** Custom data, bulk operations
❌ **Cons:** Requires file modification

## 🔄 Data Connection Summary

### Frontend → Backend Connection

```javascript
// frontend/src/context/AppContext.jsx
const getActivitiesByCity = async (cityId) => {
  setIsLoading(true);
  try {
    // Makes API call to backend
    const response = await activityAPI.getActivitiesByCity(cityId);
    
    // Sets state from database data
    setActivities(response.data);
    
    setIsLoading(false);
    return response.data;
  } catch (err) {
    setError(err.message);
    setIsLoading(false);
  }
};
```

### Backend Serves Data

```javascript
// backend/controllers/activityController.js
export const getActivitiesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    
    // Query MongoDB for activities
    const activities = await Activity.find({ cityId })
      .populate('cityId');  // Include city details
    
    // Return JSON response
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 📱 Complete User Flow

```
1. User opens app
   ↓
2. Frontend loads
   ↓
3. AppContext initializes
   ↓
4. API calls fetch data from backend
   ↓
5. MongoDB queries execute
   ↓
6. JSON response returned to frontend
   ↓
7. State updated with fresh data
   ↓
8. UI renders cities, activities, prices
   ↓
9. User creates trip
   ↓
10. Trip saved to MongoDB
    ↓
11. Next visit, user data loads from database
```

## ✨ Everything Works Together

| Component | Purpose | Data Source |
|-----------|---------|-------------|
| Frontend (React) | User interface | Gets from backend API |
| API Client (axios) | HTTP requests | Calls Express server |
| Express Server | API endpoints | Queries MongoDB |
| MongoDB | Database | Stores all data |
| Models (Mongoose) | Database schemas | Defines data structure |
| Seed Script | Bulk insert | Adds sample data to MongoDB |

## 🎯 Quick Commands Reference

```bash
# Install & Setup
npm install                    # Frontend
npm run backend:install       # Backend
npm cache clean --force       # Clear cache (if issues)

# Run Servers
npm run backend:dev           # Start backend (Terminal 1)
npm run dev                   # Start frontend (Terminal 2)

# Database Operations
npm run backend:seed          # Add sample data to MongoDB
npm run backend:start         # Start backend (production)

# Test API (in new terminal)
curl http://localhost:5000/api/cities
curl http://localhost:5000/api/health
```

## 📋 Troubleshooting Data Issues

### Data not showing?
```bash
# 1. Check MongoDB is running
mongod

# 2. Seed database
npm run backend:seed

# 3. Check if backend is running on port 5000
curl http://localhost:5000/api/health

# 4. Verify token exists in localStorage
# Open DevTools > Application > localStorage
```

### Seed fails?
```bash
# Clear cache and reinstall
npm cache clean --force
npm run backend:install

# Try seeding again
npm run backend:seed
```

### API returns 401 (Unauthorized)?
```bash
# You might need to:
# 1. Register a new user
# 2. Login
# 3. Use the token for protected endpoints
```

---

**Summary:** Yes, your frontend is **fully connected** to the backend. Data flows from MongoDB → Express API → React Frontend → User Interface. The seed script bulks adds sample data to MongoDB instantly!
