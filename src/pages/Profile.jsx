import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">Profile Settings</h1>
          <p className="text-lg text-neutral-600">Manage your account information</p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-neutral-900">{user?.name}</h2>
              <p className="text-neutral-600">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
