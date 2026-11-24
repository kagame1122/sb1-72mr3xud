
import React, { useEffect, useState } from 'react';
import { supabase } from './src/supabase';
import {
  Search, ShoppingCart, Plus, Trash2, Image,
  ArrowLeft, Home, CheckCircle, XCircle
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
    search: 'Shakisha ibicuruzwa...',
    add: 'Ongeraho igicuruzwa',
    name: 'Izina ry’igicuruzwa',
    description: 'Ibisobanuro',
    price: 'Igiciro (RWF)',
    category: 'Icyiciro',
    photo: 'Hitamo ifoto',
    save: 'Bika igicuruzwa',
    pending: 'Gitegereje kwemezwa',
    approved: 'Cyemejwe',
    rejected: 'Cyanzwe',
    admin: 'Ubuyobozi - Emeza ibicuruzwa',
    approve: 'Emeza',
    reject: 'Hakana',
    delete: 'Siba',
    cart: 'Ibyo watoranyije',
    empty: 'Nta bicuruzwa bibonetse',
    success: 'Igicuruzwa cyabitswe! Kirategereje kwemezwa.',
    login: 'Banza winjire muri konti yawe.',
    back: 'Subira inyuma',
    home: 'Ahabanza',
    all: 'Ibicuruzwa byose',
    loading: 'Birimo gufunguka...'
  },
  en: {
    title: 'RUBAVU ONLINE MARKET',
    search: 'Search products...',
    add: 'Add a product',
    name: 'Product name',
    description: 'Description',
    price: 'Price (RWF)',
    category: 'Category',
    photo: 'Choose photo',
    save: 'Save product',
    pending: 'Waiting for approval',
    approved: 'Approved',
    rejected: 'Rejected',
    admin: 'Administration - Approve products',
    approve: 'Approve',
    reject: 'Reject',
    delete: 'Delete',
    cart: 'Shopping cart',
    empty: 'No products found',
    success: 'Product saved! Waiting for approval.',
    login: 'Please log in first.',
    back: 'Go back',
    home: 'Home',
    all: 'All products',
    loading: 'Loading...'
  },
  fr: {
    title: 'RUBAVU ONLINE MARKET',
    search: 'Rechercher des produits...',
    add: 'Ajouter un produit',
    name: 'Nom du produit',
    description: 'Description',
    price: 'Prix (RWF)',
    category: 'Catégorie',
    photo: 'Choisir une photo',
    save: 'Enregistrer',
    pending: 'En attente de validation',
    approved: 'Approuvé',
    rejected: 'Refusé',
    admin: 'Administration - Valider les produits',
    approve: 'Approuver',
    reject: 'Refuser',
    delete: 'Supprimer',
    cart: 'Panier',
    empty: 'Aucun produit trouvé',
    success: 'Produit enregistré ! En attente de validation.',
    login: 'Veuillez vous connecter.',
    back: 'Retour',
    home: 'Accueil',
    all: 'Tous les produits',
    loading: 'Chargement...'
  }
};

type ProductsProps = {
  onBack?: () => void;
};

