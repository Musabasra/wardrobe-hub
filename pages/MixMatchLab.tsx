
import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Download, Save, RotateCcw, Plus, MousePointer2 } from 'lucide-react';
import { Category, WardrobeItem } from '../types';

const MOCK_ITEMS: WardrobeItem[] = [
  { id: '1', name: 'White Tee', category: Category.TOPS, imageUrl: 'https://picsum.photos/seed/shirt1/200/200', isPublic: true },
  { id: '2', name: 'Denim', category: Category.BOTTOMS, imageUrl: 'https://picsum.photos/seed/jeans1/200/200', isPublic: true },
  { id: '3', name: 'Trench', category: Category.OUTERWEAR, imageUrl: 'https://picsum.photos/seed/coat1/200/200', isPublic: true },
  { id: '4', name: 'Boots', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes1/200/200', isPublic: true },
];

const MixMatchLab: React.FC = () => {
  const [canvasItems, setCanvasItems] = useState<{ id: string, item: WardrobeItem, x: number, y: number }[]>([]);
  const constraintsRef = useRef(null);

  const addToCanvas = (item: WardrobeItem) => {
    setCanvasItems([...canvasItems, { 
      id: Math.random().toString(36).substr(2, 9),
      item,
      x: 0,
      y: 0
    }]);
  };

  const clearCanvas = () => setCanvasItems([]);

  return (
    <div className="h-[calc(100vh-80px)] flex overflow-hidden">
      {/* Sidebar - Item Selector */}
      <aside className="w-80 bg-white border-r border-black/5 flex flex-col">
        <div className="p-6 border-b border-black/5">
          <h2 className="text-xl editorial-font italic mb-2">My Wardrobe</h2>
          <p className="text-xs text-neutral-400 font-light">Tap to add items to your workspace</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4">
          {MOCK_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCanvas(item)}
              className="group text-left"
            >
              <div className="aspect-square rounded-lg bg-neutral-100 overflow-hidden mb-2 border border-black/0 group-hover:border-black/10 transition-all">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{item.name}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Workspace Canvas */}
      <main className="flex-1 relative bg-[#fcfcf0] canvas-bg overflow-hidden flex flex-col">
        {/* Canvas Toolbar */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm">
            <button onClick={clearCanvas} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500" title="Reset Canvas">
              <RotateCcw size={18} />
            </button>
            <div className="w-[1px] h-4 bg-black/10 mx-1" />
            <button className="p-2 bg-black text-white rounded-full shadow-lg" title="Select Tool">
              <MousePointer2 size={18} />
            </button>
          </div>

          <div className="flex items-center space-x-3">
             <button className="flex items-center space-x-2 px-6 py-2.5 bg-white text-black border border-black/10 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all shadow-xl">
              <Save size={16} />
              <span>Save Outfit</span>
            </button>
          </div>
        </div>

        {/* The Drag Area */}
        <div ref={constraintsRef} className="flex-1 w-full h-full relative cursor-crosshair">
          {canvasItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center flex-col text-neutral-300 pointer-events-none">
              <Plus size={48} strokeWidth={1} className="mb-4" />
              <p className="editorial-font italic text-2xl">Start your creation</p>
            </div>
          )}

          {canvasItems.map((ci) => (
            <motion.div
              key={ci.id}
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              className="absolute w-48 h-48 cursor-move active:scale-110 transition-transform duration-200"
              style={{ left: '40%', top: '35%' }}
            >
              <div className="relative group">
                <img 
                  src={ci.item.imageUrl} 
                  alt={ci.item.name} 
                  className="w-full h-full object-contain drop-shadow-2xl" 
                />
                <button 
                   onClick={() => setCanvasItems(canvasItems.filter(i => i.id !== ci.id))}
                   className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-black text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <span className="text-lg leading-none">&times;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 flex items-center justify-center space-x-8">
            <span>Pieces: {canvasItems.length}</span>
            <span>Ratio: 4:5 (Standard Fit Pic)</span>
            <span>Canvas: Layered PNGs</span>
        </div>
      </main>
    </div>
  );
};

export default MixMatchLab;
