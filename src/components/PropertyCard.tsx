
import React from 'react';
import { Heart, ShoppingCart, Share2, Package } from 'lucide-react';
import { Product } from '../types';

interface PropertyCardProps {
  property: Product;
  onDetailsClick: (product: Product) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onDetailsClick
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const shareProduct = async () => {
    const link = `${window.location.origin}/?product=${property.id}`;
    if (navigator.share) {
      await navigator.share({
        title: property.name,
        text: property.description,
        url: link
      });
    } else {
      await navigator.clipboard.writeText(link);
      alert('Link y’igicuruzwa yakoporowe!');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-64 object-cover"
        />

        {property.featured && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
            Icyamamare
          </span>
        )}

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full"
          aria-label="Favorite"
        >
          <Heart className={isLiked ? 'text-red-500 fill-current' : 'text-gray-600'} />
        </button>
      </div>

      <div className="p-6">
        <span className="text-sm text-emerald-700 font-semibold">
          {property.category}
        </span>

        <h3 className="text-xl font-bold text-gray-900 mt-2">
          {property.name}
        </h3>

        <p className="text-gray-600 text-sm my-3">
          {property.description}
        </p>

        <p className="text-2xl font-bold text-emerald-700">
          {property.price.toLocaleString()} RWF
        </p>

        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span className="flex items-center gap-1">
            <Package size={16} />
            Stock: {property.stock}
          </span>
          <span>Commission: {property.commission}%</span>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onDetailsClick(property)}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold"
          >
            <ShoppingCart className="inline mr-2" size={18} />
            Reba igicuruzwa
          </button>

          <button
            onClick={shareProduct}
            className="px-4 border-2 border-emerald-600 text-emerald-700 rounded-xl"
            aria-label="Share product"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
