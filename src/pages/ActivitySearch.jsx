import React, { useState } from 'react';
import { Search, Clock, IndianRupee } from 'lucide-react';
import { activities } from '../data/mockData';

const ActivitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(activities.map(a => a.category))];
  
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-custom py-8 space-y-6">
      <div>
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Activities</h1>
        <p className="text-lg text-neutral-600">Find exciting things to do on your trip</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 outline-none"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(activity => (
          <div key={activity.id} className="card p-0 overflow-hidden hover:scale-105 transition-all group">
            <div className="aspect-video overflow-hidden">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <span className="badge-accent mb-3">{activity.category}</span>
              <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">{activity.name}</h3>
              <p className="text-sm text-neutral-600 mb-4">{activity.description}</p>
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center space-x-1 text-neutral-600">
                  <Clock className="w-4 h-4" />
                  <span>{activity.duration}h</span>
                </div>
                <div className="flex items-center space-x-1 text-neutral-600">
                  <IndianRupee className="w-4 h-4" />
                  <span>₹{activity.cost}</span>
                </div>
              </div>
              <button className="btn-primary w-full">Add to Itinerary</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySearch;