export default function Products({ onBack }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState<'rw' | 'en' | 'fr'>('rw');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const t = translations[language];
  const isAdmin = userId === ADMIN_USER_ID;

  useEffect(() => {
    loadProducts();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id || '');
        loadProducts();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function loadProducts() {
    const { data: authData } = await supabase.auth.getUser();
    const currentUser = authData.user?.id || '';

    setUserId(currentUser);

    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      alert('Ikibazo mu gufungura ibicuruzwa: ' + error.message);
    } else {
      setProducts((data || []) as Product[]);
    }

    setLoading(false);
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();

    if (saving) return;

    const { data: authData } = await supabase.auth.getUser();
    const currentUser = authData.user?.id || '';

    if (!currentUser) {
      alert(t.login);
      return;
    }

    if (!title.trim() || !price || Number(price) <= 0) {
      alert('Uzuza izina n’igiciro cy’igicuruzwa.');
      return;
    }

    setSaving(true);

    try {
      let imageUrl: string | null = null;

      if (photo) {
        const safeName = photo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `${currentUser}/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, photo);

        if (uploadError) {
          alert('Ifoto yanze kujyamo: ' + uploadError.message);
          return;
        }

        const { data: imageData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrl = imageData.publicUrl;
      }

      const { error } = await supabase
        .from('products')
        .insert({
          seller_id: currentUser,
          title: title.trim(),
          description: description.trim(),
          price: Number(price),
          category: category.trim(),
          image_url: imageUrl,
          status: 'pending'
        });

      if (error) {
        alert('Igicuruzwa nticyabitswe: ' + error.message);
        return;
      }

      alert(t.success);

      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setPhoto(null);

      const fileInput = document.getElementById('product-photo') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';

      await loadProducts();
    } catch (error) {
      alert('Habaye ikibazo: ' + String(error));
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(id: number, status: string) {
    if (!isAdmin) {
      alert('Ntabwo wemerewe gukora iki gikorwa.');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .update({ status })
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      alert('Ntibyakozwe: ' + error.message);
      return;
    }

    if (!data) {
      alert('Igicuruzwa nticyahinduwe. Reba uburenganzira bw’ubuyobozi.');
      return;
    }

    alert(status === 'approved'
      ? 'Igicuruzwa cyemejwe!'
      : 'Igicuruzwa cyanzwe.'
    );

    await loadProducts();
  }

  async function deleteProduct(id: number) {
    if (!confirm('Urashaka gusiba iki gicuruzwa?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Ntibyashobotse gusiba: ' + error.message);
    } else {
      alert('Igicuruzwa cyasibwe.');
      await loadProducts();
    }
  }

  const visibleProducts = products.filter(product => {
    const isApproved = product.status === 'approved';
    const isOwn = product.seller_id === userId;
    const canSee = isApproved || isOwn || isAdmin;

    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      (product.category || '').toLowerCase().includes(search.toLowerCase());

    return canSee && matchesSearch;
  });

  const pendingProducts = products.filter(
    product => product.status === 'pending'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-green-700">
            {t.title}
          </h1>

          <div className="flex gap-2 items-center">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as 'rw' | 'en' | 'fr')}
              className="border rounded-lg p-2"
            >
              <option value="rw">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>

            <span className="flex items-center gap-1">
              <ShoppingCart size={20} />
              {cart}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
     <div className="flex flex-wrap gap-3 mt-3">
  <button
    type="button"
    onClick={() => changeStatus(product.id, 'approved')}
    className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2"
  >
    <CheckCircle size={18} />
    {t.approve}
  </button>

  <button
    type="button"
    onClick={() => changeStatus(product.id, 'rejected')}
    className="bg-red-600 text-white px-4 py-2 rounded-lg flex gap-2"
  >
    <XCircle size={18} />
    {t.reject}
  </button>
</div   
  <button
    type="button"
    onClick={() => changeStatus(product.id, 'approved')}
    className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2"
  >
    <CheckCircle size={18} />
    {t.approve}
  </button>

  <button
    type="button"
    onClick={() => changeStatus(product.id, 'rejected')}
    className="bg-red-600 text-white px-4 py-2 rounded-lg flex gap-2"
  >
    <XCircle size={18} />
    {t.reject}
  </button>
</div>
          <button
            type="button"
            onClick={() => {
  if (onBack) {
    onBack();
  } else {
    window.location.assign('/');
  }
}}
            className="bg-gray-200 px-4 py-2 rounded-lg flex gap-2"
          >
            <ArrowLeft size={18} /> {t.back}
          </button>

          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="bg-green-700 text-white px-4 py-2 rounded-lg flex gap-2"
          >
            <Home size={18} /> {t.home}
          </button>
        </div>

        {isAdmin && (
          <section className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              {t.admin}
            </h2>

            {pendingProducts.length === 0 ? (
              <p>Nta bicuruzwa bitegereje kwemezwa.</p>
            ) : (
              pendingProducts.map(product => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 mb-3"
                >
                  <h3 className="font-bold">{product.title}</h3>
                  <p>{product.description}</p>
                  <p className="font-bold">
                    {Number(product.price).toLocaleString()} RWF
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3">
                   <button
  type="button"
  onClick={() => {
    alert('Buto ya EMEZA irakora!');
    changeStatus(product.id, 'approved');
  }}
  className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2"
>
  <CheckCircle size={18} /> {t.approve}
</button> 
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2"
                    >
                      <CheckCircle size={18} /> {t.approve}
                    </button>

                    <button
                      type="button"
                      onClick={() => changeStatus(product.id, 'rejected')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg flex gap-2"
                    >
                      <XCircle size={18} /> {t.reject}
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        <section className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">{t.add}</h2>

          <form onSubmit={addProduct} className="space-y-3">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={t.name}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t.description}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder={t.price}
              className="w-full border rounded-lg p-3"
              min="1"
              required
            />

            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder={t.category}
              className="w-full border rounded-lg p-3"
            />

            <label className="flex flex-wrap items-center gap-2 border rounded-lg p-3">
              <Image size={20} />
              {t.photo}
              <input
                id="product-photo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={e => setPhoto(e.target.files?.[0] || null)}
              />
            </label>

           <button
  type="submit"
  disabled={saving}
  style={{
    display: 'block',
    width: '100%',
    minHeight: '55px',
    backgroundColor: '#15803d',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    marginTop: '15px',
    cursor: 'pointer'
  }}
>
  {saving ? 'Birimo kubika...' : t.save}
</button> 

            {!userId && (
              <p className="text-red-600">
                Banza winjire muri konti yawe kugira ngo ubike igicuruzwa.
              </p>
            )}
          </form>
        </section>

        <div className="relative mb-5">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full border rounded-lg p-3 pl-10"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">{t.all}</h2>

        {loading ? (
          <p>{t.loading}</p>
        ) : visibleProducts.length === 0 ? (
          <p>{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <p className="text-gray-600 my-2">{product.description}</p>
                  <p className="font-bold text-green-700">
                    {Number(product.price).toLocaleString()} RWF
                  </p>
                  <p className="text-sm mt-2">{product.category}</p>

                  {product.status === 'pending' && (
                    <p className="text-orange-600 font-semibold mt-2">
                      {t.pending}
                    </p>
                  )}

                  {product.status === 'rejected' && (
                    <p className="text-red-600 font-semibold mt-2">
                      {t.rejected}
                    </p>
                  )}

                  {product.status === 'approved' && (
                    <button
                      type="button"
                      onClick={() => setCart(old => old + 1)}
                      className="bg-green-700 text-white rounded-lg px-4 py-2 mt-3"
                    >
                      <ShoppingCart size={17} className="inline mr-2" />
                      {t.cart}
                    </button>
                  )}

                  {product.seller_id === userId &&
                    product.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-100 text-red-700 rounded-lg px-3 py-2 mt-3 ml-2"
                      >
                        <Trash2 size={17} className="inline mr-1" />
                        {t.delete}
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
