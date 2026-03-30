import { motion } from 'motion/react';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function Contact() {
  const phoneNumber = '918200428348';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="pt-32 pb-24 bg-premium-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Get In Touch
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
          {/* Contact Cards */}
          <div className="bg-white/5 p-10 border border-white/10 text-center space-y-6 hover:border-gold/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold">Call Us</h3>
            <p className="text-white/60">Available 9 AM - 9 PM</p>
            <p className="text-gold font-bold text-lg">+91 8200428348 / 9727403655</p>
          </div>

          <div className="bg-white/5 p-10 border border-white/10 text-center space-y-6 hover:border-gold/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-serif font-bold">Working Hours</h3>
            <p className="text-white/60">Monday - Sunday</p>
            <p className="text-gold font-bold text-lg">09:00 AM - 10:00 PM</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Map & WhatsApp */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold">Visit Our Office</h2>
              <div className="flex items-start gap-4 text-white/60">
                <MapPin className="text-gold shrink-0" size={24} />
                <p className="text-lg">
                  14,Aavkar society, kalol, <br />
                  Gujarat 382721
                </p>
              </div>
            </div>

            <div className="p-8 border border-gold/20 bg-gold/5 space-y-6">
              <h3 className="text-xl font-serif font-bold">Quick Chat?</h3>
              <p className="text-white/60">Connect with us instantly on WhatsApp for quick menu consultations.</p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                <MessageCircle size={20} fill="currentColor" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-square bg-white/5 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <MapPin size={48} className="text-gold mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-serif font-bold mb-4">Interactive Map</h3>
              <p className="text-white/40 mb-8">SB Caterers, Ahmedabad</p>
              <button className="border border-gold text-gold px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-premium-black transition-all">
                Open in Google Maps
              </button>
            </div>
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
