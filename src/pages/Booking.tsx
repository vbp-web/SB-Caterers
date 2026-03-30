import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Phone, User, MapPin, Send, FileText } from 'lucide-react';

export default function Booking() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    guests: '',
    date: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.state?.package) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in ${location.state.package}.`
      }));
    } else if (location.state?.selectedItems) {
      const categoryOrder = [
        'Welcome Drinks',
        'Soup',
        'Starters',
        'Chaat Counter',
        'Live Counters',
        'World Cuisine',
        'Traditional Counter',
        'Salad',
        "Sweet's",
        "Liquid Sweet's",
        'Garvi Gujarat Counter',
        'Main Course',
        'Roti / Bread',
        'Desserts'
      ];

      const sortedItems = [...location.state.selectedItems].sort((a: any, b: any) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        if (indexA !== indexB) return indexA - indexB;
        return a.name.localeCompare(b.name);
      });

      const groupedItems: { [key: string]: string[] } = {};
      sortedItems.forEach((item: any) => {
        if (!groupedItems[item.category]) {
          groupedItems[item.category] = [];
        }
        groupedItems[item.category].push(item.name);
      });

      let itemsMessage = "I have selected the following items from your menu:\n\n";
      
      // Use categoryOrder to ensure the message follows the menu's category sequence
      categoryOrder.forEach(category => {
        if (groupedItems[category]) {
          itemsMessage += `*${category}:*\n`;
          groupedItems[category].forEach(item => {
            itemsMessage += `- ${item}\n`;
          });
          itemsMessage += "\n";
        }
      });

      setFormData(prev => ({
        ...prev,
        message: itemsMessage.trim()
      }));
    } else if (location.state?.message) {
      setFormData(prev => ({
        ...prev,
        message: location.state.message
      }));
    }
  }, [location.state]);

  const downloadPDF = () => {
    if (location.state?.pdfData) {
      const link = document.createElement('a');
      link.href = location.state.pdfData;
      link.download = 'selected-menu.pdf';
      link.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    let messageText = `*New Booking Request - SB Caterers*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Event:* ${formData.eventType.charAt(0).toUpperCase() + formData.eventType.slice(1)}\n` +
      `*Guests:* ${formData.guests}\n` +
      `*Date:* ${formData.date}\n` +
      `*Message:* ${formData.message}`;
    
    if (location.state?.pdfData) {
      messageText += `\n\n_Note: I have selected specific items from your menu. Please check the PDF I will share separately._`;
    }
    
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/918200428348?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 bg-premium-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Reservation</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">Book Your <br /> <span className="text-gold italic">Event</span></h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Planning a wedding, corporate event, or a private party? Fill out the form and our event coordinator will get back to you within 24 hours.
              </p>
            </motion.div>

            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Call for urgent booking</p>
                  <p className="text-white font-bold">+91 8200428348</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Our Office</p>
                  <p className="text-white font-bold">Kalol, Gujarat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 p-8 md:p-12 border border-white/10 relative"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-6">
                    <Send className="text-premium-black" size={32} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-4">Request Sent!</h3>
                  <p className="text-white/60 mb-8">Thank you for choosing SB Caterers. We will contact you shortly to discuss your event.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-gold border-b border-gold pb-1 hover:text-gold-light transition-colors uppercase tracking-widest text-xs font-bold"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  {location.state?.pdfData && (
                    <div className="bg-gold/10 border border-gold/20 p-4 mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold/20 rounded text-gold">
                          <FileText size={16} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Menu Selection Saved</p>
                          <p className="text-white/40 text-xs">A PDF of your selected items is ready.</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={downloadPDF}
                        className="text-gold text-xs font-bold uppercase tracking-widest hover:text-gold-light transition-colors"
                      >
                        Download PDF
                      </button>
                    </div>
                  )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 focus:outline-none focus:border-gold transition-colors text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 focus:outline-none focus:border-gold transition-colors text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Event Type</label>
                    <select 
                      required
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-gold transition-colors text-white appearance-none"
                    >
                      <option value="" className="bg-premium-black">Select Event</option>
                      <option value="wedding" className="bg-premium-black">Wedding</option>
                      <option value="corporate" className="bg-premium-black">Corporate Event</option>
                      <option value="birthday" className="bg-premium-black">Birthday Party</option>
                      <option value="other" className="bg-premium-black">Other Celebration</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">No. of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="number" 
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        placeholder="e.g. 150"
                        className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 focus:outline-none focus:border-gold transition-colors text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold font-bold">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      required
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 focus:outline-none focus:border-gold transition-colors text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold font-bold">Special Requests</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more about your requirements..."
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-gold transition-colors text-white resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold text-premium-black py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-light transition-all transform active:scale-95 shadow-xl"
                >
                  Submit Booking Request
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
