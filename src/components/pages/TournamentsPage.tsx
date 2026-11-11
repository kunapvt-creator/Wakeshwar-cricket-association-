import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { Tournament, TournamentCategory } from '../../types';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  FileText,
  DollarSign,
  ChevronDown
} from 'lucide-react';

interface TournamentsPageProps {
  onSelectMatchCentre?: () => void;
  onOpenClubRegister?: () => void;
}

export const TournamentsPage: React.FC<TournamentsPageProps> = ({ 
  onSelectMatchCentre,
  onOpenClubRegister 
}) => {
  const { tournaments, clubs, matches } = useWca();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTournamentId, setExpandedTournamentId] = useState<string>(tournaments[0]?.id || '');

  const categories = [
    'All',
    'District-Level Tournaments',
    'Under-19',
    'Under-16',
    'Under-14',
    'Senior Category',
    'Open Category',
    "Women's Cricket"
  ];

  const filteredTournaments = tournaments.filter(t => {
    if (selectedCategory === 'All') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              WCA Official Sanctioned Competitions
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-teko uppercase tracking-wide">
              TOURNAMENTS, LEAGUES & POINTS TABLES
            </h1>
            <p className="text-xs text-slate-600">
              Official championship structures, group standings, playing conditions, and fixture schedules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onSelectMatchCentre && (
              <button
                onClick={onSelectMatchCentre}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
              >
                Live Scores →
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B1E38] text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tournaments List with Expandable details */}
        <div className="space-y-6">
          {filteredTournaments.map(trn => {
            const isExpanded = expandedTournamentId === trn.id;
            const trnMatches = matches.filter(m => m.tournamentId === trn.id);

            return (
              <div
                key={trn.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Header banner */}
                <div 
                  onClick={() => setExpandedTournamentId(isExpanded ? '' : trn.id)}
                  className="p-6 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#0B1E38] text-amber-400 flex items-center justify-center shrink-0 border-2 border-amber-400/40 shadow">
                      <Trophy className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded">
                          {trn.id}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                          {trn.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          Format: {trn.format}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          trn.status === 'Ongoing'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {trn.status}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-teko uppercase tracking-wide">
                        {trn.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {trn.venue} • {trn.startDate} to {trn.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs font-bold text-amber-600">
                      {isExpanded ? 'Hide Details' : 'View Points Table & Rules'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded Details: Overview, Rules, Points Table */}
                {isExpanded && (
                  <div className="p-6 bg-slate-50 space-y-6 animate-in slide-in-from-top-2">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
                      {trn.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-white p-4 rounded-xl border">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Registration Window</span>
                        <strong className="text-slate-800">{trn.registrationOpenDate} to {trn.registrationCloseDate}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Tournament Fee</span>
                        <strong className="text-amber-700">{trn.entryFee || 'Free of Charge'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Participating Clubs</span>
                        <strong className="text-slate-800">{trn.participatingClubs.length} Teams</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Scheduled Matches</span>
                        <strong className="text-blue-900">{trnMatches.length} Fixtures</strong>
                      </div>
                    </div>

                    {/* POINTS TABLE (if available) */}
                    {trn.pointsTable && trn.pointsTable.length > 0 && (
                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-[#0B1E38] text-white px-4 py-2.5 flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                            Tournament Standings & Points Table
                          </h4>
                          <span className="text-[10px] text-slate-300">
                            Top 2 advance to Final
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                              <tr>
                                <th className="py-2.5 px-3">Pos</th>
                                <th className="py-2.5 px-3">Team</th>
                                <th className="py-2.5 px-3 text-center">P</th>
                                <th className="py-2.5 px-3 text-center">W</th>
                                <th className="py-2.5 px-3 text-center">L</th>
                                <th className="py-2.5 px-3 text-center">T</th>
                                <th className="py-2.5 px-3 text-center">NR</th>
                                <th className="py-2.5 px-3 text-center font-bold text-slate-900">PTS</th>
                                <th className="py-2.5 px-3 text-right">NRR</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                              {trn.pointsTable.map((row, idx) => (
                                <tr key={row.clubId} className="hover:bg-slate-50">
                                  <td className="py-2.5 px-3 font-bold text-slate-400">{idx + 1}</td>
                                  <td className="py-2.5 px-3 font-bold text-slate-900">{row.clubName}</td>
                                  <td className="py-2.5 px-3 text-center text-slate-600">{row.played}</td>
                                  <td className="py-2.5 px-3 text-center text-emerald-700">{row.won}</td>
                                  <td className="py-2.5 px-3 text-center text-rose-700">{row.lost}</td>
                                  <td className="py-2.5 px-3 text-center text-slate-500">{row.tied}</td>
                                  <td className="py-2.5 px-3 text-center text-slate-500">{row.noResult}</td>
                                  <td className="py-2.5 px-3 text-center font-black text-amber-700 text-sm">{row.points}</td>
                                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                                    {row.nrr > 0 ? `+${row.nrr.toFixed(3)}` : row.nrr.toFixed(3)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Official Rules & Regulations */}
                    <div className="bg-white p-4 rounded-xl border space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-amber-600" />
                        Key Tournament By-Laws & Conditions
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {trn.rules.map((rule, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
