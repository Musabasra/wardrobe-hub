import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Heart, MessageCircle, Share2, Scissors, Link as LinkIcon, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feed: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showCenterHeart, setShowCenterHeart] = useState<number | null>(null);

  const posts = [
    {
      id: 1,
      user: "@minimalist_archive",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      caption: "Texture study: Heavy wool and raw silk.",
      likes: 124,
      linkedItems: 3
    },
    {
      id: 2,
      user: "@urban_studio",
      image: "https://images.unsplash.com/photo-1539109132382-381bb3f1cff6?w=800",
      caption: "Oversized silhouettes for the transition season.",
      likes: 89,
      linkedItems: 2
    }
  ];

  // Logic: Like interaction
  const handleLike = (id: number) => {
    if (!likedPosts.includes(id)) {
      setLikedPosts([...likedPosts, id]);
      setShowCenterHeart(id);
      setTimeout(() => setShowCenterHeart(null), 800);
    } else {
      setLikedPosts(likedPosts.filter(p => p !== id));
    }
  };

  // Logic: Search filtering (Simulated)
  const filteredPosts = posts.filter(p => 
    p.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F5DC] pt-8 pb-20 px-6">
      {/* Header Actions */}
      <div className="max-w-xl mx-auto mb-12 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH ARCHIVE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/5 py-4 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-black/20 transition-all"
          />
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-14 h-14 bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-all shadow-xl"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Post Feed */}
      <div className="max-w-xl mx-auto space-y-20">
        {filteredPosts.map((post) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            key={post.id} 
            className="bg-white border border-black/5 p-4 shadow-sm"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <button 
                onClick={() => navigate('/profile')} 
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-100 border border-black/5 overflow-hidden">
                   <img src={`https://i.pravatar.cc/150?u=${post.id}`} alt="" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest group-hover:border-b border-black">{post.user}</span>
              </button>
              <button 
                onClick={() => navigate('/wardrobe')}
                className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity"
              >
                <LinkIcon size={12} /> {post.linkedItems} Linked Pieces
              </button>
            </div>

            {/* Post Image with Double Click Like */}
            <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer">
              <img 
                src={post.image} 
                onDoubleClick={() => handleLike(post.id)}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="" 
              />
              
              {/* Center Heart Animation */}
              <AnimatePresence>
                {showCenterHeart === post.id && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <Heart size={80} fill="white" className="text-white drop-shadow-2xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Post Actions */}
            <div className="py-6 px-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  <button onClick={() => handleLike(post.id)} className="transition-transform active:scale-125">
                    <Heart size={22} className={likedPosts.includes(post.id) ? "fill-black text-black" : "opacity-30"} />
                  </button>
                  <button onClick={() => setSelectedPost(post)} className="opacity-30 hover:opacity-100 transition-opacity">
                    <MessageCircle size={22} />
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                    className="opacity-30 hover:opacity-100 transition-opacity"
                  >
                    <Share2 size={22} />
                  </button>
                </div>
                <button 
                  onClick={() => navigate('/lab')}
                  className="flex items-center gap-2 px-4 py-2 border border-black/10 text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  <Scissors size={14} /> Style with my pieces
                </button>
              </div>
              <p className="text-[11px] font-light leading-relaxed">
                <span className="font-bold mr-2 uppercase">{post.user}</span>
                {post.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODALS --- */}

      {/* 1. Create Post Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsCreateModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} className="relative bg-white w-full max-w-lg p-10">
              <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-6 right-6 opacity-40 hover:opacity-100"><X size={20}/></button>
              <h2 className="editorial-font italic text-3xl mb-8">New Fit.</h2>
              <div className="space-y-6">
                <div className="aspect-square bg-[#F5F5DC] border border-dashed border-black/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#efefd0] transition-all">
                  <Camera size={32} className="opacity-20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Click to upload look</span>
                </div>
                <textarea placeholder="Write a caption..." className="w-full bg-[#F5F5DC] p-4 text-sm outline-none border border-transparent focus:border-black transition-all" rows={3} />
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  Post to Hub
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Post Detail (Comments) Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelectedPost(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div layoutId={`post-${selectedPost.id}`} className="relative bg-white w-full max-w-4xl h-[70vh] flex shadow-2xl overflow-hidden">
               <div className="flex-1 bg-neutral-100">
                  <img src={post.image} className="w-full h-full object-cover" />
               </div>
               <div className="w-80 flex flex-col bg-white">
                  <div className="p-6 border-b border-black/5 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{selectedPost.user}</span>
                    <button onClick={() => setSelectedPost(null)}><X size={18}/></button>
                  </div>
                  <div className="flex-grow p-6 overflow-y-auto space-y-4">
                    <p className="text-[11px] font-light"><span className="font-bold uppercase mr-2">{selectedPost.user}</span>{selectedPost.caption}</p>
                    <div className="pt-4 border-t border-black/5">
                      <p className="text-[9px] opacity-40 uppercase font-bold tracking-widest">No comments yet.</p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-black/5">
                    <input type="text" placeholder="Add a comment..." className="w-full text-[11px] outline-none py-2" />
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;