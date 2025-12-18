import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const highlights = [
  { id: 1, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', handle: '@elena_v' },
  { id: 2, img: 'https://images.unsplash.com/photo-1539109132381-31a1ba972f5d?q=80&w=1000&auto=format&fit=crop', handle: '@marcus_k' },
  { id: 3, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop', handle: '@sophia_style' },
  { id: 4, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', handle: '@neutral_vibes' },
  { id: 5, img: 'https://images.unsplash.com/photo-1529139513055-07f9127ef3b0?q=80&w=1000&auto=format&fit=crop', handle: '@street_arch' },
  { id: 6, img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1000&auto=format&fit=crop', handle: '@luxe_minimal' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5DC]">
      {/* Hero Section - Matching Figma Header */}
      <section className="relative h-[85vh] px-10 pt-10 flex flex-col items-center justify-center border-b border-black/5">
        <div className="absolute top-10 w-full px-10 flex justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">
          <span>Digital Closet Solution</span>
          <span>Public Social Platform</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <h1 className="text-7xl md:text-[120px] editorial-font italic tracking-tighter leading-[0.85] mb-10">
            Style <br /> Without <br /> Boundaries
          </h1>
          <p className="max-w-md mx-auto text-sm font-medium leading-relaxed mb-12 uppercase tracking-wide opacity-60">
            The world's first public-driven digital wardrobe. Style your fits, share your closet, and inspire the public.
          </p>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => navigate('/auth')}
              className="px-12 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-black/20"
            >
              Join Community
            </button>
          </div>
        </motion.div>

        {/* Floating Decorative Elements from your Design */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-30">
          <div className="w-12 h-[1px] bg-black"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to Explore</span>
        </div>
      </section>

      {/* Community Highlights - Grid Match */}
      <section className="py-24 px-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl editorial-font italic mb-2 leading-none">Community Highlights</h2>
            <p className="text-xs uppercase tracking-widest font-bold opacity-40">Top styles from the public</p>
          </div>
          <Link to="/feed" className="text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-1">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white border border-black/5 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={item.img} 
                  alt="Fashion fit" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[#F5F5DC] text-[10px] font-bold uppercase tracking-[0.3em]">View Pieces</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span>{item.handle}</span>
                <span className="opacity-30">#STYLEHUB</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Section - Exactly as seen in Figma */}
      <section className="py-24 border-t border-black/5 px-10 flex flex-col md:flex-row gap-20 items-center">
        <div className="md:w-1/2">
          <h2 className="text-6xl md:text-8xl editorial-font leading-[0.9] mb-10">
            Join Our <br /> Fashion <br /> Community
          </h2>
          <p className="text-sm font-medium leading-loose opacity-60 mb-10 max-w-sm">
            Digitize your current closet, mix and match with pieces from around the world, and get styling suggestions from top curators.
          </p>
          <button 
            onClick={() => navigate('/auth')}
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group"
          >
            <span>Start your collection now</span>
            <div className="p-3 bg-black text-white rounded-full group-hover:translate-x-3 transition-all">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
        <div className="md:w-1/2 aspect-[4/5] bg-neutral-200 overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale"
            alt="Community"
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;