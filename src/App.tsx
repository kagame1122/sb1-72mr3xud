
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import Footer from './components/Footer';
import Register from './components/Register';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onRegister={() => setShowRegister(true)} />

      {showRegister ? (
        <Register />
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
