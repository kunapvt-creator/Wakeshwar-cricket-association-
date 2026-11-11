import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { NewsArticle } from '../../types';
import { 
  Calendar, 
  FileText, 
  Share2, 
  Download, 
  X, 
  Check, 
  Search, 
  ArrowRight,
  Pin
} from 'lucide-react';

export const NewsPage: React.FC<{ initialArticleId?: string }> = ({ initialArticleId }) => {
  const { news } = useWca();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (initialArticleId) {
      const art = news.find(n => n.id === initialArticleId);
      if (art) setActiveArticle(art);
    }
  }, [initialArticleId, news]);

  const categories = [
    'All',
    'Association News',
    'Tournament Announcements',
    'Player Selection',
    'Trial Notifications',
    'Important Circulars'
  ];

  const filteredNews = news.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (art: NewsArticle) => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-900/10 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4 text-blue-800" />
            Official WCA Press & Secretariat Bulletins
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            NEWS, CIRCULARS & OFFICIAL NOTICES
          </h1>
          <p className="text-sm text-slate-600">
            Timely notifications regarding selection trials, tournament fixtures, rulebook amendments, and administrative decisions.
          </p>

          {/* Categories */}
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

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search news, circular keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveArticle(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B1E38] text-white px-2.5 py-0.5 rounded shadow">
                      {item.category}
                    </span>
                    {item.isPinned && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Pin className="w-2.5 h-2.5" /> Pinned
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {item.publishedDate}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="font-bold text-amber-600 group-hover:underline">
                  Read Full Notice →
                </span>
                {item.attachmentName && (
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                    <Download className="w-3 h-3" /> PDF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FULL ARTICLE MODAL */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in zoom-in-95">
              <div className="bg-[#0B1E38] text-white p-5 flex items-center justify-between border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-300">
                    {activeArticle.publishedDate}
                  </span>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                <h2 className="text-2xl font-black text-slate-900 font-teko text-3xl leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="rounded-xl overflow-hidden border">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    className="w-full h-56 object-cover"
                  />
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeArticle.content}
                </div>

                {/* PDF Attachment simulation */}
                {activeArticle.attachmentName && (
                  <div className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">
                          {activeArticle.attachmentName}
                        </h4>
                        <p className="text-[10px] text-slate-500">Official WCA Signed Document (PDF)</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading circular ${activeArticle.attachmentName}`)}
                      className="px-3.5 py-1.5 bg-[#0B1E38] text-amber-400 text-xs font-bold rounded-lg flex items-center gap-1.5 hover:bg-slate-800"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t flex items-center justify-between">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Link Copied!' : 'Share Article'}
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 bg-slate-800 text-white font-bold text-xs uppercase rounded-lg"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
