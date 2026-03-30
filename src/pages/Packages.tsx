import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Star, Crown, Diamond, Sparkles } from 'lucide-react';

const PACKAGES = [
  {
    id: 1,
    name: "Package - 1",
    price: 450,
    icon: <Star className="w-8 h-8 text-gold" />,
    description: "Perfect for intimate gatherings and small family events.",
    items: [
      "Welcome Drink - 1",
      "Soup - 1",
      "Starter - 1",
      "Live Counter - 1",
      "Liquid Sweet - 1",
      "Mawa Sweet - 1",
      "Farsan - 1",
      "Puri / Roti / Naan - 2",
      "Sabji - 2",
      "Daal & Rice - 1",
      "Salad - Aachar - Marcha",
      "Mineral Water Jug",
      "Mukhvas"
    ]
  },
  {
    id: 2,
    name: "Package - 2",
    price: 600,
    icon: <Sparkles className="w-8 h-8 text-gold" />,
    description: "A more comprehensive selection for grand celebrations.",
    items: [
      "Welcome Drink - 2",
      "Soup - 2",
      "Starter - 1",
      "Live Counter - 2",
      "Liquid Sweet - 1",
      "Mawa Sweet - 1",
      "Farsan - 1",
      "Puri / Roti / Naan - 2",
      "Sabji - 2",
      "Daal & Rice - 1",
      "Papad - 2 & Salad - 2",
      "Aachar - Marcha",
      "Ice Cream - 1",
      "Mineral Water Jug",
      "Mukhvas - 2"
    ]
  },
  {
    id: 3,
    name: "Package - 3",
    price: 750,
    icon: <Crown className="w-8 h-8 text-gold" />,
    description: "Premium experience with a wide variety of traditional flavors.",
    items: [
      "Welcome Drink - 2",
      "Soup - 2",
      "Starter - 2",
      "Chaat - 1",
      "Live Counter - 2",
      "Liquid Sweet - 1",
      "Dryfruit Sweet - 1",
      "Farsan - 2",
      "Puri / Roti / Naan - 2",
      "Sabji - 2",
      "Daal & Rice - 1",
      "Papad - 2 & Salad - 4",
      "Aachar - Marcha",
      "Ice Cream - 1",
      "200 ML Mineral Water Bottle",
      "Kalkatti Paan"
    ]
  },
  {
    id: 4,
    name: "Package - 4",
    price: 950,
    icon: <Diamond className="w-8 h-8 text-gold" />,
    description: "The ultimate royal feast for your most special occasions.",
    items: [
      "Welcome Drink - 3",
      "Soup - 2",
      "Starter - 2",
      "Chaat - 2",
      "Live Counter - 3",
      "Liquid Sweet - 1",
      "Dryfruit Sweet - 1",
      "Mawa Sweet - 1",
      "Farsan - 2",
      "Puri / Roti / Naan - 3",
      "Sabji - 3",
      "Daal & Rice - 2",
      "Papad - 2 & Salad - 5",
      "Aachar - Marcha",
      "Kulfi/Vanilla with Brownie/Ice Cream - 1",
      "200 ML Mineral Water Bottle",
      "Kalkatti Paan"
    ]
  }
];

export default function Packages() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2070" 
            alt="Catering Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-premium-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-4"
          >
            Catering <span className="text-gold">Packages</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide"
          >
            Exquisite culinary experiences tailored for your special moments.
          </motion.p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-gold/20 p-8 rounded-none flex flex-col h-full group hover:border-gold/50 transition-all duration-500"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gold/10 rounded-full group-hover:scale-110 transition-transform duration-500">
                  {pkg.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white text-center mb-2">{pkg.name}</h3>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gold">₹{pkg.price}</span>
                <span className="text-white/60 text-sm ml-1">/ person</span>
              </div>
              
              <p className="text-white/70 text-sm text-center mb-8 font-light italic">
                "{pkg.description}"
              </p>
              
              <div className="flex-grow space-y-3 mb-8">
                {pkg.items.map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm">
                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/booking" 
                state={{ package: pkg.name }}
                className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-premium-black transition-all duration-300 font-bold uppercase tracking-widest text-center text-xs"
              >
                Inquire Now
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customization Note */}
      <section className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 border border-gold/20 bg-gold/5"
        >
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Need a Custom Menu?</h2>
          <p className="text-white/70 mb-8 font-light leading-relaxed">
            We understand that every event is unique. Our chefs are happy to work with you to create a bespoke menu that perfectly fits your vision and preferences.
          </p>
          <Link 
            to="/booking" 
            className="inline-block bg-gold text-premium-black px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gold-dark transition-all"
          >
            Contact Our Team
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
