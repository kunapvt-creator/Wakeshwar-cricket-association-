import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { GalleryItem } from '../../types';
import { Image, Calendar, X, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery } = useWca();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Cricket Matches',
    'Tournament Events',
    'Trophy Ceremonies',
    'Award Functions',
    'Cricket Camps',
    'Association Meetings'
  ];

  const filteredGallery = gallery.filter(g => {
    if (selectedCategory === 'All') return true;
    return g.category === selectedCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Image className="w-4 h-4 text-amber-600" />
            WCA Official Media Archives
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            PHOTOGRAPHY & EVENT HIGHLIGHTS
          </h1>
          <p className="text-sm text-slate-600">
            Documenting historic tournament moments, match victories, felicitation galas, and youth development clinics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B1E38] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-white/80 group-hover:text-amber-400 transition-colors">
                  <ZoomIn className="w-5 h-5" />
                </div>
                <div className="absolute bottom-3 left-3 right-10 text-white">
                  <span className="text-[10px] text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {item.date}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5 font-teko text-xl leading-tight truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 text-xs text-slate-600 line-clamp-2">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {lightboxItem && (
          <div 
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div 
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 text-white"
            >
              <div className="relative bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {lightboxItem.category} • {lightboxItem.date}
                  </span>
                  <h3 className="text-xl font-bold font-teko text-2xl text-white mt-1">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {lightboxItem.description}
                  </p>
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shrink-0"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
