
import React, { useState } from 'react';
import {
  Search, ShoppingCart, Heart, Smartphone,
  Shirt, Laptop, Home, Watch
} from 'lucide-react';

const products = [
  { id: 1, name: 'Smartphone', price: 150000, category: 'Electronics', icon: Smartphone, emoji: '📱' },
  { id: 2, name: 'Imyenda', price: 12000, category: 'Fashion', icon: Shirt, emoji: '👕' },
  { id: 3, name: 'Laptop', price: 450000, category: 'Electronics', icon: Laptop, emoji: '💻' },
  { id: 4, name: 'Ibikoresho byo mu rugo', price: 25000, category: 'Home', icon: Home, emoji: '🏠' },
  { id: 5, name: 'Isaha', price: 30000, category: 'Fashion', icon: Watch, emoji: '⌚' },
  { id: 6, name: 'Inkweto', price: 20000, category: 'Fashion', icon: Shirt, emoji: '👟' },
];

const Products: React.FC = () => {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<number[]>([]);

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 text-center mb-2">
          RUBAVU ONLINE MARKET
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Murakaza neza! Dore ibicuruzwa bihari.
        </p>

        <div className="flex bg-white rounded-xl p-3 mb-8 shadow">
          <Search className="text-gray-500 mr-2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Shakisha igicuruzwa..."
            className="w-full outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow p-5">
              <div className="text-7xl text-center py-8 bg-gray-50 rounded-xl">
                {product.emoji}
              </div>

              <h2 className="text-xl font-bold mt-4">
                {product.name}
              </h2>

              <p className="text-emerald-700 font-bold text-lg my-3">
                {product.price.toLocaleString()} RWF
              </p>

              <button
                onClick={() => setCart([...cart, product.id])}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold"
              >
                <ShoppingCart className="inline mr-2" size={18} />
                Shyira mu gitebo
              </button>
            </div>
          ))}
        </div>

        <div className="fixed bottom-5 right-5 bg-emerald-700 text-white rounded-full p-4 shadow-lg">
          <ShoppingCart className="inline mr-2" />
          {cart.length}
        </div>
      </div>
    </div>
  );
};

export default Products;
