
import React, { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-white">
      {!showProducts && (
        <Header
          onRegister={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          onLogin={() => {
            setShowLogin(true);
            setShowRegister(false);
          }}
        />
      )}

      {showProducts ? (
        <Products />
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
