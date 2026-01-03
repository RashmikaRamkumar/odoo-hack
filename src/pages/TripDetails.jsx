import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Edit, Trash2, Share2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TripDetails = () => {
  const { tripId } = useParams();
  const { getTripById, deleteTrip } = useApp();
  const navigate = useNavigate();
  const trip = getTripById(tripId);

  if (!trip) {
    return (
      <div className="container-custom py-8">
        <div className="card text-center py-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Trip not found</h2>
          <p className="text-neutral-600 mb-6">The trip you're looking for doesn't exist</p>
          <Link to="/trips" className="btn-primary">Back to Trips</Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${trip.name}"?`)) {
      deleteTrip(tripId);
      navigate('/trips');
    }
  };

  return (
    <div className="container-custom py-8 space-y-6">
      <Link to="/trips" className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-4">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Trips</span>
      </Link>

      {trip.coverImage && (
        <div className="aspect-[21/9] rounded-3xl overflow-hidden">
          <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">{trip.name}</h1>
          {trip.description && <p className="text-lg text-neutral-600">{trip.description}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-ghost">
            <Share2 className="w-5 h-5" />
          </button>
          <Link to={`/trips/${tripId}/itinerary`} className="btn-secondary">
            <Edit className="w-5 h-5 mr-2" />
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-secondary text-red-600 hover:bg-red-50">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <Calendar className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-neutral-900 mb-1">Duration</h3>
          <p className="text-sm text-neutral-600">
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="card">
          <MapPin className="w-8 h-8 text-accent-600 mb-3" />
          <h3 className="font-semibold text-neutral-900 mb-1">Destinations</h3>
          <p className="text-sm text-neutral-600">{trip.stops?.length || 0} stops</p>
        </div>
        <div className="card">
          <DollarSign className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-semibold text-neutral-900 mb-1">Budget</h3>
          <p className="text-sm text-neutral-600">${trip.budget || 0}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">Itinerary</h2>
        {trip.stops && trip.stops.length > 0 ? (
          <div className="space-y-4">
            {trip.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{stop.city}</h3>
                  <p className="text-sm text-neutral-600">{stop.country}</p>
                  {stop.activities && stop.activities.length > 0 && (
                    <p className="text-sm text-neutral-500 mt-2">{stop.activities.length} activities</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-600 mb-4">No stops added yet</p>
            <Link to={`/trips/${tripId}/itinerary`} className="btn-primary">
              Build Itinerary
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
