import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Grid, Bookmark, Tag } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="bg-[#F5F5DC] min-h-screen pt-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center gap-12 mb-16 border-b border-black/5 pb-16">
          <div className="w-40 h-40 rounded-full border border-black/10 p-1 flex-shrink-0">
            <img 
              src="https://i.pravatar.cc/150?u=me" 
              className="w-full h-full rounded-full grayscale object-cover" 
              alt="Profile"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-6">
              <h2 className="text-2xl font-bold tracking-tighter uppercase">@your_handle</h2>
              <button className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all">
                Edit Profile
              </button>
              <Settings size={20} className="opacity-30 cursor-pointer hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex gap-10 mb-6">
              <div className="flex flex-col">
                <span className="font-bold text-lg">12</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Pieces</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">450</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Followers</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">280</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Following</span>
              </div>
            </div>
            
            <p className="text-sm font-light leading-relaxed max-w-md italic opacity-70">
              Curating a timeless capsule wardrobe. Focused on sustainable textures and monochrome silhouettes.
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-16 mb-12 border-t border-black/5 pt-4">
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-4">
            <Grid size={14} /> My Fits
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-30 hover:opacity-100 pb-4">
            <Bookmark size={14} /> Saved
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-30 hover:opacity-100 pb-4">
            <Tag size={14} /> Tagged
          </button>
        </div>

        {/* Content Grid (Empty State) */}
        <div className="grid grid-cols-3 gap-2 pb-20">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-white border border-black/5 group relative overflow-hidden cursor-pointer">
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity">
                  <span className="text-[10px] font-bold uppercase text-black">View Post</span>
               </div>
               <img 
                src={`https://images.unsplash.com/photo-${1515886657613 + i}-9f3515b0c78f?w=400&auto=format&fit=crop`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
               />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;