
import React from 'react';
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Wallet } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Online shopping products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-blue-950/80 to-emerald-900/80"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16">

        <span className="inline-block bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          Murakaza neza kuri RUBAVU ONLINE MARKET
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Gura Ibicuruzwa
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">
            Ubyifuza Byose!
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          Shaka ibicuruzwa byiza ku giciro cyiza. Gura, Sangiza abandi,
          kandi winjize amafaranga binyuze muri affiliate marketing.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
          <a
            href="#products"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl"
          >
            <ShoppingBag size={22} />
            Reba Ibicuruzwa
            <ArrowRight size={20} />
          </a>

          <a
            href="#products"
            className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg transition-all"
          >
            Tangira Gucuruza
          </a>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-white max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <ShoppingBag className="mx-auto mb-3 text-emerald-300" size={34} />
            <h3 className="font-bold text-lg mb-2">Ibicuruzwa Byiza</h3>
            <p className="text-gray-200 text-sm">
              Hitamo ibicuruzwa bitandukanye.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <Wallet className="mx-auto mb-3 text-emerald-300" size={34} />
            <h3 className="font-bold text-lg mb-2">Injiza Amafaranga</h3>
            <p className="text-gray-200 text-sm">
              Shaka commission igihe ibicuruzwa biguzwe binyuze kuri link yawe.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <ShieldCheck className="mx-auto mb-3 text-emerald-300" size={34} />
            <h3 className="font-bold text-lg mb-2">Umutekano</h3>
            <p className="text-gray-200 text-sm">
              Gura no kugurisha mu buryo bworoshye.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-emerald-200 text-sm">
          <Truck size={20} />
          <span>RUBAVU ONLINE MARKET — Isoko ryawe kuri internet</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
