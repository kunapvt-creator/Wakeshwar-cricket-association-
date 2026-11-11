import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { Player } from '../../types';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Filter, 
  Zap,
  ArrowRight
} from 'lucide-react';

export const RankingsPage: React.FC<{ onViewPlayer?: (pId: string) => void }> = ({ onViewPlayer }) => {
  const { players } = useWca();
  const [activeCategory, setActiveCategory] = useState<'batsmen' | 'bowlers' | 'allrounders' | 'wicketkeepers' | 'mvp'>('batsmen');
  const [searchQuery, setSearchQuery] = useState('');

  // Top Batsmen sorted by runs then average
  const topBatsmen = [...players].sort((a, b) => b.stats.runs - a.stats.runs);

  // Top Bowlers sorted by wickets then economy
  const topBowlers = [...players].sort((a, b) => {
    if (b.stats.wickets !== a.stats.wickets) {
      return b.stats.wickets - a.stats.wickets;
    }
    return (a.stats.economyRate || 99) - (b.stats.economyRate || 99);
  });

  // Top All-rounders (composite score: runs + wickets * 20)
  const topAllRounders = [...players].sort((a, b) => {
    const scoreA = a.stats.runs + (a.stats.wickets * 20);
    const scoreB = b.stats.runs + (b.stats.wickets * 20);
    return scoreB - scoreA;
  });

  // Top Wicketkeepers
  const topWicketkeepers = [...players]
    .filter(p => p.playingRole === 'Wicketkeeper' || p.stats.catches > 5)
    .sort((a, b) => (b.stats.catches + b.stats.stumpings) - (a.stats.catches + a.stats.stumpings));

  // MVP
  const mvpList = [...players].sort((a, b) => {
    const pointsA = a.stats.runs + (a.stats.wickets * 25) + (a.stats.catches * 10);
    const pointsB = b.stats.runs + (b.stats.wickets * 25) + (b.stats.catches * 10);
    return pointsB - pointsA;
  });

  const getActiveList = () => {
    let list: Player[] = [];
    if (activeCategory === 'batsmen') list = topBatsmen;
    else if (activeCategory === 'bowlers') list = topBowlers;
    else if (activeCategory === 'allrounders') list = topAllRounders;
    else if (activeCategory === 'wicketkeepers') list = topWicketkeepers;
    else list = mvpList;

    if (!searchQuery.trim()) return list;
    return list.filter(p => p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const currentList = getActiveList();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            WCA Official Performance Standings
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            OFFICIAL PLAYER LEADERBOARDS & RANKINGS
          </h1>
          <p className="text-sm text-slate-600">
            Computed from verified match scorecards across sanctioned Wakeshwar Cricket Association tournaments.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveCategory('batsmen')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'batsmen'
                  ? 'bg-[#0B1E38] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Top Batsmen
            </button>
            <button
              onClick={() => setActiveCategory('bowlers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'bowlers'
                  ? 'bg-[#0B1E38] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Top Bowlers
            </button>
            <button
              onClick={() => setActiveCategory('allrounders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'allrounders'
                  ? 'bg-[#0B1E38] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Top All-rounders
            </button>
            <button
              onClick={() => setActiveCategory('wicketkeepers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'wicketkeepers'
                  ? 'bg-[#0B1E38] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Best Wicketkeepers
            </button>
            <button
              onClick={() => setActiveCategory('mvp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'mvp'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Tournament MVP
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ranked player by name or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Rankings Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-[#0B1E38] text-white px-6 py-3 flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-amber-400">
              Rankings Category: {activeCategory.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-300 font-mono">
              Verified Records Only
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 text-center">Rank</th>
                  <th className="py-3 px-4">Player & Club</th>
                  <th className="py-3 px-4 text-center">Matches</th>
                  {activeCategory === 'batsmen' && (
                    <>
                      <th className="py-3 px-4 text-right font-bold text-amber-800">Total Runs</th>
                      <th className="py-3 px-4 text-right">HS</th>
                      <th className="py-3 px-4 text-right">Avg</th>
                      <th className="py-3 px-4 text-right">Strike Rate</th>
                      <th className="py-3 px-4 text-right">50s / 100s</th>
                    </>
                  )}
                  {activeCategory === 'bowlers' && (
                    <>
                      <th className="py-3 px-4 text-right font-bold text-blue-900">Wickets</th>
                      <th className="py-3 px-4 text-right">Overs</th>
                      <th className="py-3 px-4 text-right">BBI</th>
                      <th className="py-3 px-4 text-right">Econ</th>
                      <th className="py-3 px-4 text-right">Avg</th>
                      <th className="py-3 px-4 text-right">5-Wkt Hauls</th>
                    </>
                  )}
                  {activeCategory === 'allrounders' && (
                    <>
                      <th className="py-3 px-4 text-right font-bold text-amber-700">Runs</th>
                      <th className="py-3 px-4 text-right font-bold text-blue-900">Wickets</th>
                      <th className="py-3 px-4 text-right">Bat Avg</th>
                      <th className="py-3 px-4 text-right">Bowl Econ</th>
                      <th className="py-3 px-4 text-right font-black text-slate-900">Index Pts</th>
                    </>
                  )}
                  {activeCategory === 'wicketkeepers' && (
                    <>
                      <th className="py-3 px-4 text-right font-bold text-slate-900">Total Dismissals</th>
                      <th className="py-3 px-4 text-right">Catches</th>
                      <th className="py-3 px-4 text-right">Stumpings</th>
                      <th className="py-3 px-4 text-right">Batting Runs</th>
                    </>
                  )}
                  {activeCategory === 'mvp' && (
                    <>
                      <th className="py-3 px-4 text-right font-bold text-amber-700">Runs</th>
                      <th className="py-3 px-4 text-right font-bold text-blue-900">Wickets</th>
                      <th className="py-3 px-4 text-right">Catches</th>
                      <th className="py-3 px-4 text-right font-black text-amber-600 text-sm">MVP Rating</th>
                    </>
                  )}
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {currentList.map((player, idx) => {
                  const isTop3 = idx < 3;
                  const rankBadge = idx === 0 
                    ? 'bg-amber-400 text-slate-950 font-black' 
                    : idx === 1 
                    ? 'bg-slate-300 text-slate-900 font-bold' 
                    : idx === 2 
                    ? 'bg-amber-700 text-white font-bold' 
                    : 'bg-slate-100 text-slate-600';

                  const compositeIndex = player.stats.runs + (player.stats.wickets * 20);
                  const mvpScore = player.stats.runs + (player.stats.wickets * 25) + (player.stats.catches * 10);

                  return (
                    <tr key={player.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-center">
                        <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-xs ${rankBadge}`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={player.photoUrl}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">
                              {player.fullName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {player.id} • {player.currentClubName || player.previousClub || 'Affiliated'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-600">{player.stats.matches}</td>

                      {activeCategory === 'batsmen' && (
                        <>
                          <td className="py-3 px-4 text-right font-black text-amber-600 text-sm">{player.stats.runs}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.highestScore}</td>
                          <td className="py-3 px-4 text-right text-slate-800 font-bold">{player.stats.battingAverage}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.strikeRate}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.fifties} / {player.stats.hundreds}</td>
                        </>
                      )}

                      {activeCategory === 'bowlers' && (
                        <>
                          <td className="py-3 px-4 text-right font-black text-blue-900 text-sm">{player.stats.wickets}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.oversBowled}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.bestBowling}</td>
                          <td className="py-3 px-4 text-right text-slate-800 font-bold">{player.stats.economyRate}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.bowlingAverage}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.fiveWicketHauls}</td>
                        </>
                      )}

                      {activeCategory === 'allrounders' && (
                        <>
                          <td className="py-3 px-4 text-right font-bold text-amber-700">{player.stats.runs}</td>
                          <td className="py-3 px-4 text-right font-bold text-blue-900">{player.stats.wickets}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.battingAverage}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.economyRate}</td>
                          <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">{compositeIndex}</td>
                        </>
                      )}

                      {activeCategory === 'wicketkeepers' && (
                        <>
                          <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
                            {player.stats.catches + player.stats.stumpings}
                          </td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.catches}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.stumpings}</td>
                          <td className="py-3 px-4 text-right font-bold text-amber-700">{player.stats.runs}</td>
                        </>
                      )}

                      {activeCategory === 'mvp' && (
                        <>
                          <td className="py-3 px-4 text-right font-bold text-amber-700">{player.stats.runs}</td>
                          <td className="py-3 px-4 text-right font-bold text-blue-900">{player.stats.wickets}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{player.stats.catches}</td>
                          <td className="py-3 px-4 text-right font-black text-amber-600 text-sm">{mvpScore}</td>
                        </>
                      )}

                      <td className="py-3 px-4 text-center">
                        {onViewPlayer && (
                          <button
                            onClick={() => onViewPlayer(player.id)}
                            className="text-[11px] font-bold text-blue-700 hover:text-amber-600 underline"
                          >
                            Profile
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
