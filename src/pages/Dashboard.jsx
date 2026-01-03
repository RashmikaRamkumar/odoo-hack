import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Globe,
  Sparkles,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { popularDestinations } from '../data/mockData';

const Dashboard = () => {
  const { user, trips } = useApp();

  const upcomingTrips = trips.filter(trip => 
    new Date(trip.startDate) > new Date()
  ).slice(0, 3);

  const stats = [
    { 
      label: 'Total Trips', 
      value: trips.length, 
      icon: MapPin, 
      color: 'from-primary-500 to-orange-500',
      bgColor: 'bg-primary-50'
    },
    { 
      label: 'Countries Visited', 
      value: new Set(trips.flatMap(t => t.stops?.map(s => s.country) || [])).size, 
      icon: Globe, 
      color: 'from-accent-500 to-blue-500',
      bgColor: 'bg-accent-50'
    },
    { 
      label: 'Total Spent', 
      value: `$${trips.reduce((sum, t) => sum + (t.budget || 0), 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50'
    },
  ];

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-primary-500 via-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-white/90 font-medium">Welcome back,</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
              {user?.name || 'Traveler'}!
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Ready to plan your next adventure? Explore destinations, build itineraries, and track your travel memories.
            </p>
          </div>
          <Link
            to="/trips/new"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 self-start md:self-center"
          >
            <Plus className="w-5 h-5" />
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="card hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                  <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                  <p className="text-3xl font-display font-bold text-neutral-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Trips */}
      <div className="animate-slide-up animate-delay-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900">
            Upcoming Trips
          </h2>
          <Link
            to="/trips"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 group"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {upcomingTrips.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No upcoming trips yet
            </h3>
            <p className="text-neutral-600 mb-6">
              Start planning your next adventure today!
            </p>
            <Link to="/trips/new" className="btn-primary inline-flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create Your First Trip</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTrips.map((trip, index) => (
              <Link
                key={trip.id}
                to={`/trips/${trip.id}`}
                className="card hover:scale-105 transition-all duration-200 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary-200 to-accent-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {trip.coverImage ? (
                    <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
                  ) : (
                    <MapPin className="w-12 h-12 text-primary-600" />
                  )}
                </div>
                <h3 className="text-lg font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {trip.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(trip.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} - {new Date(trip.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="badge-primary">
                    {trip.stops?.length || 0} stops
                  </span>
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular Destinations */}
      <div className="animate-slide-up animate-delay-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900">
            Popular Destinations
          </h2>
          <Link
            to="/cities"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 group"
          >
            <span>Explore more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="card p-0 overflow-hidden hover:scale-105 transition-all duration-200 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-neutral-900 mb-1">
                  {destination.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-3">{destination.country}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-neutral-700">{destination.rating}</span>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Add to trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
