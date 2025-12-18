
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, LayoutGrid, Sparkles, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Feed', path: '/feed', icon: Sparkles },
    { name: 'Wardrobe', path: '/wardrobe', icon: ShoppingBag },
    { name: 'Mix & Match', path: '/lab', icon: LayoutGrid },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-[#F5F5DC]/80 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl editorial-font font-bold tracking-tight">
            WARDROBE HUB
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 hover:text-black ${
                  isActive(item.path) ? 'text-black border-b border-black' : 'text-black/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/auth" 
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-[#F5F5DC] z-40 md:hidden flex flex-col p-8 space-y-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-2xl editorial-font flex items-center space-x-4"
              >
                <item.icon size={24} />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="text-2xl editorial-font flex items-center space-x-4 border-t border-black/10 pt-6"
            >
              <LogIn size={24} />
              <span>Sign In</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-black text-[#F5F5DC] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl editorial-font font-bold mb-6 italic">Wardrobe Hub</h2>
            <p className="max-w-sm text-neutral-400 font-light leading-relaxed">
              Redefining your digital closet. A social fashion platform designed for the minimalist editorial enthusiast.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest">Platform</h3>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link to="/feed">Explore Feed</Link></li>
              <li><Link to="/wardrobe">My Digital Wardrobe</Link></li>
              <li><Link to="/lab">Mix & Match Lab</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest">Connect</h3>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
