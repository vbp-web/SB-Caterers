import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Welcome Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Soup', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Starters', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
    { name: 'Chaat Counter', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80' },
    { name: 'Main Course', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80' },
    { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-40 scale-110"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-premium-black via-transparent to-premium-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-6 block">Premium Catering Services</span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
              Delicious Food for <br />
              <span className="text-gold italic">Every Occasion</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the authentic flavors of Gujarat and beyond, served with royal elegance and impeccable service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/booking"
                state={{ source: 'hero', message: "I'm interested in booking your catering services for an upcoming event." }}
                className="bg-gold text-premium-black px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all transform hover:scale-105"
              >
                Book Now
              </Link>
              <Link 
                to="/menu"
                className="border border-white/20 hover:border-gold text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2 group"
              >
                View Menu <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-premium-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Specialties</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">Explore our diverse range of culinary delights, from traditional Gujarati favorites to global cuisines.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-80 overflow-hidden cursor-pointer"
              >
                <Link to="/menu" state={{ category: cat.name }} className="block w-full h-full">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 border border-white/0 group-hover:border-gold/40 transition-all m-4">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                    <div className="text-gold text-xs uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      See Menu <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Highlight Section */}
      <section className="py-24 bg-gold/5 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Curated Experiences</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Catering <span className="text-gold italic">Packages</span></h2>
              <p className="text-white/60 mt-6 text-lg font-light leading-relaxed">
                We offer a variety of thoughtfully designed packages to suit different event scales and preferences. Each package is a curated journey through our finest culinary offerings.
              </p>
            </div>
            <Link 
              to="/packages" 
              className="bg-gold text-premium-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gold-light transition-all flex items-center gap-2 group"
            >
              View All Packages <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Package - 1', price: '450', items: '13 Items', desc: 'Essential Elegance' },
              { name: 'Package - 2', price: '600', items: '15 Items', desc: 'Classic Celebration' },
              { name: 'Package - 3', price: '750', items: '16 Items', desc: 'Premium Feast' },
              { name: 'Package - 4', price: '950', items: '17 Items', desc: 'Royal Banquet' },
            ].map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-premium-black p-8 border border-gold/20 flex flex-col items-center text-center group hover:border-gold transition-colors"
              >
                <h3 className="text-xl font-serif font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gold text-xs uppercase tracking-widest mb-4">{pkg.desc}</p>
                <div className="text-3xl font-bold text-white mb-6">₹{pkg.price}<span className="text-sm text-white/40 font-normal">/pp</span></div>
                <div className="text-white/60 text-sm mb-8">{pkg.items} included</div>
                <Link to="/packages" className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/0 group-hover:border-gold/100 transition-all pb-1">
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-premium-black mb-8">Ready to make your event <br /> unforgettable?</h2>
          <p className="text-premium-black/70 text-lg mb-12 max-w-2xl mx-auto">
            Contact us today for a personalized quote and menu consultation. Let's create magic together.
          </p>
          <Link 
            to="/booking"
            state={{ source: 'quote', message: "I'd like to request a free quote for my upcoming event. Please contact me with more information." }}
            className="inline-block bg-premium-black text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-black/90 transition-all transform hover:scale-105 shadow-2xl"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
