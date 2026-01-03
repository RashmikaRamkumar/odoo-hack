import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, IndianRupee, TrendingUp, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BudgetView = () => {
  const { tripId } = useParams();
  const { getTripById } = useApp();
  const trip = getTripById(tripId);

  if (!trip) return null;

  const categories = [
    { name: 'Transport', amount: 500, color: 'bg-primary-500' },
    { name: 'Accommodation', amount: 800, color: 'bg-accent-500' },
    { name: 'Activities', amount: 400, color: 'bg-emerald-500' },
    { name: 'Food', amount: 600, color: 'bg-orange-500' },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="container-custom py-8 space-y-6">
      <Link to={`/trips/${tripId}`} className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Trip</span>
      </Link>

      <div>
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Budget Overview</h1>
        <p className="text-lg text-neutral-600">{trip.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <IndianRupee className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-semibold text-neutral-900 mb-1">Total Budget</h3>
          <p className="text-3xl font-display font-bold text-neutral-900">₹{total.toLocaleString()}</p>
        </div>
        <div className="card">
          <TrendingUp className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-neutral-900 mb-1">Daily Average</h3>
          <p className="text-3xl font-display font-bold text-neutral-900">₹{Math.round(total / 7).toLocaleString()}</p>
        </div>
        <div className="card">
          <PieChart className="w-8 h-8 text-accent-600 mb-3" />
          <h3 className="font-semibold text-neutral-900 mb-1">Categories</h3>
          <p className="text-3xl font-display font-bold text-neutral-900">{categories.length}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">Breakdown by Category</h2>
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-neutral-900">{category.name}</span>
                <span className="font-semibold text-neutral-900">₹{category.amount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${category.color} transition-all duration-500`}
                  style={{ width: `${(category.amount / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetView;
