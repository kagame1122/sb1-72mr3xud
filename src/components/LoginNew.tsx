
import React, { useState } from 'react';
import { supabase } from '../supabase';

interface LoginProps {
  onRegister?: () => void;
  onLoginSuccess?: () => void;
}

const LoginNew: React.FC<LoginProps> = ({
  onRegister,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage('Kwinjira byanze: ' + error.message);
    } else {
      setMessage('Winjiye neza!');
      onLoginSuccess?.();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Murakaza neza!
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Injira muri RUBAVU ONLINE MARKET
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email yawe"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Ijambo ry'ibanga"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
          />

          {message && (
            <p className="text-center text-sm text-blue-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg"
          >
            {loading ? 'Tegereza...' : 'Injira'}
          </button>
        </form>

        <button
          onClick={onRegister}
          className="w-full mt-6 border border-emerald-600 text-emerald-700 py-3 rounded-lg"
        >
          Iyandikishe
        </button>
      </div>
    </div>
  );
};

export default LoginNew;
