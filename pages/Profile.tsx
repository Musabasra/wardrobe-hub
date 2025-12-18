import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Grid, Bookmark, Tag, X, LogOut, Shield, Bell, Camera, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- PROFILE STATE (Simulated Backend) ---
  const [user, setUser] = useState({
    handle: 'your_handle',
    displayName: 'Identity Name',
    bio: 'Curating a timeless capsule wardrobe. Focused on sustainable textures and monochrome silhouettes.',
    profilePic: 'https://i.pravatar.cc/150?u=me',
    followersCount: 450,
    followingCount: 280
  });

  const [activeTab, setActiveTab] = useState<'fits' | 'saved' | 'tagged'>('fits');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [connectionsModal, setConnectionsModal] = useState<{ open: boolean, type: 'Followers' | 'Following' }>({ open: false, type: 'Followers' });
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Mock data for lists
  const posts = [1, 2, 3, 4, 5, 6];
  const mockUsers = [
    { id: 1, name: 'Alex Rivera', handle: '@arivera', img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jordan Case', handle: '@j_case', img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Sasha Vane', handle: '@sv_studio', img: 'https://i.pravatar.cc/150?u=3' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({
      ...user,
      displayName: formData.get('displayName') as string,
      bio: formData.get('bio') as string,
    });
    setIsEditOpen(false);
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center gap-12 mb-16 border-b border-black/5 pb-16">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-40 h-40 rounded-full border border-black/10 p-1 flex-shrink-0 overflow-hidden">
              <img src={user.profilePic} className="w-full h-full rounded-full grayscale object-cover" alt="Profile" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-4">
              <h2 className="text-2xl font-bold tracking-tighter uppercase">@{user.handle}</h2>
              <button onClick={() => setIsEditOpen(true)} className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all">
                Edit Profile
              </button>
              <button onClick={() => setIsSettingsOpen(true)} className="opacity-30 hover:opacity-100 transition-opacity">
                <Settings size={20} />
              </button>
            </div>
            
            <h3 className="text-sm font-bold mb-2 uppercase tracking-tight">{user.displayName}</h3>
            
            <div className="flex gap-10 mb-6">
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg">{posts.length}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Pieces</span>
              </div>
              <button onClick={() => setConnectionsModal({ open: true, type: 'Followers' })} className="flex flex-col items-start hover:opacity-60">
                <span className="font-bold text-lg">{user.followersCount}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Followers</span>
              </button>
              <button onClick={() => setConnectionsModal({ open: true, type: 'Following' })} className="flex flex-col items-start hover:opacity-60">
                <span className="font-bold text-lg">{user.followingCount}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Following</span>
              </button>
            </div>
            
            <p className="text-sm font-light leading-relaxed max-w-md italic opacity-70 whitespace-pre-line">{user.bio}</p>
          </div>
        </header>

        {/* --- TABS & GRID (Stay the same) --- */}
        <div className="flex justify-center gap-16 mb-12 border-t border-black/5 pt-4">
          <button onClick={() => setActiveTab('fits')} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all pb-4 border-b ${activeTab === 'fits' ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}><Grid size={14} /> My Fits</button>
          <button onClick={() => setActiveTab('saved')} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all pb-4 border-b ${activeTab === 'saved' ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}><Bookmark size={14} /> Saved</button>
          <button onClick={() => setActiveTab('tagged')} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all pb-4 border-b ${activeTab === 'tagged' ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-60'}`}><Tag size={14} /> Tagged</button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {activeTab === 'fits' ? (
            posts.map((i) => (
              <motion.div layoutId={`post-${i}`} key={i} onClick={() => setSelectedPost(i)} className="aspect-square bg-white border border-black/5 group relative overflow-hidden cursor-pointer">
                <img src={`https://images.unsplash.com/photo-${1515886657613 + i}-9f3515b0c78f?w=600`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center opacity-20 uppercase tracking-[0.3em] text-[10px] font-bold">No {activeTab} posts yet</div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Edit Identity Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="relative bg-white w-full max-w-lg p-10 shadow-2xl">
              <button onClick={() => setIsEditOpen(false)} className="absolute top-6 right-6 opacity-40 hover:opacity-100"><X size={20}/></button>
              <h2 className="editorial-font italic text-3xl mb-8">Edit Identity</h2>
              
              <div className="flex items-center gap-6 mb-8 p-4 bg-[#F5F5DC]">
                 <img src={user.profilePic} className="w-16 h-16 rounded-full grayscale object-cover border border-black/10" />
                 <button onClick={() => fileInputRef.current?.click()} className="text-[9px] uppercase font-bold tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all">Change Photo</button>
              </div>

              <form onSubmit={saveProfileChanges} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Display Name</label>
                  <input name="displayName" type="text" defaultValue={user.displayName} className="w-full bg-[#F5F5DC] p-3 text-sm outline-none border border-transparent focus:border-black transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Bio</label>
                  <textarea name="bio" rows={3} className="w-full bg-[#F5F5DC] p-3 text-sm outline-none border border-transparent focus:border-black transition-all" defaultValue={user.bio} />
                </div>
                <button type="submit" className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">Confirm Changes</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Connections (Followers/Following) Modal */}
      <AnimatePresence>
        {connectionsModal.open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setConnectionsModal({ ...connectionsModal, open: false })} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="relative bg-white w-full max-w-sm shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white sticky top-0">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">{connectionsModal.type}</h2>
                <button onClick={() => setConnectionsModal({ ...connectionsModal, open: false })}><X size={18}/></button>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {mockUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <img src={u.img} className="w-10 h-10 rounded-full grayscale" />
                      <div>
                        <p className="text-[11px] font-bold uppercase">{u.handle}</p>
                        <p className="text-[10px] opacity-40">{u.name}</p>
                      </div>
                    </div>
                    <button className="p-2 opacity-20 group-hover:opacity-100 transition-opacity"><UserPlus size={16}/></button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Settings & Post Details Modals (Keep from previous version) --- */}
      {/* ... [Rest of settings/post detail modals from before] */}
    </div>
  );
};

export default Profile;