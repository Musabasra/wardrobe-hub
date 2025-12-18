import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Save, RotateCcw, Plus, MousePointer2, Maximize2, Layers } from 'lucide-react';

const MOCK_ITEMS = [
  { id: '1', name: 'White Tee', category: 'Tops', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: '2', name: 'Denim', category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
  { id: '3', name: 'Trench', category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
  { id: '4', name: 'Boots', category: 'Shoes', imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400' },
  { id: '5', name: 'Knitwear', category: 'Tops', imageUrl: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400' },
];

const MixMatchLab: React.FC = () => {
  const [canvasItems, setCanvasItems] = useState<{ id: string, item: any, scale: number, zIndex: number }[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const constraintsRef = useRef(null);

  const addToCanvas = (item: any) => {
    const newItem = { 
      id: Math.random().toString(36).substr(2, 9),
      item,
      scale: 1,
      zIndex: nextZIndex
    };
    setCanvasItems([...canvasItems, newItem]);
    setNextZIndex(nextZIndex + 1);
  };

  const bringToFront = (id: string) => {
    setCanvasItems(prev => prev.map(item => 
      item.id === id ? { ...item, zIndex: nextZIndex } : item
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const updateScale = (id: string, delta: number) => {
    setCanvasItems(prev => prev.map(item => 
      item.id === id ? { ...item, scale: Math.max(0.5, item.scale + delta) } : item
    ));
  };

  return (
    <div className="h-[calc(100vh-80px)] flex overflow-hidden bg-[#F5F5DC]">
      {/* Sidebar - Inventory */}
      <aside className="w-80 bg-white border-r border-black/5 flex flex-col z-30 shadow-2xl shadow-black/5">
        <div className="p-8 border-b border-black/5">
          <h2 className="text-2xl editorial-font italic mb-1">Studio Closet</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Select pieces to style</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4 no-scrollbar">
          {MOCK_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCanvas(item)}
              className="group text-left mb-4"
            >
              <div className="aspect-[3/4] bg-neutral-50 overflow-hidden mb-3 border border-transparent group-hover:border-black transition-all duration-500 relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5">
                    <Plus size={20} className="text-black" />
                </div>
              </div>
              <p className="text-[9px] uppercase font-bold tracking-widest leading-none">{item.name}</p>
              <p className="text-[8px] uppercase tracking-tighter opacity-30">{item.category}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Workspace Canvas */}
      <main className="flex-1 relative bg-[#F5F5DC] canvas-bg overflow-hidden flex flex-col">
        {/* Top Toolbar */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-black/5 shadow-2xl">
            <button 
              onClick={() => setCanvasItems([])}
              className="p-2 hover:bg-black hover:text-white rounded-full transition-all"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
            <div className="w-[1px] h-4 bg-black/10 mx-2" />
            <button className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all">
              <Save size={14} />
              <span>Save Outfit</span>
            </button>
            <button className="p-2 hover:bg-black hover:text-white rounded-full transition-all border border-black/10 ml-2">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* The Studio Canvas Area */}
        <div ref={constraintsRef} className="flex-1 w-full h-full relative p-20">
          {canvasItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center flex-col opacity-10 pointer-events-none">
              <h1 className="text-[12vw] editorial-font italic tracking-tighter">Creation Lab</h1>
            </div>
          )}

          <AnimatePresence>
            {canvasItems.map((ci) => (
              <motion.div
                key={ci.id}
                drag
                dragConstraints={constraintsRef}
                dragMomentum={false}
                onDragStart={() => bringToFront(ci.id)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: ci.scale }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute cursor-move active:cursor-grabbing group"
                style={{ zIndex: ci.zIndex, left: '30%', top: '25%' }}
              >
                <div className="relative p-4 group-hover:outline group-hover:outline-1 group-hover:outline-black/20">
                  <img 
                    src={ci.item.imageUrl} 
                    alt={ci.item.name} 
                    className="w-64 h-64 object-contain drop-shadow-2xl select-none" 
                    draggable="false"
                  />
                  
                  {/* Item Controls - Appear on Hover */}
                  <div className="absolute -right-10 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                       onClick={() => updateScale(ci.id, 0.1)}
                       className="w-8 h-8 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                    >
                      <Plus size={12} />
                    </button>
                    <button 
                       onClick={() => updateScale(ci.id, -0.1)}
                       className="w-8 h-8 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                    >
                      <span className="text-lg leading-none">-</span>
                    </button>
                    <button 
                       onClick={() => setCanvasItems(canvasItems.filter(i => i.id !== ci.id))}
                       className="w-8 h-8 bg-white border border-black text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Canvas Footer */}
        <div className="absolute bottom-8 left-10 flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">
           <div className="flex items-center gap-2">
              <Layers size={12} />
              <span>Layered Studio</span>
           </div>
           <span>|</span>
           <span>Pieces: {canvasItems.length}</span>
        </div>
      </main>
    </div>
  );
};

// Simplified X icon for the item control
const X = ({size, className}: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default MixMatchLab;