
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';

const feeds = [
  {
    id: 1,
    user: 'elara.vogue',
    avatar: 'https://i.pravatar.cc/150?u=elara',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop',
    likes: 1240,
    pieces: 4
  },
  {
    id: 2,
    user: 'theo_minimal',
    avatar: 'https://i.pravatar.cc/150?u=theo',
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&auto=format&fit=crop',
    likes: 856,
    pieces: 3
  },
  {
    id: 3,
    user: 'studio.sophie',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    image: 'https://images.unsplash.com/photo-1539109132304-39277c6a0b40?w=800&auto=format&fit=crop',
    likes: 2311,
    pieces: 5
  },
  {
    id: 4,
    user: 'aesthetic.josh',
    avatar: 'https://i.pravatar.cc/150?u=josh',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop',
    likes: 540,
    pieces: 3
  }
];

const Feed: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12 border-b border-black/10 pb-8">
        <div>
          <h1 className="text-4xl editorial-font italic mb-2">Social Feed</h1>
          <p className="text-neutral-500 font-light">See how the community is styling their wardrobe pieces.</p>
        </div>
        <button className="hidden md:flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors">
          <Plus size={20} />
          <span>Post Fit Pic</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {feeds.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border border-black/5" />
                <span className="font-medium text-sm tracking-tight">{post.user}</span>
              </div>
              <button className="text-neutral-400 hover:text-black">
                <Share2 size={18} />
              </button>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-neutral-200">
              <img 
                src={post.image} 
                alt="Fit Pic" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-full text-[10px] uppercase tracking-widest font-bold">
                {post.pieces} Pieces Linked
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 group/btn">
                  <Heart size={20} className="group-hover/btn:fill-red-500 group-hover/btn:text-red-500 transition-colors" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2">
                  <MessageCircle size={20} />
                  <span className="text-sm">Comments</span>
                </button>
              </div>
              <button className="text-sm font-medium italic border-b border-black">
                Shop the look
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Feed;
