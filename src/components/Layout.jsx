import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Compass, 
  MapPin, 
  Calendar, 
  User, 
  LogOut, 
  Menu, 
  X,
  Search,
  Plane
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: Compass },
    { name: 'My Trips', path: '/trips', icon: MapPin },
    { name: 'Explore Cities', path: '/cities', icon: Globe },
    { name: 'Activities', path: '/activities', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                GlobeTrotter
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl font-medium
                    transition-all duration-200 group
                    ${active
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200'
                      : 'text-neutral-700 hover:bg-neutral-100'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${active ? '' : 'group-hover:scale-110 transition-transform'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-100">
            <div className="flex items-center space-x-3 px-4 py-3 bg-neutral-50 rounded-xl mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-neutral-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0 lg:ml-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search destinations, activities..."
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-transparent focus:border-primary-300 focus:bg-white rounded-xl transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/trips/new"
                className="btn-primary flex items-center space-x-2"
              >
                <Plane className="w-5 h-5" />
                <span>New Trip</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>

      {/* Mobile FAB */}
      <Link
        to="/trips/new"
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-transform"
      >
        <Plane className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Layout;
