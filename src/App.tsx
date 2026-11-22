
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  const [showRegister, setShowRegister] = useState(false);
const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Header
  onRegister={() => setShowRegister(true)}
  onLogin={() => setShowLogin(true)}
/>
{showRegister ? (
  <Register />
) : showLogin ? (
  <Login onRegister={() => setShowRegister(true)} />
) : (
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
