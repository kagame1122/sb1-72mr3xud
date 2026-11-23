
import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';

import Header from './components/Header';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import Footer from './components/Footer';
import Register from './components/Register';
import LoginNew from './components/LoginNew';
import Products from '../Products';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) {
        setShowProducts(true);
      }
    });

    const { data: authListener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setShowProducts(false);
        }
      });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header
        onRegister={() => {
          setShowRegister(true);
          setShowLogin(false);
          setShowProducts(false);
        }}
        onLogin={() => {
          setShowLogin(true);
          setShowRegister(false);
          setShowProducts(false);
        }}
      />

      {showProducts ? (
        <Products onBack={() => setShowProducts(false)} />
      ) : showRegister ? (
        <Register />
      ) : showLogin ? (
        <LoginNew
          onRegister={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          onLoginSuccess={() => {
            setShowProducts(true);
            setShowLogin(false);
          }}
        />
      ) : (
        <>
          <main>
            <Hero />
            <PropertyGrid />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
