
import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  Globe
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('rw');

  const translations = {
    rw: {
      products: 'Ibicuruzwa',
      about: 'Abo turibo',
      services: 'Serivisi',
      contact: 'Twandikire',
      login: 'Injira',
      register: 'Iyandikishe',
      search: 'Shakisha'
    },
    en: {
      products: 'Products',
      about: 'About us',
      services: 'Services',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      search: 'Search'
    },
    fr: {
      products: 'Produits',
      about: 'À propos',
      services: 'Services',
      contact: 'Contact',
      login: 'Connexion',
      register: 'Inscription',
      search: 'Rechercher'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          <a href="#" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-2 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg md:text-2xl font-bold text-gray-900">
              RUBAVU ONLINE MARKET
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-gray-700 hover:text-emerald-600 font-medium">
              {t.products}
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium">
              {t.about}
            </a>
            <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium">
              {t.services}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium">
              {t.contact}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Globe size={18} className="text-gray-600" />
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="border rounded-lg px-2 py-2 text-sm"
                aria-label="Language"
              >
                <option value="rw">Kinyarwanda</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-2 text-gray-600 hover:text-emerald-600"
              aria-label={t.search}
            >
              <Search size={21} />
            </button>

            <button className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-medium">
              <User size={20} />
              {t.login}
            </button>

            <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg">
              {t.register}
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <a href="#products" onClick={() => setIsMenuOpen(false)}>
                {t.products}
              </a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                {t.about}
              </a>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>
                {t.services}
              </a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                {t.contact}
              </a>

              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="border rounded-lg p-3"
                aria-label="Language"
              >
                <option value="rw">Kinyarwanda</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>

              <button className="border border-emerald-600 text-emerald-700 py-3 rounded-xl">
                {t.login}
              </button>

              <button className="bg-emerald-600 text-white py-3 rounded-xl">
                {t.register}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
