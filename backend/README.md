# GlobeTrotter Backend Setup Guide

This backend API powers the GlobeTrotter travel planning application using Node.js, Express, and MongoDB.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas cloud)
- **npm** or **yarn**

## Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend folder with the following:

```env
MONGODB_URI=mongodb://localhost:27017/globetrotter
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/globetrotter
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Compass** for a GUI interface.

### 4. Seed Database (Optional)

```bash
npm run seed
```

This populates the database with sample cities and activities.

### 5. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication (Users)
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

### Cities
- `GET /api/cities` - Get all cities (supports search & region filtering)
- `GET /api/cities/:id` - Get specific city
- `POST /api/cities` - Create city (requires auth)
- `PUT /api/cities/:id` - Update city (requires auth)
- `DELETE /api/cities/:id` - Delete city (requires auth)

### Activities
- `GET /api/activities/city/:cityId` - Get activities for a city
- `GET /api/activities/:id` - Get specific activity
- `POST /api/activities` - Create activity (requires auth)
- `PUT /api/activities/:id` - Update activity (requires auth)
- `DELETE /api/activities/:id` - Delete activity (requires auth)

### Trips
- `GET /api/trips` - Get all user trips (requires auth)
- `POST /api/trips` - Create new trip (requires auth)
- `GET /api/trips/:id` - Get specific trip (requires auth)
- `PUT /api/trips/:id` - Update trip (requires auth)
- `DELETE /api/trips/:id` - Delete trip (requires auth)

#### Trip Stops
- `POST /api/trips/:tripId/stops` - Add stop to trip
- `DELETE /api/trips/:tripId/stops/:stopId` - Remove stop

#### Trip Activities
- `POST /api/trips/:tripId/stops/:stopId/activities/:activityId` - Add activity to stop
- `DELETE /api/trips/:tripId/stops/:stopId/activities/:activityId` - Remove activity from stop

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  preferences: {
    currency: String (default: 'INR'),
    language: String
  }
}
```

### City
```javascript
{
  name: String,
  country: String,
  region: String,
  costIndexINR: Number,
  popularity: Number (0-100),
  image: String,
  description: String,
  coordinates: { latitude, longitude }
}
```

### Activity
```javascript
{
  name: String,
  cityId: ObjectId (ref: City),
  category: String (enum),
  duration: Number,
  costINR: Number,
  description: String,
  image: String,
  rating: Number (0-5)
}
```

### Trip
```javascript
{
  name: String,
  description: String,
  userId: ObjectId (ref: User),
  startDate: Date,
  endDate: Date,
  stops: [ObjectId] (ref: Stop),
  totalBudgetINR: Number,
  currency: String,
  status: String (Planning/Active/Completed)
}
```

### Stop
```javascript
{
  tripId: ObjectId (ref: Trip),
  cityId: ObjectId (ref: City),
  city: String,
  country: String,
  startDate: Date,
  endDate: Date,
  activities: [ObjectId] (ref: Activity),
  estimatedBudgetINR: Number,
  notes: String
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register/Login to get a token
2. Include token in request header: `Authorization: Bearer <token>`
3. Token expires in 7 days

## Currency

All monetary values are in **Indian Rupees (₹)**

- Database stores costs in INR
- API returns values in INR
- Frontend displays with ₹ symbol

## Error Handling

API responses follow this format:

**Success:**
```json
{
  "data": {...},
  "message": "Success message"
}
```

**Error:**
```json
{
  "error": "Error message"
}
```

## Connecting Frontend

The frontend API client is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Make sure this matches your backend URL.

## Development Tips

- Use MongoDB Compass to visualize your database
- Test API endpoints with Postman or Insomnia
- Check logs in terminal for debugging
- Use `node --inspect` for debugging with Chrome DevTools

## Production Deployment

For production:

1. Change `JWT_SECRET` to a strong random string
2. Set `NODE_ENV=production`
3. Use MongoDB Atlas for cloud storage
4. Deploy to Heroku, Vercel, or AWS
5. Add CORS configuration for frontend domain
6. Enable HTTPS

## Support

For issues or questions, check the main README.md in the project root.
