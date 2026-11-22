
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    momo: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 8) {
      setMessage('Ijambo ry’ibanga rigomba kugira nibura inyuguti 8.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Amagambo y’ibanga ntahura.');
      return;
    }

    setMessage('Ifishi yuzuye neza. Kwiyandikisha nyakuri ntibirakorwa.');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          Iyandikishe
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Injiza amakuru yawe kugira ngo ukomeze.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Amazina yawe yose"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="phone"
            placeholder="Nimero ya telefoni"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="momo"
            placeholder="Nimero ya MTN MoMo"
            value={form.momo}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Ijambo ry'ibanga"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Ongera ijambo ry'ibanga"
            value={form.confirmPassword}
            onChange={handleChange}
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
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg"
          >
            Iyandikishe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
