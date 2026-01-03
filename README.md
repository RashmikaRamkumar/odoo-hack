# GlobeTrotter - Personalized Travel Planning Application

A modern, full-featured travel planning application built with React, Tailwind CSS, and featuring a beautiful, professional UI/UX design.

## 🌟 Features

### Core Features
- **User Authentication**: Complete login and signup flows with form validation
- **Trip Management**: Create, view, edit, and delete trips
- **Itinerary Builder**: Add multiple stops/cities to your trips with dates
- **City Explorer**: Browse and search through destinations worldwide
- **Activity Discovery**: Find and add activities to your itinerary
- **Budget Tracking**: Monitor trip expenses with visual breakdowns
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### User Experience
- **Modern UI**: Clean, professional design with custom color palette
- **Smooth Animations**: Fade-in, slide-up, and scale animations throughout
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Custom Typography**: Outfit font for display text, Inter for body text
- **Accessible**: Keyboard navigation and screen reader friendly

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2
- **Routing**: React Router DOM 6
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Build Tool**: Vite 5
- **Date Handling**: date-fns
- **Charts**: Recharts (for budget visualization)

## 📁 Project Structure

```
globetrotter-app/
├── src/
│   ├── components/
│   │   ├── Layout.jsx              # Main layout with sidebar and header
│   │   ├── common/                 # Reusable components
│   │   └── layout/                 # Layout-specific components
│   ├── pages/
│   │   ├── LoginPage.jsx           # User login
│   │   ├── SignupPage.jsx          # User registration
│   │   ├── Dashboard.jsx           # Main dashboard/home
│   │   ├── CreateTrip.jsx          # Trip creation form
│   │   ├── TripList.jsx            # List all trips
│   │   ├── TripDetails.jsx         # Individual trip view
│   │   ├── ItineraryBuilder.jsx    # Build trip itinerary
│   │   ├── CitySearch.jsx          # Browse and search cities
│   │   ├── ActivitySearch.jsx      # Browse and search activities
│   │   ├── BudgetView.jsx          # Trip budget overview
│   │   └── Profile.jsx             # User profile settings
│   ├── context/
│   │   └── AppContext.jsx          # Global state management
│   ├── data/
│   │   └── mockData.js             # Sample cities and activities
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Utility functions
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and Tailwind
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── postcss.config.js               # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed on your machine

### Installation

1. **Install Dependencies**
```bash
cd globetrotter-app
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 🎨 Design System

### Color Palette

**Primary (Orange/Warm)**
- Used for main actions, CTAs, and primary UI elements
- Shades from 50 to 900 defined in Tailwind config

**Accent (Blue)**
- Used for secondary actions and highlights
- Complements the primary orange color

**Neutral (Gray)**
- Used for text, borders, and backgrounds
- Provides clean, readable interface

### Typography

**Display Font**: Outfit
- Used for headings, titles, and emphasis
- Bold, modern, and distinctive

**Body Font**: Inter
- Used for body text and UI elements
- Highly readable and professional

### Components

All components follow a consistent design language:
- **Cards**: Rounded corners (2xl), subtle shadows, hover effects
- **Buttons**: 3 variants (primary, secondary, ghost) with smooth transitions
- **Inputs**: Rounded (xl), 2px borders, focus states with rings
- **Animations**: Subtle fade-in, slide-up, and scale effects

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Collapsible sidebar on mobile
- Floating action button for quick trip creation
- Touch-friendly tap targets
- Optimized layouts for each screen size

## 🔐 State Management

The application uses React Context API for global state management:

**AppContext** provides:
- User authentication state
- Trip data (CRUD operations)
- City and activity data
- Loading states

Data is persisted in `localStorage` for demo purposes. In production, this would connect to a backend API.

## 🎯 Key User Flows

### 1. Create a New Trip
1. Click "Plan New Trip" from dashboard or sidebar
2. Fill in trip details (name, dates, description, cover image)
3. Redirected to Itinerary Builder
4. Add stops/cities with dates
5. Browse and add activities to each stop
6. View budget breakdown

### 2. Browse Destinations
1. Navigate to "Explore Cities"
2. Search or filter by region
3. View city details (cost index, popularity)
4. Add city directly to an existing trip

### 3. Manage Trips
1. View all trips in "My Trips"
2. Trips organized by status (upcoming, ongoing, completed)
3. Edit, view, or delete trips
4. Share trips with friends (future feature)

## 🔧 Customization

### Adding New Cities
Edit `src/data/mockData.js` and add to the `cities` array:

```javascript
{
  id: 'unique-id',
  name: 'City Name',
  country: 'Country',
  region: 'Region',
  costIndex: 1-5,
  popularity: 0-100,
  image: 'image-url',
  description: 'Description'
}
```

### Adding New Activities
Edit `src/data/mockData.js` and add to the `activities` array:

```javascript
{
  id: 'unique-id',
  name: 'Activity Name',
  cityId: 'linked-city-id',
  category: 'Category',
  duration: hours,
  cost: price,
  description: 'Description',
  image: 'image-url'
}
```

### Customizing Colors
Modify `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ }
}
```

## 🚧 Future Enhancements

- **Backend Integration**: Connect to REST API or GraphQL
- **Real-time Collaboration**: Share and edit trips with friends
- **Map Integration**: Visual map view of itineraries
- **Weather Integration**: Show weather forecasts for destinations
- **Currency Conversion**: Automatic budget conversion
- **Social Features**: Follow friends, like trips, comments
- **Mobile App**: React Native version
- **Offline Support**: PWA with service workers
- **AI Recommendations**: Smart destination and activity suggestions
- **Photo Gallery**: Upload and share travel photos
- **Travel Journal**: Add notes and memories to trips

## 📄 License

This project is created for hackathon purposes. Feel free to use and modify as needed.

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues, please create an issue in the repository.

---

**Built with ❤️ for travelers worldwide**
