# GlobeTrotter Project Structure Overview

## 📐 Complete File Structure

```
globetrotter-app/
│
├── 📄 Configuration Files
│   ├── package.json              → Dependencies & scripts
│   ├── vite.config.js            → Vite build configuration
│   ├── tailwind.config.js        → Custom Tailwind theme
│   ├── postcss.config.js         → PostCSS setup
│   ├── .gitignore                → Git ignore rules
│   ├── README.md                 → Full documentation
│   └── QUICKSTART.md             → Quick start guide
│
├── 📁 public/                    → Static assets (images, icons)
│
├── 🌐 index.html                 → HTML entry point
│
└── 📁 src/                       → Source code
    │
    ├── 🎨 Styling
    │   └── index.css             → Global styles, Tailwind, custom utilities
    │
    ├── 🚀 Entry Points
    │   ├── main.jsx              → React app initialization
    │   └── App.jsx               → Main app component with routing
    │
    ├── 📦 Context (State Management)
    │   └── AppContext.jsx        → Global state (user, trips, functions)
    │
    ├── 💾 Data
    │   └── mockData.js           → Sample cities & activities
    │
    ├── 🧩 Components
    │   ├── Layout.jsx            → Main layout with sidebar & header
    │   ├── common/               → Reusable components (future)
    │   └── layout/               → Layout-specific components (future)
    │
    ├── 📄 Pages (13 Total)
    │   │
    │   ├── 🔐 Authentication
    │   │   ├── LoginPage.jsx     → User login
    │   │   └── SignupPage.jsx    → User registration
    │   │
    │   ├── 🏠 Main Dashboard
    │   │   └── Dashboard.jsx     → Home screen with stats & trips
    │   │
    │   ├── ✈️ Trip Management
    │   │   ├── CreateTrip.jsx    → New trip creation form
    │   │   ├── TripList.jsx      → All trips list view
    │   │   ├── TripDetails.jsx   → Individual trip overview
    │   │   └── ItineraryBuilder.jsx → Add/edit stops & activities
    │   │
    │   ├── 🌍 Discovery
    │   │   ├── CitySearch.jsx    → Browse & search cities
    │   │   └── ActivitySearch.jsx → Browse & search activities
    │   │
    │   ├── 💰 Budget
    │   │   └── BudgetView.jsx    → Trip budget breakdown
    │   │
    │   └── 👤 User
    │       └── Profile.jsx       → User profile & settings
    │
    ├── 🔧 hooks/                 → Custom React hooks (future)
    │
    └── 🛠️ utils/                 → Utility functions (future)
```

## 🎯 Key Components Breakdown

### Layout.jsx (Main Application Shell)
```
┌─────────────────────────────────────────┐
│  Sidebar           │  Main Content      │
│  ├─ Logo           │  ├─ Header         │
│  ├─ Navigation     │  │  ├─ Search      │
│  │  ├─ Dashboard   │  │  └─ New Trip    │
│  │  ├─ My Trips    │  │                 │
│  │  ├─ Cities      │  ├─ Page Content   │
│  │  ├─ Activities  │  │  (Outlet)       │
│  │  └─ Profile     │  │                 │
│  └─ User Menu      │  └─────────────────│
└─────────────────────────────────────────┘
```

### Dashboard Page Flow
```
Welcome Header
    ↓
[Stats Grid]
  - Total Trips
  - Countries Visited
  - Total Spent
    ↓
[Upcoming Trips]
  - Trip Cards (max 3)
  - View All Link
    ↓
[Popular Destinations]
  - Destination Cards (4)
  - Explore More Link
```

### Trip Creation Flow
```
Create Trip Page
    ↓
  Enter Details:
  - Name
  - Dates
  - Description
  - Cover Image
    ↓
Submit → Create Trip
    ↓
Redirect to Itinerary Builder
    ↓
Add Stops:
  - City Name
  - Country
  - Dates
    ↓
Browse & Add Activities
    ↓
View Budget
```

