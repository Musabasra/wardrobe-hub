import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Mail, Lock, AtSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating a login delay for realism
    setTimeout(() => {
      setLoading(false);
      navigate('/wardrobe'); // Redirects to wardrobe after "login"
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-white border border-black/5 p-12 shadow-sm relative"
      >
        {/* Editorial Branding */}
        <div className="absolute -top-12 left-0">
          <span className="editorial-font italic text-6xl text-black/5 select-none uppercase tracking-tighter">
            {isLogin ? 'Identity' : 'Registration'}
          </span>
        </div>

        <div className="mb-12">
          <h2 className="text-5xl editorial-font italic tracking-tighter mb-4">
            {isLogin ? 'Welcome Back.' : 'Create Account.'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-black"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
              {isLogin ? 'Entry to your digital closet' : 'Join the public style hub'}
            </p>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleAuth}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-3">Public Handle</label>
                <div className="relative">
                  <AtSign className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20" size={16} />
                  <input 
                    type="text" 
                    placeholder="YOUR_NAME"
                    className="w-full bg-transparent border-b border-black/10 py-3 pl-8 text-sm outline-none focus:border-black transition-all"
                    required
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-3">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20" size={16} />
              <input 
                type="email" 
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-transparent border-b border-black/10 py-3 pl-8 text-sm outline-none focus:border-black transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-3">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20" size={16} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-black/10 py-3 pl-8 text-sm outline-none focus:border-black transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:opacity-90 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Join Now')}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        <div className="mt-12 space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-full h-[1px] bg-black/5"></div>
            <span className="absolute bg-white px-4 text-[9px] uppercase tracking-widest font-bold opacity-30">Or Continue With</span>
          </div>

          <button className="w-full py-4 border border-black/10 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
            <Github size={18} />
            GitHub
          </button>
        </div>

        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:border-b border-black transition-all pb-1"
          >
            {isLogin ? "Need an account? Sign Up" : "Already registered? Log In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;