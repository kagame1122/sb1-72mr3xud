import React, { useState } from 'react';
import { Home, Menu, X, Search, User, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-xl">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RentHouse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Properties
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              List Property
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Properties
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-full font-medium w-full">
                List Property
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;