import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Plus, ShoppingBag, Heart, X, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wardrobe: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
  
  // Simulated Public Data
  const publicItems = [
    { id: 1, name: "Vintage Oversized Coat", brand: "Archive", category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500", uploader: "@style_curator" },
    { id: 2, name: "Raw Denim Selvedge", brand: "Durable", category: "Bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500", uploader: "@denim_head" },
    { id: 3, name: "Cashmere Turtleneck", brand: "Softness", category: "Tops", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500", uploader: "@minimalist" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5DC] pt-12 pb-20 px-8">
      {/* Page Title & Search */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h1 className="text-6xl editorial-font italic tracking-tighter mb-4">Global Archive.</h1>
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">Explore every piece in the community wardrobe</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-20" size={16} />
            <input type="text" placeholder="SEARCH PIECES..." className="w-full bg-white border border-black/5 py-3 pl-10 pr-4 text-[9px] font-bold uppercase tracking-widest outline-none" />
          </div>
          <button className="bg-black text-white p-3 hover:bg-neutral-800 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto flex gap-8 mb-12 overflow-x-auto pb-4 border-b border-black/5">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${filter === cat ? 'opacity-100 border-b border-black' : 'opacity-30 hover:opacity-60'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {publicItems.map((item) => (
          <motion.div 
            layoutId={`item-${item.id}`}
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] bg-white border border-black/5 overflow-hidden mb-4 relative">
              <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1">{item.name}</h3>
            <p className="text-[9px] opacity-40 uppercase font-bold">{item.brand}</p>
          </motion.div>
        ))}
      </div>

      {/* --- ITEM DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div layoutId={`item-${selectedItem.id}`} className="relative bg-white w-full max-w-4xl h-[70vh] flex shadow-2xl overflow-hidden">
              <div className="flex-1 bg-neutral-50 overflow-hidden flex items-center justify-center">
                <img src={selectedItem.image} className="w-full h-full object-cover" />
              </div>
              <div className="w-96 p-12 flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{selectedItem.brand}</p>
                    <h2 className="text-3xl editorial-font italic leading-none">{selectedItem.name}</h2>
                  </div>
                  <button onClick={() => setSelectedItem(null)}><X size={20}/></button>
                </div>
                
                <div className="space-y-8 flex-grow">
                   <div className="flex items-center justify-between py-4 border-y border-black/5">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Uploader</span>
                      <span onClick={() => navigate('/profile')} className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:underline">{selectedItem.uploader}</span>
                   </div>
                   <p className="text-sm font-light italic opacity-60">This piece is a staple in a modern capsule wardrobe. Features high-quality finishing and a timeless fit.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90">
                    <ShoppingBag size={14}/> Save to Mine
                  </button>
                  <button onClick={() => navigate('/lab')} className="py-4 border border-black text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all">
                    <Scissors size={14}/> Style
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wardrobe;