import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
import TripDetails from './pages/TripDetails';
import ItineraryBuilder from './pages/ItineraryBuilder';
import CitySearch from './pages/CitySearch';
import ActivitySearch from './pages/ActivitySearch';
import BudgetView from './pages/BudgetView';
import Profile from './pages/Profile';

// Components
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useApp();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trips" element={<TripList />} />
        <Route path="trips/new" element={<CreateTrip />} />
        <Route path="trips/:tripId" element={<TripDetails />} />
        <Route path="trips/:tripId/itinerary" element={<ItineraryBuilder />} />
        <Route path="trips/:tripId/budget" element={<BudgetView />} />
        <Route path="cities" element={<CitySearch />} />
        <Route path="activities" element={<ActivitySearch />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
