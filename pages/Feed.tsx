import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus, Search, Filter } from 'lucide-react';

const feeds = [
  {
    id: 1,
    user: 'elara.vogue',
    avatar: 'https://i.pravatar.cc/150?u=elara',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop',
    likes: 1240,
    pieces: 4,
    description: "Minimalist linen set for the summer solstice."
  },
  {
    id: 2,
    user: 'theo_minimal',
    avatar: 'https://i.pravatar.cc/150?u=theo',
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&auto=format&fit=crop',
    likes: 856,
    pieces: 3,
    description: "Structured wool overcoat with vintage denim."
  },
  {
    id: 3,
    user: 'studio.sophie',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    image: 'https://images.unsplash.com/photo-1539109132304-39277c6a0b40?w=800&auto=format&fit=crop',
    likes: 2311,
    pieces: 5,
    description: "Layering textures for a monochrome look."
  }
];

const Feed: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen">
      {/* Editorial Header & Search */}
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-black/5 pb-12">
          <div>
            <h1 className="text-6xl editorial-font italic tracking-tighter mb-4">The Public Feed</h1>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
              <span>Latest Inspirations</span>
              <div className="w-8 h-[1px] bg-black"></div>
              <span>Global Community</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH STYLES..." 
                className="bg-white/50 border border-black/5 rounded-full py-3 pl-12 pr-6 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:bg-white focus:border-black/20 transition-all w-64"
              />
            </div>
            <button className="p-3 bg-black text-white rounded-full hover:scale-105 transition-transform">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-32">
          {feeds.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-[2px] border border-black rounded-full">
                    <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full grayscale" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">{post.user}</p>
                    <p className="text-[9px] opacity-40 uppercase tracking-tighter">Paris, France</p>
                  </div>
                </div>
                <button className="opacity-30 hover:opacity-100 transition-opacity">
                  <Share2 size={16} />
                </button>
              </div>

              {/* Main Image Container */}
              <div 
                className="relative aspect-[3/4] overflow-hidden bg-white border border-black/5 shadow-sm mb-8"
                onDoubleClick={() => toggleLike(post.id)}
              >
                <img 
                  src={post.image} 
                  alt="Fit Pic" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                {/* View Pieces Tag - Match Figma */}
                <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-black/10 px-6 py-3 rounded-none flex items-center gap-3 group/tag hover:bg-black hover:text-white transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{post.pieces} Pieces Linked</span>
                  <Plus size={12} className="group-hover/tag:rotate-90 transition-transform" />
                </button>

                {/* Like Animation Heart */}
                <AnimatePresence>
                  {likedPosts.includes(post.id) && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <Heart size={80} fill="white" className="text-white drop-shadow-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactions */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 group/heart"
                  >
                    <Heart 
                      size={20} 
                      className={`transition-all ${likedPosts.includes(post.id) ? 'fill-black text-black scale-110' : 'text-black/30 group-hover/heart:text-black'}`} 
                    />
                    <span className="text-[10px] font-bold">{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
                    <MessageCircle size={20} />
                    <span className="text-[10px] font-bold uppercase">Comment</span>
                  </button>
                </div>
                
                <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
                  Style with my pieces
                </button>
              </div>
              
              <p className="mt-6 text-sm font-light leading-relaxed max-w-md opacity-70 italic">
                "{post.description}"
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;