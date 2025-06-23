export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  amenities: string[];
  type: 'house' | 'apartment' | 'condo' | 'villa';
  rating: number;
  reviews: number;
  available: boolean;
  featured: boolean;
}

export interface SearchFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
}