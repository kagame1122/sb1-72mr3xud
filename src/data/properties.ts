import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    description: 'Stunning modern loft in the heart of downtown with floor-to-ceiling windows, exposed brick walls, and premium finishes throughout.',
    price: 2800,
    location: 'Downtown, Seattle',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Gym', 'Rooftop Terrace', 'Concierge', 'Pet Friendly', 'Parking'],
    type: 'apartment',
    rating: 4.8,
    reviews: 32,
    available: true,
    featured: true
  },
  {
    id: '2',
    title: 'Luxury Waterfront Villa',
    description: 'Breathtaking waterfront villa with private beach access, infinity pool, and panoramic ocean views. Perfect for luxury living.',
    price: 5200,
    location: 'Malibu, CA',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Private Beach', 'Pool', 'Spa', 'Wine Cellar', 'Garden'],
    type: 'villa',
    rating: 4.9,
    reviews: 18,
    available: true,
    featured: true
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    description: 'Charming rustic cabin nestled in the mountains with fireplace, hiking trails nearby, and stunning mountain views.',
    price: 1800,
    location: 'Aspen, CO',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Fireplace', 'Mountain Views', 'Hiking', 'WiFi', 'Parking'],
    type: 'house',
    rating: 4.7,
    reviews: 24,
    available: true,
    featured: false
  },
  {
    id: '4',
    title: 'Contemporary City Penthouse',
    description: 'Sophisticated penthouse with 360-degree city views, private elevator, and world-class amenities.',
    price: 4500,
    location: 'Manhattan, NY',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    images: [
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['City Views', 'Gym', 'Concierge', 'Terrace', 'Storage'],
    type: 'condo',
    rating: 4.6,
    reviews: 41,
    available: true,
    featured: true
  },
  {
    id: '5',
    title: 'Suburban Family Home',
    description: 'Spacious family home in quiet neighborhood with large backyard, modern kitchen, and excellent schools nearby.',
    price: 2200,
    location: 'Austin, TX',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Backyard', 'Garage', 'Schools', 'Shopping', 'Parks'],
    type: 'house',
    rating: 4.5,
    reviews: 15,
    available: true,
    featured: false
  },
  {
    id: '6',
    title: 'Artist Studio Loft',
    description: 'Creative loft space with high ceilings, natural light, and industrial charm perfect for artists and creators.',
    price: 1900,
    location: 'Brooklyn, NY',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 900,
    images: [
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',  
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['High Ceilings', 'Natural Light', 'Exposed Brick', 'WiFi', 'Storage'],
    type: 'apartment',
    rating: 4.4,
    reviews: 28,
    available: true,
    featured: false
  }
];