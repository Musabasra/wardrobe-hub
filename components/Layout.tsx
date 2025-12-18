import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ShoppingBag, LayoutGrid, User } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // HIDE links if we are on Landing OR Auth page to prevent unauthorized access
  const isPublicPage = location.pathname === '/' || location.pathname === '/auth';
  const isLandingPage = location.pathname === '/';

  const navItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Feed', path: '/feed', icon: Sparkles },
    { name: 'Wardrobe', path: '/wardrobe', icon: ShoppingBag },
    { name: 'Studio', path: '/lab', icon: LayoutGrid },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full bg-[#F5F5DC]/90 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo - Always visible */}
          <Link to="/" className="text-2xl editorial-font font-bold tracking-tighter">
            WARDROBE HUB
          </Link>

          {/* NAV LINKS: Only show if NOT on a public page (Landing or Auth) */}
          {!isPublicPage && (
            <nav className="hidden md:flex items-center space-x-12 text-[10px] font-bold uppercase tracking-widest">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-all duration-300 hover:text-black ${
                    location.pathname === item.path ? 'text-black' : 'text-black/30'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Action */}
          <div className="flex items-center gap-4">
            {/* Show "Enter App" only on the Landing Page. Hide completely on the Auth page. */}
            {isLandingPage ? (
              <Link 
                to="/auth" 
                className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity"
              >
                Enter App
              </Link>
            ) : !isPublicPage ? (
              /* Show "Account" icon only when logged in (not on public pages) */
              <Link 
                to="/profile" 
                className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity flex items-center gap-2"
              >
                <User size={14} />
                Account
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-black/5 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">
            © 2024 Wardrobe Hub — Public Style Archive
          </span>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-30">
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};