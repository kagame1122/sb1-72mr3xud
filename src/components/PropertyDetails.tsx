
import React from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Package, Percent } from 'lucide-react';
import { Product } from '../types';

interface PropertyDetailsProps {
  property: Product;
  onClose: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onClose
}) => {
  const [liked, setLiked] = React.useState(false);

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
      alert('Link yakoporowe!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={onClose} className="flex items-center gap-2 text-gray-700">
            <ArrowLeft />
            Subira ku bicuruzwa
          </button>

          <div className="flex gap-3">
            <button onClick={() => setLiked(!liked)} aria-label="Favorite">
              <Heart className={liked ? 'text-red-500 fill-current' : 'text-gray-600'} />
            </button>
            <button onClick={shareProduct} aria-label="Share">
              <Share2 />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm">
              {property.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-4">
              {property.name}
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              {property.description}
            </p>

            <div className="text-3xl font-bold text-emerald-700 mb-6">
              {property.price.toLocaleString()} RWF
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <Package className="text-emerald-600 mb-2" />
                <p className="text-sm text-gray-500">Ibihari mu bubiko</p>
                <strong>{property.stock}</strong>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <Percent className="text-emerald-600 mb-2" />
                <p className="text-sm text-gray-500">Commission</p>
                <strong>{property.commission}%</strong>
              </div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl mb-6">
              <p className="text-emerald-800 font-semibold">
                Amafaranga wakwinjiza kuri buri gicuruzwa
              </p>
              <p className="text-2xl font-bold text-emerald-700 mt-2">
                {(property.price * property.commission / 100).toLocaleString()} RWF
              </p>
            </div>

            <button
              onClick={shareProduct}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700"
            >
              <ShoppingCart className="inline mr-2" />
              Sangiza abandi iki gicuruzwa
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Commission ni urugero rwerekanwa gusa. Kwishyurwa bisaba affiliate tracking ikora.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
