import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { ShieldCheck, Building2, User, Phone, Mail, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClubRegistrationPageProps {
  onSuccessRedirect?: () => void;
}

export const ClubRegistrationPage: React.FC<ClubRegistrationPageProps> = ({ onSuccessRedirect }) => {
  const { registerClub } = useWca();
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
    address: '',
    city: 'Wakeshwar',
    district: 'Wakeshwar District',
    ownerName: '',
    teamManager: '',
    captainName: '',
    coachName: '',
    contactNumber: '',
    email: '',
    homeGround: 'WCA Secondary Ground'
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = registerClub(formData);
    setSubmittedId(res.id);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-900/10 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4 text-blue-800" />
            WCA Official Club & Team Affiliation Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-teko">
            REGISTER CRICKET CLUB & TEAMS
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Affiliate your cricket club or academy with Wakeshwar Cricket Association to enter sanctioned tournaments and field registered squads.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {submittedId ? (
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                  ASSIGNED CLUB ID: {submittedId}
                </span>
                <h2 className="text-2xl font-black text-slate-900 uppercase font-teko mt-2">
                  CLUB AFFILIATION APPLICATION RECORDED
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your club details for <strong>{formData.name}</strong> are submitted to the WCA Executive Committee. You will receive an official notification upon ground & roster inspection.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    setFormData({
                      name: '',
                      logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
                      address: '',
                      city: 'Wakeshwar',
                      district: 'Wakeshwar District',
                      ownerName: '',
                      teamManager: '',
                      captainName: '',
                      coachName: '',
                      contactNumber: '',
                      email: '',
                      homeGround: 'WCA Secondary Ground'
                    });
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  Register Another Club
                </button>
                {onSuccessRedirect && (
                  <button
                    onClick={onSuccessRedirect}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    View Affiliated Clubs
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-500" />
                  Club Profile & Identity
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Official Club / Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Wakeshwar Tigers Cricket Club"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Club Emblem / Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Home Ground / Practice Facility *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.homeGround}
                    onChange={e => setFormData({ ...formData, homeGround: e.target.value })}
                    placeholder="e.g. Shivaji Sports Enclave"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Official Club Office Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Building, Street, Landmark"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    City / Taluka *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-amber-500" />
                  Management & Coaching Staff
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Club Owner / President *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                      placeholder="e.g. Ramesh S. Kulkarni"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Team Manager *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.teamManager}
                      onChange={e => setFormData({ ...formData, teamManager: e.target.value })}
                      placeholder="e.g. Anand Deshmukh"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Team Captain Name
                    </label>
                    <input
                      type="text"
                      value={formData.captainName}
                      onChange={e => setFormData({ ...formData, captainName: e.target.value })}
                      placeholder="e.g. Rohit Patil"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Head Coach & Certification
                    </label>
                    <input
                      type="text"
                      value={formData.coachName}
                      onChange={e => setFormData({ ...formData, coachName: e.target.value })}
                      placeholder="e.g. Santosh Gaikwad (BCCI Level 1)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Official Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                      placeholder="+91 98220 00000"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Official Club Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="manager@club.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#0B1E38] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  Submit Club Registration
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
