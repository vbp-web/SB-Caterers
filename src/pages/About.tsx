import { motion } from 'motion/react';
import { Award, Users, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '5+', icon: <Award className="text-gold" /> },
    { label: 'Events Completed', value: '50+', icon: <Users className="text-gold" /> },
    { label: 'Happy Clients', value: '60+', icon: <Heart className="text-gold" /> },
    { label: 'Quality Standards', value: '100%', icon: <ShieldCheck className="text-gold" /> },
  ];

  return (
    <div className="pt-32 pb-24 bg-premium-black">
      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">A Legacy of <br /> <span className="text-gold italic">Taste & Tradition</span></h1>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>
                Founded in 2021, SB Caterers began with a simple mission: to bring the authentic, rich flavors of traditional Gujarati cuisine to the modern table with a touch of royal elegance.
              </p>
              <p>
                Over the past 5 years, we have grown from a small family-run kitchen to one of Gujarat's most trusted catering partners, serving everything from intimate family gatherings to grand destination weddings.
              </p>
              <p>
                Our secret lies in our commitment to quality. We use only the freshest, locally sourced ingredients and time-honored recipes passed down through generations, ensuring every bite is a celebration of flavor.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden border border-gold/20 p-4">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" 
                alt="Chef at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-gold p-8 hidden md:block">
              <p className="text-premium-black font-serif text-3xl font-bold italic">"Quality is our <br /> main ingredient."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/5 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center">{stat.icon}</div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">{stat.value}</h3>
                <p className="text-gold text-xs uppercase tracking-widest font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif font-bold mb-4">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Authentic Taste', desc: 'We preserve the true essence of traditional recipes while adding a contemporary touch.' },
            { title: 'Impeccable Service', desc: 'Our professional staff ensures your guests are treated with the utmost respect and care.' },
            { title: 'Customized Menus', desc: 'We work closely with you to design a menu that fits your theme, budget, and taste.' },
          ].map((item, idx) => (
            <div key={idx} className="p-8 border border-white/10 hover:border-gold/30 transition-colors group">
              <span className="text-gold/20 text-6xl font-serif font-bold mb-6 block group-hover:text-gold/40 transition-colors">0{idx + 1}</span>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
