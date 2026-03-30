import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <UtensilsCrossed className="w-6 h-6 text-gold" />
              <span className="text-xl font-serif font-bold tracking-tighter text-white">
                SB <span className="text-gold">CATERERS</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Crafting unforgettable culinary experiences for your special moments. Premium catering service based in the heart of Gujarat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-gold transition-colors">Our Menu</Link></li>
              <li><Link to="/packages" className="hover:text-gold transition-colors">Catering Packages</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/booking" className="hover:text-gold transition-colors">Book Catering</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>14,Aavkar society, kalol, Gujarat 382721</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 8200428348 / 9727403655</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-white/40 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} SB Caterers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
