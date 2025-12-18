import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Maximize, 
  Minimize, 
  RefreshCw, 
  Download, 
  Save, 
  Plus, 
  X, 
  RotateCcw, 
  Layers 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_ITEMS = [
  { id: '1', name: 'White Tee', category: 'Tops', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: '2', name: 'Denim', category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
  { id: '3', name: 'Trench', category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
  { id: '4', name: 'Boots', category: 'Shoes', imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400' },
];

const Lab: React.FC = () => {
  const navigate = useNavigate();
  const constraintsRef = useRef(null);
  
  const [canvasItems, setCanvasItems] = useState<any[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Add piece to board
  const addToBoard = (item: any) => {
    const newItem = {
      ...item,
      instanceId: Date.now(),
      scale: 1,
      zIndex: nextZIndex
    };
    setCanvasItems([...canvasItems, newItem]);
    setNextZIndex(nextZIndex + 1);
  };

  // 2. Bring dragged item to front
  const bringToFront = (instanceId: number) => {
    setCanvasItems(prev => prev.map(item => 
      item.instanceId === instanceId ? { ...item, zIndex: nextZIndex } : item
    ));
    setNextZIndex(nextZIndex + 1);
  };

  // 3. Remove piece
  const removeFromBoard = (instanceId: number) => {
    setCanvasItems(canvasItems.filter(item => item.instanceId !== instanceId));
  };

  // 4. Update Scale
  const updateScale = (instanceId: number, factor: number) => {
    setCanvasItems(prev => prev.map(item => 
      item.instanceId === instanceId ? { ...item, scale: Math.max(0.5, item.scale + factor) } : item
    ));
  };

  const handleDownload = () => {
    alert("Synthesizing high-resolution render... Your look is being downloaded.");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Outfit archived! View it in your Profile.");
      setCanvasItems([]); 
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="h-screen bg-[#F5F5DC] flex overflow-hidden">
      
      {/* SIDEBAR - Inventory */}
      <aside className="w-80 border-r border-black/5 bg-white flex flex-col z-30 shadow-xl">
        <div className="p-8 border-b border-black/5">
          <h2 className="editorial-font italic text-3xl">The Lab.</h2>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Select pieces to compose</p>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 grid grid-cols-2 gap-4 no-scrollbar">
          {MOCK_ITEMS.map((item) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              key={item.id}
              onClick={() => addToBoard(item)}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-[#F5F5DC] border border-black/5 overflow-hidden relative mb-2 transition-all group-hover:border-black">
                <img src={item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={item.name} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Plus className="text-black" size={20} />
                </div>
              </div>
              <p className="text-[9px] uppercase font-bold tracking-widest">{item.name}</p>
              <p className="text-[8px] uppercase opacity-30">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* MAIN STUDIO BOARD */}
      <main className="flex-1 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/paper.png')] flex flex-col">
        
        {/* Interaction Canvas */}
        <div ref={constraintsRef} className="flex-1 relative w-full h-full p-20">
          <AnimatePresence>
            {canvasItems.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <h1 className="text-[10vw] editorial-font italic tracking-tighter">Creation</h1>
              </motion.div>
            )}

            {canvasItems.map((item) => (
              <motion.div
                key={item.instanceId}
                drag
                dragConstraints={constraintsRef}
                dragMomentum={false}
                onDragStart={() => bringToFront(item.instanceId)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: item.scale }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute cursor-grab active:cursor-grabbing group"
                style={{ zIndex: item.zIndex, left: '30%', top: '25%' }}
              >
                <div className="relative p-4 group-hover:outline group-hover:outline-1 group-hover:outline-black/20 transition-all">
                  <img 
                    src={item.imageUrl} 
                    className="w-64 h-auto pointer-events-none drop-shadow-2xl"
                    draggable="false"
                  />
                  
                  {/* Controls - Visible on Hover */}
                  <div className="absolute -right-10 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => updateScale(item.instanceId, 0.1)} className="w-8 h-8 bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"><Maximize size={12}/></button>
                    <button onClick={() => updateScale(item.instanceId, -0.1)} className="w-8 h-8 bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"><Minimize size={12}/></button>
                    <button onClick={() => removeFromBoard(item.instanceId)} className="w-8 h-8 bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform"><Trash2 size={12}/></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* BOTTOM TOOLBAR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white border border-black/10 px-10 py-5 flex items-center gap-12 shadow-2xl rounded-sm">
          <div className="flex flex-col items-center">
            <span className="text-[18px] font-bold tracking-tighter leading-none">{canvasItems.length}</span>
            <span className="text-[8px] uppercase font-bold opacity-30 tracking-widest mt-1">Items</span>
          </div>
          
          <div className="h-8 w-[1px] bg-black/10" />

          <div className="flex gap-8">
            <button onClick={() => setCanvasItems([])} className="flex flex-col items-center gap-1 group">
              <RotateCcw size={18} className="opacity-40 group-hover:opacity-100 transition-all group-active:rotate-180" />
              <span className="text-[8px] uppercase font-bold tracking-widest">Reset</span>
            </button>

            <button onClick={handleDownload} className="flex flex-col items-center gap-1 group">
              <Download size={18} className="opacity-40 group-hover:opacity-100 transition-all" />
              <span className="text-[8px] uppercase font-bold tracking-widest">Render</span>
            </button>

            <button onClick={handleSave} disabled={isSaving} className="flex flex-col items-center gap-1 group">
              <Save size={18} className={`${isSaving ? 'animate-pulse text-blue-500' : 'opacity-100 text-black'}`} />
              <span className="text-[8px] uppercase font-bold tracking-widest">Archive</span>
            </button>
          </div>
        </div>

        {/* Footer Detail */}
        <div className="absolute bottom-8 left-10 flex items-center gap-3 opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
          <Layers size={12} />
          <span>Layered Studio Mode</span>
        </div>
      </main>

      {/* Close Button */}
      <button 
        onClick={() => navigate('/feed')}
        className="absolute top-8 right-8 w-12 h-12 bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all z-50"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default Lab;