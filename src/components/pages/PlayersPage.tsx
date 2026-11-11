import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { Player, PlayerRole } from '../../types';
import { DigitalIdCard } from '../common/DigitalIdCard';
import { 
  Search, 
  Filter, 
  Award, 
  ShieldCheck, 
  User, 
  MapPin, 
  X, 
  ExternalLink, 
  TrendingUp,
  Download,
  CheckCircle2
} from 'lucide-react';

interface PlayersPageProps {
  selectedPlayerId?: string;
  onClearSelectedPlayer?: () => void;
  onOpenRegister?: () => void;
}

export const PlayersPage: React.FC<PlayersPageProps> = ({ 
  selectedPlayerId,
  onClearSelectedPlayer,
  onOpenRegister 
}) => {
  const { players, clubs } = useWca();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [clubFilter, setClubFilter] = useState<string>('All');
  const [activeModalPlayer, setActiveModalPlayer] = useState<Player | null>(null);
  const [showIdCardModal, setShowIdCardModal] = useState<boolean>(false);

  // If passed an initial playerId, open that modal
  React.useEffect(() => {
    if (selectedPlayerId) {
      const p = players.find(x => x.id === selectedPlayerId);
      if (p) setActiveModalPlayer(p);
    }
  }, [selectedPlayerId, players]);

  const filteredPlayers = players.filter(p => {
    // Only show approved or under review in public roster (or pending with note)
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'All' || p.playingRole === roleFilter;
    const matchesClub = clubFilter === 'All' || p.currentClubId === clubFilter || p.currentClubName === clubFilter;

    return matchesSearch && matchesRole && matchesClub;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Central Cricketers Registry
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-teko uppercase tracking-wide">
              REGISTERED PLAYERS & CAREER STATISTICS
            </h1>
            <p className="text-xs text-slate-600">
              Verified cricket talent directory with official match performance records and digital licensing.
            </p>
          </div>

          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0"
            >
              Enroll as Player
            </button>
          )}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search box */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by player name, WCA ID, or village..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <div className="sm:col-span-3">
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Playing Roles</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicketkeeper">Wicketkeeper</option>
            </select>
          </div>

          {/* Club Filter */}
          <div className="sm:col-span-4">
            <select
              value={clubFilter}
              onChange={e => setClubFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Affiliated Clubs</option>
              {clubs.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map(p => (
            <div
              key={p.id}
              onClick={() => setActiveModalPlayer(p)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Photo & Role Tag */}
                <div className="relative h-56 bg-slate-800 overflow-hidden">
                  <img
                    src={p.photoUrl}
                    alt={p.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-mono font-bold bg-slate-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                      {p.id}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900 text-white px-2 py-0.5 rounded shadow">
                      {p.playingRole}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 leading-tight font-teko text-xl">
                      {p.fullName}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="text-xs text-slate-600">
                    <p className="truncate font-semibold text-slate-800">
                      Club: {p.currentClubName || p.previousClub || 'Unassigned'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {p.battingStyle} • {p.bowlingStyle}
                    </p>
                  </div>

                  {/* Career Stats Mini Bar */}
                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 text-center text-xs">
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-[9px] text-slate-400 block uppercase">Runs</span>
                      <strong className="text-amber-700 font-bold">{p.stats.runs}</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-[9px] text-slate-400 block uppercase">Avg</span>
                      <strong className="text-slate-800 font-bold">{p.stats.battingAverage}</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-[9px] text-slate-400 block uppercase">Wkts</span>
                      <strong className="text-blue-900 font-bold">{p.stats.wickets}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer button */}
              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-amber-600 font-bold group-hover:underline">
                  View Full Career Profile →
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  p.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-base font-bold text-slate-700">No players match the chosen filter.</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search term or select "All Playing Roles".</p>
          </div>
        )}

        {/* INDIVIDUAL PLAYER PROFILE MODAL */}
        {activeModalPlayer && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in zoom-in-95">
              {/* Modal Top Header */}
              <div className="bg-[#0B1E38] text-white p-5 flex items-center justify-between border-b border-amber-500/30">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold">
                    {activeModalPlayer.id}
                  </span>
                  <h3 className="text-xl font-black font-teko uppercase text-amber-400 text-2xl tracking-wide">
                    OFFICIAL PLAYER CAREER DOSSIER
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setActiveModalPlayer(null);
                    if (onClearSelectedPlayer) onClearSelectedPlayer();
                  }}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Hero profile snapshot */}
                <div className="flex flex-col sm:flex-row gap-5 items-start bg-slate-50 p-5 rounded-2xl border">
                  <img
                    src={activeModalPlayer.photoUrl}
                    alt={activeModalPlayer.fullName}
                    className="w-28 h-32 rounded-xl object-cover border-2 border-amber-400 shadow-md shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-2xl font-black text-slate-900 font-teko text-3xl">
                        {activeModalPlayer.fullName}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {activeModalPlayer.status}
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 font-bold uppercase">
                      {activeModalPlayer.playingRole} • {activeModalPlayer.battingStyle} • {activeModalPlayer.bowlingStyle}
                    </p>
                    <p className="text-xs text-slate-600">
                      Affiliated Club: <strong className="text-slate-900">{activeModalPlayer.currentClubName || activeModalPlayer.previousClub || 'WCA Squad'}</strong>
                    </p>
                    <p className="text-xs text-slate-500">
                      DOB: {activeModalPlayer.dateOfBirth} | District: {activeModalPlayer.district} ({activeModalPlayer.village})
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => setShowIdCardModal(true)}
                        className="px-3.5 py-1.5 bg-[#0B1E38] hover:bg-slate-800 text-amber-400 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        View Digital ID Card
                      </button>
                      <a
                        href={`/#verify/${activeModalPlayer.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Public Verification Link
                      </a>
                    </div>
                  </div>
                </div>

                {/* BATTING STATISTICS TABLE */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Batting Performance Records
                  </h5>
                  <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                    <table className="w-full text-xs text-center">
                      <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Matches</th>
                          <th className="py-2.5 px-3">Innings</th>
                          <th className="py-2.5 px-3 font-bold text-amber-800">Runs</th>
                          <th className="py-2.5 px-3">HS</th>
                          <th className="py-2.5 px-3">Average</th>
                          <th className="py-2.5 px-3">SR</th>
                          <th className="py-2.5 px-3">50s</th>
                          <th className="py-2.5 px-3">100s</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                        <tr>
                          <td className="py-3 px-3">{activeModalPlayer.stats.matches}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.innings}</td>
                          <td className="py-3 px-3 font-black text-amber-600 text-sm">{activeModalPlayer.stats.runs}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.highestScore}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.battingAverage}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.strikeRate}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.fifties}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.hundreds}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* BOWLING STATISTICS TABLE */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-900" />
                    Bowling Performance Records
                  </h5>
                  <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                    <table className="w-full text-xs text-center">
                      <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Matches</th>
                          <th className="py-2.5 px-3">Overs</th>
                          <th className="py-2.5 px-3 font-bold text-blue-900">Wickets</th>
                          <th className="py-2.5 px-3">BBI</th>
                          <th className="py-2.5 px-3">Economy</th>
                          <th className="py-2.5 px-3">Average</th>
                          <th className="py-2.5 px-3">5W Hauls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                        <tr>
                          <td className="py-3 px-3">{activeModalPlayer.stats.matches}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.oversBowled}</td>
                          <td className="py-3 px-3 font-black text-blue-900 text-sm">{activeModalPlayer.stats.wickets}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.bestBowling}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.economyRate}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.bowlingAverage}</td>
                          <td className="py-3 px-3">{activeModalPlayer.stats.fiveWicketHauls}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Field & Catching Records */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-between">
                    <span className="text-slate-500">Catches Taken:</span>
                    <strong className="font-bold text-slate-900">{activeModalPlayer.stats.catches}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 border rounded-xl flex items-center justify-between">
                    <span className="text-slate-500">Stumpings:</span>
                    <strong className="font-bold text-slate-900">{activeModalPlayer.stats.stumpings}</strong>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-100 p-4 border-t flex justify-end">
                <button
                  onClick={() => {
                    setActiveModalPlayer(null);
                    if (onClearSelectedPlayer) onClearSelectedPlayer();
                  }}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIGITAL ID CARD POPUP */}
        {showIdCardModal && activeModalPlayer && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl p-6 border-2 border-amber-500 max-w-md w-full relative shadow-2xl animate-in zoom-in-95">
              <button
                onClick={() => setShowIdCardModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <DigitalIdCard
                player={activeModalPlayer}
                onClose={() => setShowIdCardModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
