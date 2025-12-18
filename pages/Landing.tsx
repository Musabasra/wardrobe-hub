
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
  { id: 1, img: 'https://picsum.photos/seed/fashion1/800/1000', handle: '@elena_v' },
  { id: 2, img: 'https://picsum.photos/seed/fashion2/800/1000', handle: '@marcus_k' },
  { id: 3, img: 'https://picsum.photos/seed/fashion3/800/1000', handle: '@sophia_style' },
  { id: 4, img: 'https://picsum.photos/seed/fashion4/800/1000', handle: '@neutral_vibes' },
];

const Landing: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl editorial-font italic leading-tight mb-8">
              Curate Your <br /> Digital Style
            </h1>
            <p className="text-lg md:text-xl font-light mb-12 text-neutral-700 max-w-xl mx-auto">
              A minimalist space to digitize your wardrobe, create stunning outfits, and inspire a global community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/auth" 
                className="px-10 py-4 bg-black text-white rounded-full flex items-center space-x-2 group hover:pr-8 transition-all"
              >
                <span>Join Community</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/feed" 
                className="px-10 py-4 border border-black rounded-full hover:bg-black hover:text-[#F5F5DC] transition-all"
              >
                Explore Feed
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="flex items-center text-sm uppercase tracking-widest text-neutral-400 mb-4">
                <Sparkles size={16} className="mr-2" /> Community
              </span>
              <h2 className="text-4xl md:text-5xl editorial-font italic">Trending Highlights</h2>
            </div>
            <Link to="/feed" className="text-sm font-medium border-b border-black pb-1">
              View all fit pics
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img 
                    src={item.img} 
                    alt="Fit pic" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                </div>
                <div className="mt-4 flex justify-between items-center px-2">
                  <span className="text-sm font-medium">{item.handle}</span>
                  <button className="text-xs uppercase tracking-wider text-neutral-400">View Pieces</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black text-[#F5F5DC]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl editorial-font mb-12 italic">
            Your closet, <br /> reimagined.
          </h2>
          <Link 
            to="/wardrobe" 
            className="inline-block px-12 py-5 bg-[#F5F5DC] text-black rounded-full text-lg font-medium hover:scale-105 transition-transform"
          >
            Start Digitize Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
