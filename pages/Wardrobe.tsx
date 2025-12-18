
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Camera } from 'lucide-react';
import { Category, WardrobeItem } from '../types';

const INITIAL_WARDROBE: WardrobeItem[] = [
  { id: '1', name: 'Cotton Boxy Tee', category: Category.TOPS, imageUrl: 'https://picsum.photos/seed/shirt1/400/500', isPublic: true },
  { id: '2', name: 'Raw Denim Jeans', category: Category.BOTTOMS, imageUrl: 'https://picsum.photos/seed/jeans1/400/500', isPublic: true },
  { id: '3', name: 'Wool Overcoat', category: Category.OUTERWEAR, imageUrl: 'https://picsum.photos/seed/coat1/400/500', isPublic: true },
  { id: '4', name: 'Leather Chelsea Boots', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes1/400/500', isPublic: true },
  { id: '5', name: 'Linen Button Down', category: Category.TOPS, imageUrl: 'https://picsum.photos/seed/shirt2/400/500', isPublic: true },
  { id: '6', name: 'Tailored Trousers', category: Category.BOTTOMS, imageUrl: 'https://picsum.photos/seed/pant1/400/500', isPublic: true },
  { id: '7', name: 'Cashmere Scarf', category: Category.ACCESSORIES, imageUrl: 'https://picsum.photos/seed/scarf1/400/500', isPublic: true },
  { id: '8', name: 'Canvas Tote Bag', category: Category.ACCESSORIES, imageUrl: 'https://picsum.photos/seed/bag1/400/500', isPublic: true },
];

const Wardrobe: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...Object.values(Category)];

  const filteredItems = INITIAL_WARDROBE.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h1 className="text-5xl editorial-font italic mb-4">My Digital Wardrobe</h1>
          <p className="text-neutral-500 font-light">A curated collection of your favorite pieces.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-black/10 rounded-full hover:border-black transition-all">
            <Camera size={18} />
            <span>AI Digitize</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-full hover:bg-neutral-800 transition-all">
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white p-4 rounded-2xl border border-black/5">
        <div className="flex items-center overflow-x-auto space-x-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                filter === cat ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text"
            placeholder="Search your pieces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-black/20"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 mb-4 border border-black/5 relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#F5F5DC] text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Edit Details</span>
                </div>
              </div>
              <h3 className="text-sm font-medium tracking-tight mb-1">{item.name}</h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">{item.category}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-xl italic text-neutral-400">No items found matching your filter.</p>
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
