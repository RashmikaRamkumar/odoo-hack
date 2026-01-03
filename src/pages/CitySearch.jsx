import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Filter } from 'lucide-react';
import { cities } from '../data/mockData';

const CitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = ['all', ...new Set(cities.map(c => c.region))];
  
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container-custom py-8 space-y-6">
      <div>
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Explore Cities</h1>
        <p className="text-lg text-neutral-600">Discover amazing destinations for your next trip</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search cities or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none"
          />
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 outline-none"
        >
          {regions.map(region => (
            <option key={region} value={region}>
              {region === 'all' ? 'All Regions' : region}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map(city => (
          <div key={city.id} className="card p-0 overflow-hidden hover:scale-105 transition-all group cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">{city.name}</h3>
              <p className="text-neutral-600 mb-3">{city.country}</p>
              <p className="text-sm text-neutral-600 mb-4">{city.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Popularity: {city.popularity}</span>
                </div>
                <span className="badge-primary">Cost: {city.costIndex}/5</span>
              </div>
              <button className="btn-primary w-full mt-4">Add to Trip</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySearch;
