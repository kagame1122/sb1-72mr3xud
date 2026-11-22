
import React, { useState } from 'react';

interface LoginProps {
  onRegister?: () => void;
}

const Login: React.FC<LoginProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(
      'Kwinjira nyakuri ntibirakorwa. Tugomba kubanza guhuza konti na database.'
    );
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
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email cyangwa nimero ya telefoni"
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Ijambo ry'ibanga"
            required
            className="w-full border rounded-lg p-3"
          />

          {message && (
            <p className="text-sm text-center text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg"
          >
            Injira
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Ntabwo uriyandikisha?
        </p>

        <button
          onClick={onRegister}
          className="w-full mt-2 border border-emerald-600 text-emerald-700 py-3 rounded-lg"
        >
          Iyandikishe
        </button>
      </div>
    </div>
  );
};

export default Login;
