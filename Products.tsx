
import React, { useEffect, useState } from 'react';
import { supabase } from './src/supabase';
import {
  Search,
  ShoppingCart,
  Plus,
  Trash2,
  Image as ImageIcon,
  ArrowLeft,
  Home,
  CheckCircle,
  XCircle,
} from 'lucide-react';

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

const ADMIN_USER_ID = 'e587e318-5bc4-4d1b-8757-d3fb7033e809';

const translations = {
  rw: {
    title: 'RUBAVU ONLINE MARKET',
    products: 'Ibicuruzwa',
    add: 'Shyiraho igicuruzwa',
    name: 'Izina ry igicuruzwa',
    description: 'Ibisobanuro',
    price: 'Igiciro muri RWF',
    category: 'Icyiciro',
    image: 'Hitamo ifoto',
    save: 'Ohereza igicuruzwa',
    search: 'Shakisha ibicuruzwa...',
    pending: 'Bitegereje kwemezwa',
    approved: 'Byemejwe',
    rejected: 'Byanzwe',
    approve: 'Emeza',
    reject: 'Anga',
    admin: 'Ubuyobozi - Emeza ibicuruzwa',
    empty: 'Nta bicuruzwa biraboneka.',
    back: 'Subira inyuma',
    home: 'Ahabanza',
    delete: 'Siba',
    cart: 'Agaseke',
    loading: 'Tegereza...',
    success: 'Igicuruzwa cyoherejwe neza.',
    login: 'Banza winjire muri konti yawe.',
    all: 'Byose',
  },
  en: {
    title: 'RUBAVU ONLINE MARKET',
    products: 'Products',
    add: 'Add a product',
    name: 'Product name',
    description: 'Description',
    price: 'Price in RWF',
    category: 'Category',
    image: 'Choose image',
    save: 'Submit product',
    search: 'Search products...',
    pending: 'Pending approval',
    approved: 'Approved',
    rejected: 'Rejected',
    approve: 'Approve',
    reject: 'Reject',
    admin: 'Administration - Approve products',
    empty: 'No products available.',
    back: 'Go back',
    home: 'Home',
    delete: 'Delete',
    cart: 'Cart',
    loading: 'Loading...',
    success: 'Product submitted successfully.',
    login: 'Please log in first.',
    all: 'All',
  },
  fr: {
    title: 'RUBAVU ONLINE MARKET',
    products: 'Produits',
    add: 'Ajouter un produit',
    name: 'Nom du produit',
    description: 'Description',
    price: 'Prix en RWF',
    category: 'Catégorie',
    image: 'Choisir une image',
    save: 'Envoyer le produit',
    search: 'Rechercher des produits...',
    pending: 'En attente de validation',
    approved: 'Approuvé',
    rejected: 'Refusé',
    approve: 'Approuver',
    reject: 'Refuser',
    admin: 'Administration - Valider les produits',
    empty: 'Aucun produit disponible.',
    back: 'Retour',
    home: 'Accueil',
    delete: 'Supprimer',
    cart: 'Panier',
    loading: 'Chargement...',
    success: 'Produit envoyé avec succès.',
    login: 'Veuillez vous connecter.',
    all: 'Tous',
  },
};

