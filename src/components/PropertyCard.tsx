import React from 'react';
import { Heart, Star, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onDetailsClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onDetailsClick }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {property.featured && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          )}
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
            {property.type}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
            } transition-colors`}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-2xl font-bold text-gray-900">${property.price.toLocaleString()}</span>
          <span className="text-gray-600">/month</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4 text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.sqft.toLocaleString()} ft²</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-900">{property.rating}</span>
            <span className="text-sm text-gray-600 ml-1">({property.reviews} reviews)</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.available 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {property.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onDetailsClick(property)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            View Details
          </button>
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;