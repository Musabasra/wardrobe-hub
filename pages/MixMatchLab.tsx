import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Save, RotateCcw, Plus, MousePointer2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Since we are restoring the original, I'm using the structure you provided
const MOCK_ITEMS = [
  { id: '1', name: 'White Tee', imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400', category: 'TOPS' },
  { id: '2', name: 'Denim', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'BOTTOMS' },
  { id: '3', name: 'Trench', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', category: 'OUTERWEAR' },
  { id: '4', name: 'Boots', imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'SHOES' },
];

const MixMatchLab: React.FC = () => {
  const navigate = useNavigate();
  const [canvasItems, setCanvasItems] = useState<{ id: string, item: any, x: number, y: number }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const constraintsRef = useRef(null);

  const addToCanvas = (item: any) => {
    setCanvasItems([...canvasItems, { 
      id: Math.random().toString(36).substr(2, 9),
      item,
      x: 0,
      y: 0
    }]);
  };

  const clearCanvas = () => setCanvasItems([]);

  const handleExport = () => {
    alert("GENERATING HIGH-RES EXPORT...");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("OUTFIT SAVED TO PROFILE GRID");
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex overflow-hidden bg-white">
      {/* Sidebar - Item Selector (Restored to original style) */}
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
              <div className="aspect-square rounded-lg bg-neutral-100 overflow-hidden mb-2 border border-transparent group-hover:border-black/10 transition-all">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{item.name}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Workspace Canvas (Restored to #fcfcf0 theme) */}
      <main className="flex-1 relative bg-[#fcfcf0] canvas-bg overflow-hidden flex flex-col">
        {/* Canvas Toolbar (Restored to floating white pills) */}
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
             <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-6 py-2.5 bg-white text-black border border-black/10 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center space-x-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all shadow-xl ${isSaving ? 'opacity-50' : ''}`}
            >
              <Save size={16} />
              <span>{isSaving ? 'Archiving...' : 'Save Outfit'}</span>
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
              className="absolute w-64 h-64 cursor-move active:scale-105 transition-transform duration-200"
              style={{ left: '35%', top: '25%' }}
            >
              <div className="relative group">
                <img 
                  src={ci.item.imageUrl} 
                  alt={ci.item.name} 
                  className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]" 
                />
                <button 
                   onClick={(e) => {
                     e.stopPropagation(); // Prevents drag when clicking X
                     setCanvasItems(canvasItems.filter(i => i.id !== ci.id));
                   }}
                   className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-black text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50"
                >
                   <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info (Restored original style) */}
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