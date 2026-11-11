import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { CommitteeMember } from '../../types';
import { Shield, Mail, Phone, Award, Users } from 'lucide-react';

export const AdministrationPage: React.FC<{ onOpenAdminLogin?: () => void }> = ({ onOpenAdminLogin }) => {
  const { committee } = useWca();
  const [selectedCommittee, setSelectedCommittee] = useState<string>('All');

  const categories = [
    'All',
    'Executive Committee',
    'Selection Committee',
    'Tournament Committee',
    'Technical Committee'
  ];

  const filteredMembers = committee.filter(m => {
    if (selectedCommittee === 'All') return true;
    return m.committee === selectedCommittee;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-900/10 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-4 h-4 text-blue-800" />
            WCA Leadership & Governance Roster
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            ADMINISTRATION & MANAGEMENT COMMITTEE
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The governing council entrusted with cricket development, tournament sanctions, selection transparency, and organizational stewardship of the association.
          </p>

          {/* Committee Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCommittee(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCommittee === cat
                    ? 'bg-[#0B1E38] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Committee Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map(member => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Designation badge */}
                <div className="relative h-60 bg-slate-800 overflow-hidden">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow">
                      {member.designation}
                    </span>
                    <h3 className="text-lg font-bold mt-1 text-white leading-tight font-teko text-xl">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Details & Bio */}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
                    {member.committee}
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {member.biography}
                  </p>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                {member.contactEmail ? (
                  <a
                    href={`mailto:${member.contactEmail}`}
                    className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 font-semibold truncate pt-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{member.contactEmail}</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-400 italic pt-2 block">
                    Contact via Association Secretariat
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Administration Note */}
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-900">
          <div>
            <span className="font-bold uppercase tracking-wider block text-amber-950">
              Electoral & Governance Mandate
            </span>
            <p className="text-amber-800 mt-0.5">
              The committee members serve as elected honorary officers under the terms prescribed in the WCA Constitution. Committee designations and profiles can be edited via the authorized Administrator Dashboard.
            </p>
          </div>
          {onOpenAdminLogin && (
            <button
              onClick={onOpenAdminLogin}
              className="px-4 py-2 bg-[#0B1E38] text-white hover:bg-slate-800 rounded-xl font-bold uppercase tracking-wider text-[11px] shrink-0"
            >
              Staff Portal Access
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
