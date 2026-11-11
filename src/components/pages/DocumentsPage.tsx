import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { OfficialDocument } from '../../types';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  ShieldCheck, 
  Search, 
  X,
  FileCheck2,
  HardDrive
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { documents } = useWca();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<OfficialDocument | null>(null);

  const categories = [
    'All',
    'Constitution',
    'Rules & Regulations',
    'Tournament Guidelines',
    'Forms',
    'Circulars'
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            WCA Repository & Downloads Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            OFFICIAL DOCUMENTS, CHARTERS & FORMS
          </h1>
          <p className="text-sm text-slate-600">
            Download ratified association constitutions, tournament guideline handbooks, code of conduct, and affiliation forms.
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

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search documents by title or ref number..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Documents Table / List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-700 rounded-xl shrink-0 mt-0.5">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded">
                        {doc.documentNumber}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {doc.fileSize}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {doc.description}
                    </p>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      Issued: {doc.issueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                  <button
                    onClick={() => alert(`Downloading official document: ${doc.fileName}`)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0B1E38] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-bold transition-all shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOCUMENT PREVIEW MODAL */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-[#0B1E38] text-white p-5 flex items-center justify-between border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                    {previewDoc.documentNumber}
                  </span>
                  <h4 className="text-base font-bold font-teko uppercase text-xl">
                    DOCUMENT INSPECTION
                  </h4>
                </div>
                <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {previewDoc.title}
                </h3>
                <div className="p-4 bg-slate-50 border rounded-xl space-y-2 text-xs text-slate-600">
                  <p><strong>Category:</strong> {previewDoc.category}</p>
                  <p><strong>File Name:</strong> {previewDoc.fileName}</p>
                  <p><strong>Official Release Date:</strong> {previewDoc.issueDate}</p>
                  <p><strong>Summary:</strong> {previewDoc.description}</p>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Officially certified and authenticated by WCA Secretariat.</span>
                </div>
              </div>

              <div className="p-4 bg-slate-100 border-t flex justify-end gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading ${previewDoc.fileName}`);
                    setPreviewDoc(null);
                  }}
                  className="px-5 py-2 bg-[#0B1E38] text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save PDF File
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
