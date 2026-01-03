import React, { createContext, useContext, useState, useEffect } from 'react';
import { cities as mockCities, activities as mockActivities } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState(mockCities);
  const [activities, setActivities] = useState(mockActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Check if user is logged in (from localStorage)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      const tripsData = localStorage.getItem('trips');
      if (tripsData) {
        setTrips(JSON.parse(tripsData));
      }
    }
  };

  // Auth functions
  const login = (email, password) => {
    setIsLoading(true);
    setError(null);
    // Mock login - just store user info
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: email
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setTrips([]);
    localStorage.removeItem('user');
    localStorage.removeItem('trips');
  };

  const signup = (userData) => {
    setIsLoading(true);
    setError(null);
    // Mock signup - just store user info
    const newUser = {
      id: '1',
      name: userData.name,
      email: userData.email
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
    return newUser;
  };

  // Trip functions
  const createTrip = (tripData) => {
    setIsLoading(true);
    setError(null);
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
      stops: [],
      createdAt: new Date().toISOString()
    };
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
    return newTrip;
  };

  const updateTrip = (tripId, updates) => {
    setIsLoading(true);
    setError(null);
    const updatedTrips = trips.map(trip =>
      trip.id === tripId ? { ...trip, ...updates } : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
    return updatedTrips.find(t => t.id === tripId);
  };

  const deleteTrip = (tripId) => {
    setIsLoading(true);
    setError(null);
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
  };

  const getTripById = (tripId) => {
    return trips.find(trip => trip.id === tripId);
  };

  // Stop functions
  const addStopToTrip = (tripId, stopData) => {
    setIsLoading(true);
    setError(null);
    const newStop = {
      id: Date.now().toString(),
      ...stopData,
      activities: []
    };
    const updatedTrips = trips.map(trip =>
      trip.id === tripId
        ? { ...trip, stops: [...(trip.stops || []), newStop] }
        : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
    return newStop;
  };

  const deleteStop = (tripId, stopId) => {
    setIsLoading(true);
    setError(null);
    const updatedTrips = trips.map(trip =>
      trip.id === tripId
        ? { ...trip, stops: trip.stops.filter(s => s.id !== stopId) }
        : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
  };

  // Activity functions
  const addActivityToStop = (tripId, stopId, activityId) => {
    setIsLoading(true);
    setError(null);
    const activity = activities.find(a => a.id === activityId);
    const updatedTrips = trips.map(trip =>
      trip.id === tripId
        ? {
            ...trip,
            stops: trip.stops.map(stop =>
              stop.id === stopId
                ? { ...stop, activities: [...(stop.activities || []), activity] }
                : stop
            )
          }
        : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
    return activity;
  };

  const removeActivityFromStop = (tripId, stopId, activityId) => {
    setIsLoading(true);
    setError(null);
    const updatedTrips = trips.map(trip =>
      trip.id === tripId
        ? {
            ...trip,
            stops: trip.stops.map(stop =>
              stop.id === stopId
                ? {
                    ...stop,
                    activities: stop.activities.filter(a => a.id !== activityId)
                  }
                : stop
            )
          }
        : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setIsLoading(false);
  };

  // City functions
  const searchCities = (query) => {
    setIsLoading(true);
    setError(null);
    if (query) {
      const filtered = mockCities.filter(
        city =>
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.country.toLowerCase().includes(query.toLowerCase())
      );
      setCities(filtered);
      setIsLoading(false);
      return filtered;
    }
    setCities(mockCities);
    setIsLoading(false);
    return mockCities;
  };

  // Activity functions
  const getActivitiesByCity = (cityId) => {
    setIsLoading(true);
    setError(null);
    const cityActivities = mockActivities.filter(a => a.cityId === cityId);
    setActivities(cityActivities);
    setIsLoading(false);
    return cityActivities;
  };

  const value = {
    user,
    trips,
    cities,
    activities,
    isLoading,
    error,
    login,
    logout,
    signup,
    createTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    addStopToTrip,
    deleteStop,
    addActivityToStop,
    removeActivityFromStop,
    searchCities,
    getActivitiesByCity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
