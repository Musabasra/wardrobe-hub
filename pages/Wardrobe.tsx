import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Camera, X, Check, UploadCloud } from 'lucide-react';

// Using a simplified Category type to ensure it works without external files
const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];

const INITIAL_WARDROBE = [
  { id: '1', name: 'Cotton Boxy Tee', category: 'Tops', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', isPublic: true },
  { id: '2', name: 'Raw Denim Jeans', category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', isPublic: true },
  { id: '3', name: 'Wool Overcoat', category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500', isPublic: true },
  { id: '4', name: 'Leather Chelsea Boots', category: 'Shoes', imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500', isPublic: true },
  { id: '5', name: 'Linen Button Down', category: 'Tops', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87034a2612d?w=500', isPublic: true },
  { id: '6', name: 'Tailored Trousers', category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500', isPublic: true },
];

const Wardrobe: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = INITIAL_WARDROBE.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      // Simulate AI Background Removal delay
      setTimeout(() => {
        setIsUploading(false);
        alert("Image uploaded! In a full build, the background would now be removed via API.");
      }, 2000);
    }
  };

  return (
    <div className="bg-[#F5F5DC] min-h-screen">
      <div className="max-w-7xl mx-auto px-10 py-16">
        
        {/* Editorial Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-black/5 pb-12">
          <div>
            <h1 className="text-6xl editorial-font italic tracking-tighter mb-4">Digital Wardrobe</h1>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
              <span>Your Curated Collection</span>
              <div className="w-8 h-[1px] bg-black"></div>
              <span>{INITIAL_WARDROBE.length} PIECES TOTAL</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            <button 
              onClick={handleUploadClick}
              className="flex items-center gap-3 px-8 py-4 bg-white border border-black/10 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <Camera size={16} />
              {isUploading ? "Processing..." : "AI Digitize"}
            </button>
            <button className="p-4 bg-black text-white rounded-none hover:opacity-80 transition-all">
              <Plus size={20} />
            </button>
          </div>
        </header>

        {/* Categories & Search Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-8 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                  filter === cat ? 'bg-black text-white border-black' : 'bg-transparent text-black/40 border-transparent hover:border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20" size={16} />
            <input 
              type="text"
              placeholder="SEARCH PIECES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-black/10 text-[10px] font-bold tracking-widest uppercase outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        {/* Wardrobe Grid - Match Figma Clean Cards */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-white border border-black/5 relative mb-6">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest">{item.name}</h3>
                  <div className="flex justify-between items-center opacity-40">
                    <span className="text-[9px] uppercase tracking-tighter font-medium">{item.category}</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold">Public</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-40 text-center border border-dashed border-black/10">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">No items found in this collection</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wardrobe;