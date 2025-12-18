import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Maximize2, Minimize2, RefreshCw, Download, Save, Plus, X, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lab: React.FC = () => {
  const navigate = useNavigate();
  const [canvasItems, setCanvasItems] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // SIDEBAR DATA
  const inventory = [
    { id: 1, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", name: "ARCHIVE COAT" },
    { id: 2, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", name: "SELVEDGE DENIM" },
    { id: 3, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400", name: "CASHMERE KNIT" },
    { id: 4, img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400", name: "BOX TEE" },
  ];

  const addToBoard = (item: any) => {
    setCanvasItems([...canvasItems, { ...item, instanceId: Date.now(), scale: 1 }]);
  };

  const handleDownload = () => {
    alert("GENERATING HIGH-RES EXPORT...");
    // Logic for browser download would go here
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
    <div className="h-screen bg-black text-white flex overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR - RESTORED ORIGINAL STYLE */}
      <aside className="w-24 border-r border-white/10 flex flex-col items-center py-8 gap-8 bg-[#0a0a0a]">
        <div className="p-2 border border-white/20 rounded-full">
          <Scissors size={20} className="text-white" />
        </div>
        <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center gap-4 px-2">
          {inventory.map((item) => (
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={item.id}
              onClick={() => addToBoard(item)}
              className="w-16 h-16 bg-neutral-900 border border-white/5 cursor-pointer overflow-hidden rounded-sm group relative"
            >
              <img src={item.img} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <Plus size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* CANVAS AREA */}
      <main className="flex-1 relative bg-[#0f0f0f] overflow-hidden">
        {/* GRID OVERLAY */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />

        {canvasItems.map((item) => (
          <motion.div
            key={item.instanceId}
            drag
            dragMomentum={false}
            className="absolute cursor-grab active:cursor-grabbing group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="relative p-4 border border-transparent hover:border-white/10 transition-colors">
              <motion.img 
                src={item.img} 
                style={{ scale: item.scale }}
                className="w-64 h-auto pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
              
              {/* MINI CONTROLS - RESTORED */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white text-black p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setCanvasItems(canvasItems.map(i => i.instanceId === item.instanceId ? {...i, scale: i.scale + 0.1} : i))} className="p-1 hover:bg-neutral-200"><Maximize2 size={12}/></button>
                <button onClick={() => setCanvasItems(canvasItems.map(i => i.instanceId === item.instanceId ? {...i, scale: i.scale - 0.1} : i))} className="p-1 hover:bg-neutral-200"><Minimize2 size={12}/></button>
                <button onClick={() => setCanvasItems(canvasItems.filter(i => i.instanceId !== item.instanceId))} className="p-1 hover:bg-red-100 text-red-500"><Trash2 size={12}/></button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* BOTTOM NAV BAR - RESTORED ORIGINAL COMPACT STYLE */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 flex items-center gap-10 shadow-2xl">
          <div className="flex flex-col items-center">
            <span className="text-xl font-medium tracking-tighter leading-none">{canvasItems.length}</span>
            <span className="text-[8px] uppercase tracking-[0.2em] opacity-40">Objects</span>
          </div>
          
          <div className="w-[1px] h-6 bg-white/10" />

          <div className="flex items-center gap-8">
            <button onClick={
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

() => setCanvasItems([])} className="flex flex-col items-center gap-1 group">
              <RefreshCw size={18} className="opacity-40 group-hover:opacity-100 transition-all group-active:rotate-180" />
              <span className="text-[7px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Reset</span>
            </button>

            <button onClick={handleDownload} className="flex flex-col items-center gap-1 group">
              <Download size={18} className="opacity-40 group-hover:opacity-100 transition-all" />
              <span className="text-[7px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Export</span>
            </button>

            <button onClick={handleSave} disabled={isSaving} className="flex flex-col items-center gap-1 group">
              <Save size={18} className={`${isSaving ? 'text-blue-400' : 'text-white'} group-hover:scale-110 transition-all`} />
              <span className="text-[7px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Archive</span>
            </button>
          </div>
        </div>
      </main>

      {/* TOP EXIT BUTTON */}
      <button 
        onClick={() => navigate('/feed')}
        className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

    </div>
  );
};

export default Lab;