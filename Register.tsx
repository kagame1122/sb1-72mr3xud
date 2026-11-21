
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ShoppingBag, Eye, EyeOff } from 'lucide-react';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    momo: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 8) {
      setMessage('Ijambo ry’ibanga rigomba kugira inyuguti nibura 8.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Amagambo y’ibanga ntabwo ahura.');
      return;
    }

    setMessage('Kwiyandikisha byakiriwe. Sisitemu yo kubika konti izongerwamo.');
  };

  const updateField = (field: string, value: string) => {
    setForm(previous => ({ ...previous, [field]: value }));
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-6 md:p-10">

        <div className="text-center mb-8">
          <div className="bg-emerald-100 text-emerald-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Fungura Konti
          </h1>
          <p className="text-gray-500 mt-2">
            Iyandikishe kuri RUBAVU ONLINE MARKET
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-2">Amazina yose</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                required
                value={form.fullName}
                onChange={e => updateField('fullName', e.target.value)}
                placeholder="Andika amazina yawe"
                className="w-full border rounded-xl py-3 pl-11 pr-4"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                required
                type="tel"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
                placeholder="07XXXXXXXX"
                className="w-full border rounded-xl py-3 pl-11 pr-4"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                required
                type="email"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
                placeholder="example@email.com"
                className="w-full border rounded-xl py-3 pl-11 pr-4"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Numero ya MTN MoMo</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                required
                type="tel"
                value={form.momo}
                onChange={e => updateField('momo', e.target.value)}
                placeholder="078XXXXXXX"
                className="w-full border rounded-xl py-3 pl-11 pr-4"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Ijambo ry'ibanga</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => updateField('password', e.target.value)}
                placeholder="Nibura inyuguti 8"
                className="w-full border rounded-xl py-3 pl-11 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Ongera ijambo ry'ibanga</label>
            <input
              required
              type="password"
              value={form.confirmPassword}
              onChange={e => updateField('confirmPassword', e.target.value)}
              placeholder="Subiramo ijambo ry'ibanga"
              className="w-full border rounded-xl py-3 px-4"
            />
          </div>

          {message && (
            <p role="status" className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg"
          >
            Iyandikishe
          </button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Ufite konti? <a href="#" className="text-emerald-700 font-bold">Injira</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
