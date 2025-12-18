import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Grid, Bookmark, Tag, X, LogOut, Shield, Bell, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'fits' | 'saved' | 'tagged'>('fits');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Mock data for the grid
  const posts = [1, 2, 3, 4, 5, 6];

  const handleLogout = () => {
    // In a real app, you'd clear the session here
    navigate('/auth');
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center gap-12 mb-16 border-b border-black/5 pb-16">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full border border-black/10 p-1 flex-shrink-0 overflow-hidden">
              <img 
                src="https://i.pravatar.cc/150?u=me" 
                className="w-full h-full rounded-full grayscale object-cover" 
                alt="Profile"
              />
            </div>
            <button onClick={() => setIsEditOpen(true)} className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-6">
              <h2 className="text-2xl font-bold tracking-tighter uppercase">@your_handle</h2>
              <button 
                onClick={() => setIsEditOpen(true)}
                className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all"
              >
                Edit Profile
              </button>
              <button onClick={() => setIsSettingsOpen(true)} className="opacity-30 hover:opacity-100 transition-opacity">
                <Settings size={20} />
              </button>
            </div>
            
            <div className="flex gap-10 mb-6">
              <button className="flex flex-col items-start hover:opacity-60 transition-opacity">
                <span className="font-bold text-lg">{posts.length}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Pieces</span>
              </button>
              <button className="flex flex-col items-start hover:opacity-60 transition-opacity">
                <span className="font-bold text-lg">450</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Followers</span>
              </button>
              <button className="flex flex-col items-start hover:opacity-60 transition-opacity">
                <span className="font-bold text-lg">280</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Following</span>
              </button>
            </div>
            
            <p className="text-sm font-light leading-relaxed max-w-md italic opacity-70">
              Curating a timeless capsule wardrobe. Focused on sustainable textures and monochrome silhouettes.
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-16 mb-12 border-t border-black/5 pt-4">
          <button 
            onClick={() => setActiveTab('fits')}
            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all pb-4 border-b ${activeTab === 'fits' ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}
          >
            <Grid size={14} /> My Fits
          </button>
          <button 
             onClick={() => setActiveTab('saved')}
             className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all pb-4 border-b ${activeTab === 'saved' ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}
          >
            <Bookmark size={14} /> Saved
          </button>
          <button 
             onClick={() => setActiveTab('tagged')}
             className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all pb-4 border-b ${activeTab === 'tagged' ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}
          >
            <Tag size={14} /> Tagged
          </button>
        </div>

        {/* Dynamic Grid Content */}
        <div className="grid grid-cols-3 gap-2">
          {activeTab === 'fits' ? (
            posts.map((i) => (
              <motion.div 
                layoutId={`post-${i}`}
                key={i} 
                onClick={() => setSelectedPost(i)}
                className="aspect-square bg-white border border-black/5 group relative overflow-hidden cursor-pointer"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${1515886657613 + i}-9f3515b0c78f?w=600`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center opacity-20 uppercase tracking-[0.3em] text-[10px] font-bold">
              No {activeTab} posts yet
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Edit Profile Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="relative bg-white w-full max-w-lg p-10 shadow-2xl">
              <button onClick={() => setIsEditOpen(false)} className="absolute top-6 right-6 opacity-40 hover:opacity-100"><X size={20}/></button>
              <h2 className="editorial-font italic text-3xl mb-8">Edit Identity</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Display Name</label>
                  <input type="text" defaultValue="Your Handle" className="w-full bg-[#F5F5DC] p-3 text-sm outline-none border border-transparent focus:border-black transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Bio</label>
                  <textarea rows={3} className="w-full bg-[#F5F5DC] p-3 text-sm outline-none border border-transparent focus:border-black transition-all" defaultValue="Curating a timeless capsule wardrobe..." />
                </div>
                <button onClick={() => setIsEditOpen(false)} className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsSettingsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} exit={{y:50, opacity:0}} className="relative bg-white w-full max-w-sm overflow-hidden">
              <div className="p-8 border-b border-black/5 flex justify-between items-center">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.2em]">Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)}><X size={18}/></button>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors text-sm">
                  <Shield size={18} className="opacity-40"/> Privacy & Safety
                </button>
                <button className="w-full flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors text-sm">
                  <Bell size={18} className="opacity-40"/> Notifications
                </button>
                <div className="h-[1px] bg-black/5 my-2" />
                <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-sm text-red-500 font-bold uppercase tracking-widest text-[10px]">
                  <LogOut size={18}/> Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Post Detail Modal (Clicking a Post) */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelectedPost(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div layoutId={`post-${selectedPost}`} className="relative bg-white w-full max-w-5xl h-[80vh] flex flex-col md:flex-row shadow-2xl overflow-hidden">
              <div className="flex-1 bg-neutral-100 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1515886657613 + selectedPost}-9f3515b0c78f?w=1200`} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full md:w-80 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-black/5">
                   <div className="w-8 h-8 rounded-full bg-neutral-200" />
                   <span className="text-[11px] font-bold uppercase tracking-widest">@your_handle</span>
                </div>
                <p className="text-sm font-light italic opacity-60 flex-grow">
                  Outfit composition from the Studio. Focus on silhouette and texture.
                </p>
                <button onClick={() => setSelectedPost(null)} className="mt-auto py-4 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;