## 🎨 Design System Components

### Buttons
```css
.btn-primary    → Orange gradient, white text
.btn-secondary  → White with border
.btn-accent     → Blue gradient
.btn-ghost      → Transparent, hover effect
```

### Cards
```css
.card           → White, rounded-2xl, shadow-sm
.card-elevated  → Enhanced shadow for emphasis
```

### Inputs
```css
.input-field    → Rounded-xl, 2px border, focus ring
```

### Badges
```css
.badge-primary  → Orange background
.badge-accent   → Blue background
.badge-success  → Green background
```

## 🔄 State Management Flow

```
AppContext Provider
    │
    ├─ User State
    │  ├─ login()
    │  ├─ logout()
    │  └─ signup()
    │
    ├─ Trip State
    │  ├─ trips[]
    │  ├─ createTrip()
    │  ├─ updateTrip()
    │  ├─ deleteTrip()
    │  └─ getTripById()
    │
    ├─ Stop Management
    │  ├─ addStopToTrip()
    │  ├─ updateStop()
    │  └─ deleteStop()
    │
    └─ Activity Management
       └─ addActivityToStop()
```

## 📱 Responsive Breakpoints

```
Mobile:  < 640px   → Single column, collapsible sidebar
Tablet:  640-1024px → Two columns, touch-optimized
Desktop: > 1024px   → Full layout with sidebar
```

## 🎬 Animation System

### Page Entry Animations
```css
.animate-fade-in     → Opacity 0 → 1
.animate-slide-up    → Translate Y + Fade
.animate-slide-in    → Translate X + Fade
.animate-scale-in    → Scale + Fade
```

### Staggered Delays
```css
.animate-delay-100   → 100ms delay
.animate-delay-200   → 200ms delay
.animate-delay-300   → 300ms delay
.animate-delay-400   → 400ms delay
```

## 🔐 Route Protection

```
Public Routes:
  /login    → LoginPage
  /signup   → SignupPage

Protected Routes (require authentication):
  /dashboard          → Dashboard
  /trips              → TripList
  /trips/new          → CreateTrip
  /trips/:id          → TripDetails
  /trips/:id/itinerary → ItineraryBuilder
  /trips/:id/budget   → BudgetView
  /cities             → CitySearch
  /activities         → ActivitySearch
  /profile            → Profile
```

## 📊 Data Models

### User
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  location: string,
  avatar: string
}
```

### Trip
```javascript
{
  id: string,
  name: string,
  startDate: date,
  endDate: date,
  description: string,
  coverImage: string,
  userId: string,
  stops: Stop[],
  budget: number,
  createdAt: date
}
```

### Stop
```javascript
{
  id: string,
  city: string,
  country: string,
  startDate: date,
  endDate: date,
  activities: Activity[]
}
```

### Activity
```javascript
{
  id: string,
  name: string,
  category: string,
  duration: number,
  cost: number,
  description: string,
  image: string
}
```

## 🚀 Build & Deployment

### Development
```bash
npm run dev  → Start dev server at localhost:3000
```

### Production
```bash
npm run build   → Build for production (outputs to /dist)
npm run preview → Preview production build
```

### Recommended Hosting
- Vercel (recommended for Vite projects)
- Netlify
- AWS Amplify
- GitHub Pages

## 📈 Performance Optimizations

- ✅ Vite for fast HMR and builds
- ✅ Lazy loading with React Router
- ✅ CSS optimization with Tailwind purge
- ✅ Image optimization (external CDN)
- ✅ Minimal dependencies
- ✅ Tree-shaking enabled

## 🧪 Future Testing Setup

```
tests/
  ├── unit/           → Component tests
  ├── integration/    → Page flow tests
  └── e2e/            → Full user journey tests
```

---

**This structure provides a solid foundation for a production-ready travel planning application!**