export default function Products() {
  const [language, setLanguage] = useState<'rw' | 'en' | 'fr'>('rw');
  const t = translations[language];

  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUserId(data.user.id);
      setIsAdmin(data.user.id === ADMIN_USER_ID);
    }

    await loadProducts();
  }

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Products error:', error.message);
    } else {
      setProducts((data || []) as Product[]);
    }

    setLoading(false);
  }

  async function submitProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userId) {
      alert(t.login);
      return;
    }

    if (!title.trim() || !price || !category) {
      alert('Uzuza amakuru yose asabwa.');
      return;
    }

    setSaving(true);

    try {
      let imageUrl: string | null = null;

      if (image) {
        const extension = image.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        imageUrl = publicData.publicUrl;
      }

      const { error } = await supabase.from('products').insert({
        seller_id: userId,
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        image_url: imageUrl,
        status: 'pending',
      });

      if (error) {
        throw error;
      }

      alert(t.success);

      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null);
      setShowForm(false);

      await loadProducts();
    } catch (error: any) {
      alert(error.message || 'Habaye ikibazo.');
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(id: number, status: string) {
    if (!isAdmin) {
      alert('Ntabwo wemerewe gukora iki gikorwa.');
      return;
    }

    const { error } = await supabase
      .from('products')
      .update({ status })
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    alert(status === 'approved' ? t.approved : t.rejected);
    await loadProducts();
  }

  async function deleteProduct(id: number) {
    const confirmed = window.confirm('Urashaka gusiba iki gicuruzwa?');

    if (!confirmed) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProducts();
  }

  const pendingProducts = products.filter(
    (product) => product.status === 'pending'
  );

  const visibleProducts = products.filter((product) => {
    const canSee =
      product.status === 'approved' ||
      product.seller_id === userId;

    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    return canSee && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-green-700">
            {t.title}
          </h1>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value as 'rw' | 'en' | 'fr')
              }
              className="border rounded-lg p-2"
            >
              <option value="rw">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>

            <div className="flex items-center gap-1">
              <ShoppingCart size={20} />
              {cartCount}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="flex flex-wrap gap-3 mb-5">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-200 px-4 py-2 rounded-lg flex gap-2"
          >
            <ArrowLeft size={18} />
            {t.back}
          </button>

          <button
            type="button"
            onClick={() => (window.location.href = '/')}
            className="bg-gray-200 px-4 py-2 rounded-lg flex gap-2"
          >
            <Home size={18} />
            {t.home}
          </button>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2"
          >
            <Plus size={18} />
            {t.add}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={submitProduct}
            className="bg-white border rounded-xl p-5 mb-6 space-y-4"
          >
            <h2 className="text-xl font-bold">{t.add}</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.name}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.description}
              className="w-full border rounded-lg p-3"
              rows={4}
            />

            <input
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t.price}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={t.category}
              className="w-full border rounded-lg p-3"
              required
            />

            <label className="block">
              <span className="block mb-2">{t.image}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
                className="w-full border rounded-lg p-3"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-5 py-3 rounded-lg disabled:opacity-50"
            >
              {saving ? t.loading : t.save}
            </button>
          </form>
        )}

        {isAdmin && (
          <section className="bg-white border rounded-xl p-5 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {t.admin}
            </h2>

            {pendingProducts.length === 0 ? (
              <p>{t.empty}</p>
            ) : (
              pendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 mb-3"
                >
                  <h3 className="font-bold text-lg">
                    {product.title}
                  </h3>

                  <p>{product.description}</p>

                  <p className="font-bold text-green-700">
                    {Number(product.price).toLocaleString()} RWF
                  </p>

                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-40 h-40 object-cover rounded-lg my-3"
                    />
                  )}

                  <p className="text-orange-600 my-2">
                    {t.pending}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        changeStatus(product.id, 'approved')
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2"
                    >
                      <CheckCircle size={18} />
                      {t.approve}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        changeStatus(product.id, 'rejected')
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg flex gap-2"
                    >
                      <XCircle size={18} />
                      {t.reject}
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-4">
            {t.products}
          </h2>

          <div className="relative mb-5">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
              className="w-full border rounded-lg p-3 pl-11"
            />
          </div>

          {loading ? (
            <p>{t.loading}</p>
          ) : visibleProducts.length === 0 ? (
            <p className="bg-white rounded-lg p-5">{t.empty}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl overflow-hidden shadow-sm"
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                      <ImageIcon size={45} className="text-gray-400" />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-bold text-lg">
                      {product.title}
                    </h3>

                    <p className="text-gray-600 my-2">
                      {product.description}
                    </p>

                    <p className="text-green-700 font-bold text-lg">
                      {Number(product.price).toLocaleString()} RWF
                    </p>

                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>

                    {product.status === 'pending' && (
                      <p className="text-orange-600 mt-2">
                        {t.pending}
                      </p>
                    )}

                    {product.status === 'rejected' && (
                      <p className="text-red-600 mt-2">
                        {t.rejected}
                      </p>
                    )}

                    {product.status === 'approved' && (
                      <p className="text-green-600 mt-2">
                        {t.approved}
                      </p>
                    )}

                    {product.seller_id === userId &&
                      product.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => deleteProduct(product.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg mt-3 flex gap-2"
                        >
                          <Trash2 size={18} />
                          {t.delete}
                        </button>
                      )}

                    {product.status === 'approved' && (
                      <button
                        type="button"
                        onClick={() =>
                          setCartCount((count) => count + 1)
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 w-full"
                      >
                        <ShoppingCart
                          size={18}
                          className="inline mr-2"
                        />
                        {t.cart}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
