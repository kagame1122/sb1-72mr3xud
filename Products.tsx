
import React, { useEffect, useState } from 'react';
import { supabase } from './src/supabase';
import { Search, ShoppingCart, Plus, Trash2, Image } from 'lucide-react';

type Product = {
  id: number;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  status: string;
  category: string;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('rw');

  const words: Record<string, Record<string, string>> = {
    rw: {
      welcome: 'Murakaza neza! Dore ibicuruzwa bihari.',
      search: 'Shakisha igicuruzwa...',
      add: 'Ongeramo igicuruzwa',
      title: 'Izina ry’igicuruzwa',
      description: 'Ibisobanuro',
      price: 'Igiciro muri RWF',
      category: 'Icyiciro',
      photo: 'Hitamo ifoto',
      save: 'Bika igicuruzwa',
      cart: 'Shyira mu gitebo',
      pending: 'Gitegereje kwemezwa',
      approved: 'Cyemejwe',
      delete: 'Siba',
      empty: 'Nta bicuruzwa bibonetse.',
      loading: 'Tegereza...',
    },
    en: {
      welcome: 'Welcome! Here are available products.',
      search: 'Search products...',
      add: 'Add a product',
      title: 'Product name',
      description: 'Description',
      price: 'Price in RWF',
      category: 'Category',
      photo: 'Choose photo',
      save: 'Save product',
      cart: 'Add to cart',
      pending: 'Awaiting approval',
      approved: 'Approved',
      delete: 'Delete',
      empty: 'No products found.',
      loading: 'Please wait...',
    },
    fr: {
      welcome: 'Bienvenue ! Voici les produits disponibles.',
      search: 'Rechercher un produit...',
      add: 'Ajouter un produit',
      title: 'Nom du produit',
      description: 'Description',
      price: 'Prix en RWF',
      category: 'Catégorie',
      photo: 'Choisir une photo',
      save: 'Enregistrer le produit',
      cart: 'Ajouter au panier',
      pending: 'En attente de validation',
      approved: 'Approuvé',
      delete: 'Supprimer',
      empty: 'Aucun produit trouvé.',
      loading: 'Veuillez patienter...',
    },
  };

  const t = words[language];

  const loadProducts = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    setUserId(user?.id || '');

    const { data, error } = await supabase
  .from('products')
  .select('*');

    if (error) {
      setMessage('Ikibazo mu kubona ibicuruzwa: ' + error.message);
      return;
    }

    setProducts((data || []) as Product[]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!userId) {
      setMessage('Banza winjire muri konti yawe.');
      return;
    }

    if (!title.trim() || !price || Number(price) <= 0) {
      setMessage('Uzuza izina n’igiciro cy’igicuruzwa.');
      return;
    }

    setLoading(true);

    let imageUrl: string | null = null;

    if (photo) {
      const safeName = photo.name.replace(/[^a-zA-Z0-9.-]/g, '-');
      const filePath = `${userId}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, photo);

      if (uploadError) {
        setMessage('Ifoto ntiyoherejwe: ' + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: imageData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      imageUrl = imageData.publicUrl;
    }

    const { error } = await supabase.from('products').insert({
      seller_id: userId,
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      image_url: imageUrl,
      status: 'pending',
    });

    setLoading(false);

    if (error) {
      setMessage('Igicuruzwa nticyabitswe: ' + error.message);
      return;
    }

    setMessage('Igicuruzwa cyabitswe! Kirategereje kwemezwa.');
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setPhoto(null);

    await loadProducts();
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      setMessage('Ntibyashobotse gusiba: ' + error.message);
      return;
    }

    setMessage('Igicuruzwa cyasibwe.');
    await loadProducts();
  };

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4 pb-24">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="p-2 rounded-lg border bg-white"
          >
            <option value="rw">Kinyarwanda</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <h1 className="text-3xl font-bold text-emerald-700 text-center mb-2">
          RUBAVU ONLINE MARKET
        </h1>

        <p className="text-center text-gray-600 mb-6">
          {t.welcome}
        </p>

        {message && (
          <div className="bg-white p-4 rounded-xl mb-5 text-center text-emerald-700">
            {message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-5 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus /> {t.add}
          </h2>

          <form onSubmit={addProduct} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={t.title}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t.description}
              className="w-full border rounded-lg p-3"
              rows={3}
            />

            <input
              type="number"
              min="1"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder={t.price}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder={t.category}
              className="w-full border rounded-lg p-3"
            />

            <label className="block border rounded-lg p-3 bg-gray-50">
              <span className="flex items-center gap-2 mb-2">
                <Image size={20} /> {t.photo}
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={e => setPhoto(e.target.files?.[0] || null)}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? t.loading : t.save}
            </button>
          </form>
        </div>

        <div className="flex bg-white rounded-xl p-3 mb-8 shadow">
          <Search className="text-gray-500 mr-2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow p-5">

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              ) : (
                <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  <Image size={48} />
                </div>
              )}

              <h2 className="text-xl font-bold mt-4">
                {product.title}
              </h2>

              <p className="text-gray-600 my-2">
                {product.description}
              </p>

              <p className="text-emerald-700 font-bold text-lg my-3">
                {Number(product.price).toLocaleString()} RWF
              </p>

              {product.status === 'pending' && (
                <p className="text-orange-600 text-sm font-bold mb-3">
                  {t.pending}
                </p>
              )}

              {product.status === 'approved' && (
                <p className="text-green-700 text-sm font-bold mb-3">
                  {t.approved}
                </p>
              )}

              {product.status === 'approved' && (
                <button
                  onClick={() => setCart([...cart, product.id])}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold"
                >
                  <ShoppingCart className="inline mr-2" size={18} />
                  {t.cart}
                </button>
              )}

              {product.seller_id === userId &&
                product.status === 'pending' && (
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg mt-3"
                  >
                    <Trash2 className="inline mr-2" size={18} />
                    {t.delete}
                  </button>
                )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            {t.empty}
          </p>
        )}

        <div className="fixed bottom-5 right-5 bg-emerald-700 text-white rounded-full p-4 shadow-lg">
          <ShoppingCart className="inline mr-2" />
          {cart.length}
        </div>

      </div>
    </div>
  );
};

export default Products;
