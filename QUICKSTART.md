# Quick Start Guide - GlobeTrotter

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies
```bash
cd globetrotter-app
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```

### Step 3: Open Your Browser
Navigate to: `http://localhost:3000`

## 🎮 Demo Credentials

For testing, use any email and password combination:
- Email: `demo@globetrotter.com`
- Password: `password123`

The app uses localStorage for demo purposes, so your data persists in your browser.

## 🗺️ First Steps After Login

1. **Explore the Dashboard** - See your stats and popular destinations
2. **Create Your First Trip** - Click "Plan New Trip"
3. **Build Your Itinerary** - Add cities and activities
4. **Browse Destinations** - Check out cities in the "Explore Cities" section
5. **Manage Your Profile** - Update your information in Profile settings

## 📱 Key Features to Try

### Trip Creation Flow
1. Dashboard → "Plan New Trip" button
2. Enter trip name, dates, and optional cover image
3. Add description
4. Click "Create Trip"
5. You'll be taken to the Itinerary Builder

### Adding Stops to a Trip
1. In Itinerary Builder, click "Add Stop"
2. Enter city name and country
3. Set arrival and departure dates
4. Click "Add Stop"
5. Repeat for multiple destinations

### Browsing Cities
1. Navigate to "Explore Cities" from sidebar
2. Use the search bar to find specific cities
3. Filter by region (Europe, Asia, etc.)
4. Click "Add to Trip" to include in itinerary

### Budget Tracking
1. Open any trip
2. Click "Budget Overview"
3. View breakdown by category
4. See daily averages

## 🎨 UI Highlights

- **Smooth Animations**: Watch for fade-in and slide-up effects
- **Responsive Design**: Try resizing your browser
- **Mobile Menu**: On mobile, tap the hamburger menu
- **Hover Effects**: Hover over cards and buttons for subtle animations
- **Color-Coded Stats**: Different colors for different metrics

## 🛠️ Customization Quick Tips

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  500: '#your-color',
  600: '#your-darker-color',
  // ... other shades
}
```

### Add More Cities
Edit `src/data/mockData.js` and add to the `cities` array.

### Add More Activities
Edit `src/data/mockData.js` and add to the `activities` array.

## 📊 Project Stats

- **13 Pages**: Complete user flows from login to budget tracking
- **1 Main Layout**: Consistent design across all pages
- **Global State Management**: React Context for data sharing
- **Responsive**: Works on mobile, tablet, and desktop
- **Modern Stack**: React 18, Tailwind CSS 3, Vite 5

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically try the next available port (3001, 3002, etc.)

### Dependencies Not Installing
Make sure you have Node.js 16+ installed:
```bash
node --version
```

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. **Read the full README.md** for detailed documentation
2. **Explore the code structure** to understand the architecture
3. **Customize the design** to match your branding
4. **Add backend integration** for production use
5. **Deploy** to Vercel, Netlify, or your preferred host

## 🎯 Recommended Learning Path

1. Start with `src/App.jsx` to understand routing
2. Check `src/context/AppContext.jsx` for state management
3. Look at `src/pages/Dashboard.jsx` as a page example
4. Review `src/components/Layout.jsx` for the main layout
5. Explore `tailwind.config.js` for the design system

---

**Happy Coding! ✈️**
