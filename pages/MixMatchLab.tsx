import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Maximize, Minimize, RefreshCw, Download, Save, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lab: React.FC = () => {
  const navigate = useNavigate();
  const boardRef = useRef<HTMLDivElement>(null);

  // SIDEBAR PIECES (These represent items you 'styled' or 'added' from other pages)
  const [inventory] = useState([
    { id: 1, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", category: "Outerwear" },
    { id: 2, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", category: "Bottoms" },
    { id: 3, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400", category: "Tops" },
    { id: 4, img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400", category: "Tops" },
  ]);

  const [canvasItems, setCanvasItems] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Add piece to board
  const addToBoard = (item: any) => {
    const newItem = {
      ...item,
      instanceId: Date.now(),
      x: 50,
      y: 50,
      scale: 1,
      rotate: 0
    };
    setCanvasItems([...canvasItems, newItem]);
  };

  // 2. Remove piece
  const removeFromBoard = (instanceId: number) => {
    setCanvasItems(canvasItems.filter(item => item.instanceId !== instanceId));
  };

  // 3. Resize Piece
  const updateScale = (instanceId: number, factor: number) => {
    setCanvasItems(canvasItems.map(item => 
      item.instanceId === instanceId ? { ...item, scale: Math.max(0.5, item.scale + factor) } : item
    ));
  };

  // 4. Download Function (Simulated high-res capture)
  const handleDownload = () => {
    alert("Synthesizing high-resolution render... Your look is being downloaded.");
    // In production, we'd use html2canvas here.
  };

  // 5. Save to Profile (Simulated)
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Outfit archived! You can now find this look in your Profile grid.");
      setCanvasItems([]); // Clear board after saving
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="h-screen bg-[#F5F5DC] flex overflow-hidden">
      
      {/* SIDEBAR - Your Collection */}
      <aside className="w-80 border-r border-black/5 bg-white flex flex-col">
        <div className="p-8 border-b border-black/5">
          <h2 className="editorial-font italic text-3xl">The Lab.</h2>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Select pieces to compose</p>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 grid grid-cols-2 gap-4">
          {inventory.map((item) => (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              key={item.id}
              onClick={() => addToBoard(item)}
              className="aspect-[3/4] bg-[#F5F5DC] border border-black/5 cursor-pointer overflow-hidden group relative"
            >
              <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Plus className="text-white" size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* MAIN STUDIO BOARD */}
      <main className="flex-1 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
        
        {/* Interaction Board */}
        <div ref={boardRef} className="absolute inset-0">
          {canvasItems.map((item) => (
            <motion.div
              key={item.instanceId}
              drag
              dragMomentum={false}
              className="absolute cursor-grab active:cursor-grabbing group"
              style={{ x: item.x, y: item.y, zIndex: item.instanceId }}
            >
              <div className="relative">
                <motion.img 
                  src={item.img} 
                  style={{ scale: item.scale }}
                  className="w-48 h-auto pointer-events-none drop-shadow-2xl"
                />
                
                {/* Individual Controls (Only visible on hover) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => updateScale(item.instanceId, 0.1)} className="text-white hover:text-green-400"><Maximize size={14}/></button>
                  <button onClick={() => updateScale(item.instanceId, -0.1)} className="text-white hover:text-yellow-400"><Minimize size={14}/></button>
                  <button onClick={() => removeFromBoard(item.instanceId)} className="text-white hover:text-red-400"><Trash2 size={14}/></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Hint */}
        {canvasItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-[12px] uppercase font-bold tracking-[0.5em] opacity-10">Composition Canvas</p>
          </div>
        )}

        {/* BOTTOM TOOLBAR */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white border border-black/10 px-8 py-4 flex items-center gap-12 shadow-2xl">
          <div className="flex flex-col items-center">
            <span className="text-[18px] font-bold tracking-tighter">{canvasItems.length}</span>
            <span className="text-[8px] uppercase font-bold opacity-30 tracking-widest">Pieces</span>
          </div>
          
          <div className="h-8 w-[1px] bg-black/10" />

          <div className="flex gap-6">
            <button 
              onClick={() => setCanvasItems([])}
              className="flex flex-col items-center gap-1 group"
            >
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500 opacity-40 group-hover:opacity-100" />
              <span className="text-[8px] uppercase font-bold tracking-widest">Clear</span>
            </button>

            <button 
              onClick={handleDownload}
              className="flex flex-col items-center gap-1 group"
            >
              <Download size={18} className="opacity-40 group-hover:opacity-100" />
              <span className="text-[8px] uppercase font-bold tracking-widest">Render</span>
            </button>

            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex flex-col items-center gap-1 group"
            >
              <Save size={18} className={`${isSaving ? 'animate-pulse' : 'opacity-100 text-black'}`} />
              <span className="text-[8px] uppercase font-bold tracking-widest">Archiv</span>
            </button>
          </div>
        </div>
      </main>

      {/* Global X close button */}
      <button 
        onClick={() => navigate('/feed')}
        className="absolute top-8 right-8 w-12 h-12 bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all z-50 shadow-sm"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default Lab;