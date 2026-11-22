
import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  Globe
} from 'lucide-react';

interface HeaderProps {
  onRegister: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegister }) => {
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
    <header className="bg-white fixed w-full top-0 z-50 border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-emerald-600" />
            <span className="font-bold text-lg">
              RUBAVU ONLINE MARKET
            </span>
          </a>

          <nav className="hidden md:flex gap-5">
            <a href="#products">{t.products}</a>
            <a href="#about">{t.about}</a>
            <a href="#services">{t.services}</a>
            <a href="#contact">{t.contact}</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Globe size={18} />
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="rw">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>

            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              <Search size={20} />
            </button>

            <button className="flex items-center gap-2">
              <User size={20} />
              {t.login}
            </button>

            <button
              onClick={onRegister}
              className="bg-emerald-600 text-white px-5 py-2 rounded-full"
            >
              {t.register}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4">
            <a href="#products">{t.products}</a>
            <a href="#about">{t.about}</a>
            <a href="#services">{t.services}</a>
            <a href="#contact">{t.contact}</a>

            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="rw">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>

            <button>{t.login}</button>

            <button
              onClick={() => {
                onRegister();
                setIsMenuOpen(false);
              }}
              className="bg-emerald-600 text-white py-3 rounded-xl"
            >
              {t.register}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
