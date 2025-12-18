
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-12 rounded-[2rem] border border-black/5 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Decorative Element */}
        <div className="absolute top-0 right-0 p-8">
            <span className="editorial-font italic text-8xl text-neutral-100/50 pointer-events-none select-none">WH</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl editorial-font italic mb-2">
            {isLogin ? 'Welcome back.' : 'Join the hub.'}
          </h2>
          <p className="text-neutral-500 font-light mb-12">
            {isLogin ? 'Continue your style journey.' : 'Digitize your closet and get inspired.'}
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">User Handle</label>
                <input 
                  type="text" 
                  placeholder="@your_handle"
                  className="w-full px-6 py-4 bg-neutral-100 rounded-full text-sm outline-none border border-transparent focus:border-black/10 focus:bg-white transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@email.com"
                className="w-full px-6 py-4 bg-neutral-100 rounded-full text-sm outline-none border border-transparent focus:border-black/10 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-neutral-100 rounded-full text-sm outline-none border border-transparent focus:border-black/10 focus:bg-white transition-all"
              />
            </div>

            <button className="w-full py-5 bg-black text-white rounded-full flex items-center justify-center space-x-2 group hover:bg-neutral-800 transition-all shadow-xl">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-black/5">
             <button className="w-full py-4 border border-black text-black rounded-full flex items-center justify-center space-x-3 hover:bg-black hover:text-white transition-all">
              <Github size={20} />
              <span className="text-sm font-medium italic">Continue with GitHub</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-black border-b border-black"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
