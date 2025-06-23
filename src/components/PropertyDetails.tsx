import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Calendar,
  Users,
  Wifi,
  Car,
  Dumbbell,
  Coffee,
  TreePine,
  Shield
} from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Parking': <Car className="h-5 w-5" />,
    'Gym': <Dumbbell className="h-5 w-5" />,
    'Coffee': <Coffee className="h-5 w-5" />,
    'Garden': <TreePine className="h-5 w-5" />,
    'Security': <Shield className="h-5 w-5" />
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking request:', { property: property.id, checkIn, checkOut, guests });
    alert('Booking request submitted! We will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Properties</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden aspect-square ${
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{property.sqft.toLocaleString()} ft²</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="font-medium text-gray-900 mr-1">{property.rating}</span>
                <span className="text-gray-600">({property.reviews} reviews)</span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {property.description}
              </p>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      {amenityIcons[amenity] || <Shield className="h-5 w-5" />}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${property.price.toLocaleString()}
                </div>
                <div className="text-gray-600">per month</div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check In
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check Out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Request Booking
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  <p>Free cancellation for 48 hours</p>
                  <p className="mt-1">Customer support available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;