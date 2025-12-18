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
            <button onClick={() => setCanvasItems([])} className="flex flex-col items-center gap-1 group">
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