
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyDetails from './PropertyDetails';
import { Product } from '../types';
import { products } from '../data/properties';

const PropertyGrid: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(products.map(product => product.category)))
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || product.category === category;

    return matchesSearch && matchesCategory && product.available;
  });

  if (selectedProduct) {
    return (
      <PropertyDetails
        property={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Ibicuruzwa byacu
          </h2>
          <p className="text-gray-600 text-lg">
            Hitamo ibicuruzwa wifuza kuri RUBAVU ONLINE MARKET
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-4 top-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Shakisha igicuruzwa..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border bg-white"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(item => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full font-medium ${
                category === item
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              {item === 'All' ? 'Byose' : item}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Ibicuruzwa bibonetse: {filteredProducts.length}
          </p>
          <Filter className="text-emerald-600" />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <PropertyCard
                key={product.id}
                property={product}
                onDetailsClick={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-3">
              Nta bicuruzwa bibonetse
            </h3>
            <p className="text-gray-600">
              Gerageza gushakisha irindi zina cyangwa uhitemo ikindi cyiciro.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default PropertyGrid;
