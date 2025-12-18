import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, LayoutGrid, Sparkles, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Feed', path: '/feed', icon: Sparkles },
    { name: 'Wardrobe', path: '/wardrobe', icon: ShoppingBag },
    { name: 'Mix & Match', path: '/lab', icon: LayoutGrid },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      <header className="fixed top-0 w-full bg-[#F5F5DC]/90 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl editorial-font font-bold tracking-tighter">
            WARDROBE HUB
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12 text-xs font-bold uppercase tracking-widest">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-all duration-300 hover:opacity-100 ${
                  isActive(item.path) ? 'text-black' : 'text-black/40'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Design-Match: The Profile/Auth Circle */}
            <button 
              onClick={() => navigate('/auth')}
              className={`p-2 rounded-full border border-black transition-all ${
                isActive('/auth') ? 'bg-black text-[#F5F5DC]' : 'hover:bg-black hover:text-[#F5F5DC]'
              }`}
            >
              <User size={18} />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#F5F5DC] z-[60] flex flex-col items-center justify-center space-y-8"
          >
            <button className="absolute top-6 right-6" onClick={() => setIsOpen(false)}><X size={32} /></button>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-4xl editorial-font font-bold"
              >
                {item.name}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setIsOpen(false)} className="text-xl uppercase tracking-widest border-t border-black/10 pt-8 w-1/2 text-center">
              Account
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Design-Match Footer: Clean Cream Footer */}
      <footer className="bg-[#F5F5DC] border-t border-black/5 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl editorial-font font-bold italic underline">Wardrobe Hub</div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
            <Link to="/feed">Explore</Link>
            <Link to="/wardrobe">Collection</Link>
            <Link to="/lab">Studio</Link>
            <span>Instagram</span>
          </div>
          <div className="text-[10px] text-black/40 uppercase tracking-widest">
            © 2025 All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};