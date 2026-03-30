import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-premium-black/90 backdrop-blur-md py-4 shadow-lg border-b border-gold/20' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <UtensilsCrossed className="w-8 h-8 text-gold group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-serif font-bold tracking-tighter text-white">
              SB <span className="text-gold">CATERERS</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold ${
                  location.pathname === link.path ? 'text-gold' : 'text-white/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/booking"
              state={{ source: 'navbar', message: "I'm interested in booking your catering services." }}
              className="bg-gold hover:bg-gold-dark text-premium-black px-6 py-2.5 rounded-none font-bold uppercase tracking-widest text-xs transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-premium-black border-b border-gold/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-serif tracking-wide ${
                    location.pathname === link.path ? 'text-gold' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/booking"
                state={{ source: 'navbar-mobile', message: "I'm interested in booking your catering services." }}
                onClick={() => setIsOpen(false)}
                className="block w-full bg-gold text-premium-black text-center py-3 font-bold uppercase tracking-widest"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
