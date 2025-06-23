import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyDetails from './PropertyDetails';
import { Property } from '../types';
import { properties } from '../data/properties';

const PropertyGrid: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    location: ''
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = properties.filter(property => {
      const matchesPrice = property.price >= currentFilters.priceRange[0] && 
                          property.price <= currentFilters.priceRange[1];
      const matchesBedrooms = !currentFilters.bedrooms || 
                            property.bedrooms >= parseInt(currentFilters.bedrooms);
      const matchesBathrooms = !currentFilters.bathrooms || 
                             property.bathrooms >= parseInt(currentFilters.bathrooms);
      const matchesType = !currentFilters.propertyType || 
                         property.type === currentFilters.propertyType;
      const matchesLocation = !currentFilters.location || 
                            property.location.toLowerCase().includes(currentFilters.location.toLowerCase());

      return matchesPrice && matchesBedrooms && matchesBathrooms && matchesType && matchesLocation;
    });

    setFilteredProperties(filtered);
  };

  const handleDetailsClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  if (selectedProperty) {
    return <PropertyDetails property={selectedProperty} onClose={handleCloseDetails} />;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium rental properties
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-700 font-medium">
              {filteredProperties.length} properties found
            </span>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">
                    $0 - ${filters.priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Bathrooms
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Search location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={() => {
                setFilters({
                  priceRange: [0, 10000],
                  bedrooms: '',
                  bathrooms: '',
                  propertyType: '',
                  location: ''
                });
                setFilteredProperties(properties);
              }}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;