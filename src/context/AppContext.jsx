import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI, cityAPI, activityAPI, tripAPI } from '../services/api';

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
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await userAPI.getProfile();
        setUser(userResponse.data);
        
        // Load trips
        const tripsResponse = await tripAPI.getAllTrips();
        setTrips(tripsResponse.data);
      }

      // Load cities (public data)
      const citiesResponse = await cityAPI.getAllCities();
      setCities(citiesResponse.data);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError(err.message);
    }
  };

  // Auth functions
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userAPI.login({ email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userData);
      
      // Load user's trips
      const tripsResponse = await tripAPI.getAllTrips();
      setTrips(tripsResponse.data);
      
      setIsLoading(false);
      return userData;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setTrips([]);
    localStorage.removeItem('token');
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userAPI.register(userData);
      const { token, user: newUser } = response.data;
      
      localStorage.setItem('token', token);
      setUser(newUser);
      setIsLoading(false);
      return newUser;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  // Trip functions
  const createTrip = async (tripData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripAPI.createTrip(tripData);
      const newTrip = response.data;
      setTrips([...trips, newTrip]);
      setIsLoading(false);
      return newTrip;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const updateTrip = async (tripId, updates) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripAPI.updateTrip(tripId, updates);
      const updatedTrip = response.data;
      setTrips(trips.map(trip => trip._id === tripId ? updatedTrip : trip));
      setIsLoading(false);
      return updatedTrip;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const deleteTrip = async (tripId) => {
    setIsLoading(true);
    setError(null);
    try {
      await tripAPI.deleteTrip(tripId);
      setTrips(trips.filter(trip => trip._id !== tripId));
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const getTripById = (tripId) => {
    return trips.find(trip => trip._id === tripId);
  };

  // Stop functions
  const addStopToTrip = async (tripId, stopData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripAPI.addStop(tripId, stopData);
      const newStop = response.data;
      
      // Update the trip with the new stop
      const updatedTrip = trips.find(t => t._id === tripId);
      if (updatedTrip) {
        updatedTrip.stops = [...(updatedTrip.stops || []), newStop._id];
      }
      
      setIsLoading(false);
      return newStop;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const deleteStop = async (tripId, stopId) => {
    setIsLoading(true);
    setError(null);
    try {
      await tripAPI.deleteStop(tripId, stopId);
      const updatedTrip = trips.find(t => t._id === tripId);
      if (updatedTrip) {
        updatedTrip.stops = updatedTrip.stops.filter(s => s._id !== stopId);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  // Activity functions
  const addActivityToStop = async (tripId, stopId, activityId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripAPI.addActivity(tripId, stopId, activityId);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const removeActivityFromStop = async (tripId, stopId, activityId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripAPI.removeActivity(tripId, stopId, activityId);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  // City functions
  const searchCities = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cityAPI.getAllCities({ search: query });
      setCities(response.data);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
  };

  // Activity functions
  const getActivitiesByCity = async (cityId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await activityAPI.getActivitiesByCity(cityId);
      const cityActivities = response.data;
      setActivities(cityActivities);
      setIsLoading(false);
      return cityActivities;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setIsLoading(false);
      throw err;
    }
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
