import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { Award, UserCheck, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OfficialRegistrationPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { registerOfficial } = useWca();
  const [formData, setFormData] = useState({
    type: 'Umpire' as 'Umpire' | 'Scorer',
    fullName: '',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    contactNumber: '',
    email: '',
    experienceYears: 3,
    certification: 'District / State Level Accreditation',
    matchesOfficiated: 25
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = registerOfficial(formData);
    setSubmittedId(id);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-4 h-4 text-amber-600" />
            WCA Technical & Officials Roster
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-teko">
            UMPIRE & SCORER ACCREDITATION PORTAL
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Apply to officiate WCA district tournaments, invitational fixtures, and state-affiliated trials.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
          {submittedId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-teko">
                ACCREDITATION APPLICATION SUBMITTED!
              </h2>
              <p className="text-sm text-slate-600">
                Application Reference: <strong className="font-mono text-slate-900">{submittedId}</strong>.
                The Technical Committee convenor will verify your credentials and invite you for the seasonal orientation clinic.
              </p>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded-lg text-xs font-bold uppercase"
                >
                  Return to Home
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'Umpire' })}
                  className={`py-2.5 text-xs font-bold uppercase rounded-xl border transition-all ${
                    formData.type === 'Umpire'
                      ? 'bg-[#0B1E38] text-white border-transparent shadow'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Umpire Role
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'Scorer' })}
                  className={`py-2.5 text-xs font-bold uppercase rounded-xl border transition-all ${
                    formData.type === 'Scorer'
                      ? 'bg-[#0B1E38] text-white border-transparent shadow'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Scorer Role
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Official name"
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Officiating Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experienceYears}
                    onChange={e => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Approx. Matches Officiated
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.matchesOfficiated}
                    onChange={e => setFormData({ ...formData, matchesOfficiated: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Certifications & Qualifications *
                </label>
                <input
                  type="text"
                  required
                  value={formData.certification}
                  onChange={e => setFormData({ ...formData, certification: e.target.value })}
                  placeholder="e.g. State Panel B / BCCI Refresher / Local Exam"
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0B1E38] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                >
                  Submit Official Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
