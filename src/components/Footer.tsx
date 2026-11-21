
import React from 'react';
import {
  ShoppingBag,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Wallet
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-xl">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                RUBAVU ONLINE MARKET
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              Isoko ryawe kuri internet. Gura ibicuruzwa byiza,
              sangiza abandi, kandi wunguke binyuze muri affiliate marketing.
            </p>

            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-emerald-400">
                <Facebook size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-emerald-400">
                <Instagram size={22} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Aho watangirira</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#products" className="hover:text-emerald-400">Ibicuruzwa</a></li>
              <li><a href="#products" className="hover:text-emerald-400">Gura ibicuruzwa</a></li>
              <li><a href="#products" className="hover:text-emerald-400">Tangira kwamamaza</a></li>
              <li><a href="#top" className="hover:text-emerald-400">Ahabanza</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Serivisi zacu</h3>
            <ul className="space-y-4 text-gray-400">
              <li>Kwamamaza ibicuruzwa</li>
              <li>Affiliate Marketing</li>
              <li>Commission ku bicuruzwa</li>
              <li>Ubufasha ku bakiriya</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Twandikire</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="text-emerald-400 shrink-0" />
                <span>Rubavu, Rwanda</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-emerald-400 shrink-0" />
                <span>Umubare wa telefone uzashyirwamo</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-emerald-400 shrink-0" />
                <span>Email izashyirwamo</span>
              </div>

              <div className="flex items-center gap-3">
                <Wallet className="text-emerald-400 shrink-0" />
                <span>MTN MoMo — Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 RUBAVU ONLINE MARKET. Uburenganzira bwose burabitswe.
          </p>
          <p className="text-gray-600 text-xs mt-3">
            Made for Rwanda 🇷🇼
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
