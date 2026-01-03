import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Image as ImageIcon, FileText, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CreateTrip = () => {
  const navigate = useNavigate();
  const { createTrip } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, coverImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = createTrip(formData);
    navigate(`/trips/${newTrip.id}/itinerary`);
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Plan a New Trip
          </h1>
          <p className="text-lg text-neutral-600">
            Start by giving your trip a name and setting the dates
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up animate-delay-100">
          {/* Cover Image */}
          <div className="card">
            <label className="block text-sm font-semibold text-neutral-700 mb-4">
              Cover Image (Optional)
            </label>
            {previewImage ? (
              <div className="relative aspect-video rounded-xl overflow-hidden group">
                <img
                  src={previewImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage('');
                    setFormData({ ...formData, coverImage: '' });
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            ) : (
              <label className="aspect-video border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-200">
                <ImageIcon className="w-12 h-12 text-neutral-400 mb-3" />
                <p className="text-sm font-medium text-neutral-600 mb-1">
                  Click to upload cover image
                </p>
                <p className="text-xs text-neutral-500">
                  PNG, JPG up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Trip Name */}
          <div className="card">
            <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-3">
              Trip Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., European Summer Adventure"
              required
              className="input-field"
            />
          </div>

          {/* Date Range */}
          <div className="card">
            <label className="block text-sm font-semibold text-neutral-700 mb-4">
              Travel Dates
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-xs font-medium text-neutral-600 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-xs font-medium text-neutral-600 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    min={formData.startDate}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            {formData.startDate && formData.endDate && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  Trip duration:{' '}
                  <span className="font-semibold">
                    {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="card">
            <label htmlFor="description" className="block text-sm font-semibold text-neutral-700 mb-3">
              Trip Description (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your trip, what you're looking forward to, or any special notes..."
                rows="5"
                className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/trips')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2 group"
            >
              <span>Create Trip</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-br from-accent-50 to-blue-50 rounded-2xl border border-accent-100 animate-slide-up animate-delay-200">
          <h3 className="font-display font-semibold text-neutral-900 mb-3">
            Pro Tips for Planning
          </h3>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex items-start space-x-2">
              <span className="text-primary-600">•</span>
              <span>Add a descriptive name to help you remember your trip</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600">•</span>
              <span>Be flexible with your dates if you're still deciding</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600">•</span>
              <span>You can always edit trip details later</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600">•</span>
              <span>After creating, you'll build your itinerary by adding cities and activities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
