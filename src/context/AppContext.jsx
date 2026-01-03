import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Load from localStorage or API
    const savedUser = localStorage.getItem('user');
    const savedTrips = localStorage.getItem('trips');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  };

  // Auth functions
  const login = (email, password) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: 'Travel Enthusiast',
        email: email,
        avatar: null
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = (userData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        ...userData
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  // Trip functions
  const createTrip = (tripData) => {
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
      userId: user?.id,
      createdAt: new Date().toISOString(),
      stops: [],
      budget: 0
    };
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    return newTrip;
  };

  const updateTrip = (tripId, updates) => {
    const updatedTrips = trips.map(trip =>
      trip.id === tripId ? { ...trip, ...updates } : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };

  const deleteTrip = (tripId) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };

  const getTripById = (tripId) => {
    return trips.find(trip => trip.id === tripId);
  };

  // Stop functions
  const addStopToTrip = (tripId, stopData) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const newStop = {
      id: Date.now().toString(),
      ...stopData,
      activities: []
    };

    const updatedTrip = {
      ...trip,
      stops: [...trip.stops, newStop]
    };

    updateTrip(tripId, updatedTrip);
  };

  const updateStop = (tripId, stopId, updates) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedStops = trip.stops.map(stop =>
      stop.id === stopId ? { ...stop, ...updates } : stop
    );

    updateTrip(tripId, { stops: updatedStops });
  };

  const deleteStop = (tripId, stopId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedStops = trip.stops.filter(stop => stop.id !== stopId);
    updateTrip(tripId, { stops: updatedStops });
  };

  // Activity functions
  const addActivityToStop = (tripId, stopId, activityData) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const updatedStops = trip.stops.map(stop => {
      if (stop.id === stopId) {
        const newActivity = {
          id: Date.now().toString(),
          ...activityData
        };
        return {
          ...stop,
          activities: [...stop.activities, newActivity]
        };
      }
      return stop;
    });

    updateTrip(tripId, { stops: updatedStops });
  };

  const value = {
    user,
    trips,
    cities,
    activities,
    isLoading,
    login,
    logout,
    signup,
    createTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    addStopToTrip,
    updateStop,
    deleteStop,
    addActivityToStop
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
