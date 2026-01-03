import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TripList = () => {
  const { trips, deleteTrip } = useApp();

  const handleDelete = (tripId, tripName) => {
    if (window.confirm(`Are you sure you want to delete "${tripName}"?`)) {
      deleteTrip(tripId);
    }
  };

  const tripsByStatus = {
    upcoming: trips.filter(t => new Date(t.startDate) > new Date()),
    ongoing: trips.filter(t => {
      const now = new Date();
      return new Date(t.startDate) <= now && new Date(t.endDate) >= now;
    }),
    completed: trips.filter(t => new Date(t.endDate) < new Date())
  };

  const TripCard = ({ trip }) => (
    <div className="card group hover:scale-105 transition-all duration-200">
      <div className="aspect-video bg-gradient-to-br from-primary-200 to-accent-200 rounded-xl mb-4 overflow-hidden">
        {trip.coverImage ? (
          <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-16 h-16 text-primary-600" />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
        {trip.name}
      </h3>
      
      <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-4">
        <Calendar className="w-4 h-4" />
        <span>
          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </span>
      </div>
      
      {trip.description && (
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{trip.description}</p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="badge-primary">{trip.stops?.length || 0} stops</span>
        
        <div className="flex items-center space-x-2">
          <Link
            to={`/trips/${trip.id}`}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="w-5 h-5 text-neutral-600" />
          </Link>
          <Link
            to={`/trips/${trip.id}/itinerary`}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-5 h-5 text-neutral-600" />
          </Link>
          <button
            onClick={() => handleDelete(trip.id, trip.name)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-custom py-8 space-y-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">My Trips</h1>
          <p className="text-lg text-neutral-600">Manage all your travel plans in one place</p>
        </div>
        <Link to="/trips/new" className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Trip</span>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="card text-center py-16 animate-fade-in">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-10 h-10 text-neutral-400" />
          </div>
          <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
            No trips yet
          </h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            Start planning your first adventure and create memories that will last a lifetime
          </p>
          <Link to="/trips/new" className="btn-primary inline-flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Your First Trip</span>
          </Link>
        </div>
      ) : (
        <>
          {tripsByStatus.ongoing.length > 0 && (
            <div className="animate-slide-up">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Ongoing Trips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripsByStatus.ongoing.map(trip => <TripCard key={trip.id} trip={trip} />)}
              </div>
            </div>
          )}

          {tripsByStatus.upcoming.length > 0 && (
            <div className="animate-slide-up animate-delay-100">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Upcoming Trips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripsByStatus.upcoming.map(trip => <TripCard key={trip.id} trip={trip} />)}
              </div>
            </div>
          )}

          {tripsByStatus.completed.length > 0 && (
            <div className="animate-slide-up animate-delay-200">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Completed Trips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripsByStatus.completed.map(trip => <TripCard key={trip.id} trip={trip} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripList;
