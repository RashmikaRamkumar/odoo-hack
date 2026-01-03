import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, MapPin, Calendar, ArrowLeft, GripVertical, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ItineraryBuilder = () => {
  const { tripId } = useParams();
  const { getTripById, addStopToTrip, deleteStop } = useApp();
  const trip = getTripById(tripId);
  const [showAddStop, setShowAddStop] = useState(false);
  const [newStop, setNewStop] = useState({
    city: '',
    country: '',
    startDate: '',
    endDate: ''
  });

  const handleAddStop = (e) => {
    e.preventDefault();
    addStopToTrip(tripId, newStop);
    setNewStop({ city: '', country: '', startDate: '', endDate: '' });
    setShowAddStop(false);
  };

  if (!trip) {
    return (
      <div className="container-custom py-8">
        <div className="card text-center py-16">
          <h2 className="text-2xl font-bold">Trip not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 space-y-6">
      <Link to={`/trips/${tripId}`} className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Trip</span>
      </Link>

      <div>
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
          Build Your Itinerary
        </h1>
        <p className="text-lg text-neutral-600">Add destinations and activities to {trip.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {trip.stops && trip.stops.map((stop, index) => (
            <div key={stop.id} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">
                    {stop.city}
                  </h3>
                  <p className="text-neutral-600 mb-3">{stop.country}</p>
                  {stop.startDate && stop.endDate && (
                    <div className="flex items-center space-x-2 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteStop(tripId, stop.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}

          {showAddStop ? (
            <div className="card">
              <h3 className="font-display font-bold text-neutral-900 mb-4">Add New Stop</h3>
              <form onSubmit={handleAddStop} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={newStop.city}
                    onChange={(e) => setNewStop({ ...newStop, city: e.target.value })}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={newStop.country}
                    onChange={(e) => setNewStop({ ...newStop, country: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={newStop.startDate}
                    onChange={(e) => setNewStop({ ...newStop, startDate: e.target.value })}
                    required
                    className="input-field"
                  />
                  <input
                    type="date"
                    value={newStop.endDate}
                    onChange={(e) => setNewStop({ ...newStop, endDate: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="btn-primary">Add Stop</button>
                  <button
                    type="button"
                    onClick={() => setShowAddStop(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowAddStop(true)}
              className="w-full card hover:bg-primary-50 border-2 border-dashed border-primary-300 flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Add Stop</span>
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="card sticky top-8">
            <h3 className="font-display font-bold text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/cities" className="btn-secondary w-full flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Browse Cities</span>
              </Link>
              <Link to={`/trips/${tripId}/budget`} className="btn-secondary w-full flex items-center justify-center">
                <span>Budget Overview</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
