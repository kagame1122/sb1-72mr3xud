import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search data:', searchData);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Beautiful modern home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-emerald-800/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            Rental Home
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover amazing properties with world-class amenities and breathtaking views
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Check In */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check In
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check Out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={searchData.guests}
                  onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5+ Guests</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 mt-6 flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Search Properties</span>
          </button>
        </form>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">500+</div>
            <div className="text-blue-100">Properties</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">98%</div>
            <div className="text-blue-100">Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">50+</div>
            <div className="text-blue-100">Cities</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">24/7</div>
            <div className="text-blue-100">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;