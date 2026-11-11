import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { Match, MatchFormat } from '../../types';
import { 
  Flame, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Award, 
  Shield, 
  RefreshCw, 
  RotateCcw, 
  ChevronRight,
  Radio,
  Zap,
  Play
} from 'lucide-react';

interface MatchCentrePageProps {
  onOpenScorerPanel?: (matchId: string) => void;
}

export const MatchCentrePage: React.FC<MatchCentrePageProps> = ({ onOpenScorerPanel }) => {
  const { matches, recordBallScore, undoLastBall, currentRole } = useWca();
  const [filter, setFilter] = useState<'all' | 'Live' | 'Scheduled' | 'Completed'>('all');
  const [selectedMatchId, setSelectedMatchId] = useState<string>(matches[0]?.id || '');
  const [scorecardInnings, setScorecardInnings] = useState<1 | 2>(1);

  // Scorer inline quick console state
  const [scorerRuns, setScorerRuns] = useState<number>(0);
  const [extraType, setExtraType] = useState<'none' | 'wide' | 'no-ball' | 'bye' | 'leg-bye'>('none');
  const [isWicket, setIsWicket] = useState<boolean>(false);
  const [wicketType, setWicketType] = useState<string>('bowled');
  const [commentaryText, setCommentaryText] = useState<string>('');

  const liveMatches = matches.filter(m => m.status === 'Live' || m.status === 'Innings Break');
  const upcomingMatches = matches.filter(m => m.status === 'Scheduled');
  const completedMatches = matches.filter(m => m.status === 'Completed');

  const filteredMatches = matches.filter(m => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  const activeMatch = matches.find(m => m.id === selectedMatchId) || matches[0];

  const handleRecordBall = (matchId: string) => {
    if (!activeMatch) return;
    const innKey = activeMatch.currentInnings === 1 ? 'innings1' : 'innings2';
    const currentInn = activeMatch[innKey];
    const striker = activeMatch.currentStriker || currentInn?.batting[0]?.playerName || 'Striker';
    const bowler = activeMatch.currentBowler || currentInn?.bowling[0]?.playerName || 'Bowler';

    recordBallScore(matchId, {
      runsScored: scorerRuns,
      extraType: extraType === 'none' ? undefined : extraType,
      extraRuns: (extraType === 'bye' || extraType === 'leg-bye') ? scorerRuns : 0,
      isWicket,
      wicketType: isWicket ? wicketType : undefined,
      strikerName: striker,
      bowlerName: bowler,
      commentary: commentaryText.trim() || undefined
    });

    // Reset temporary ball state
    setScorerRuns(0);
    setExtraType('none');
    setIsWicket(false);
    setCommentaryText('');
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-300 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-600/10 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              WCA Official Cricket Match Centre
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-teko tracking-wide">
              LIVE SCORES & MATCH SCORECARDS
            </h1>
            <p className="text-xs text-slate-600">
              Real-time ball-by-ball action, fixtures, and complete official tournament scorecards.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Matches ({matches.length})
            </button>
            <button
              onClick={() => setFilter('Live')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                filter === 'Live'
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Live ({liveMatches.length})
            </button>
            <button
              onClick={() => setFilter('Scheduled')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'Scheduled'
                  ? 'bg-blue-900 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              Upcoming ({upcomingMatches.length})
            </button>
            <button
              onClick={() => setFilter('Completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'Completed'
                  ? 'bg-emerald-800 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              Results ({completedMatches.length})
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Match List + Main Match Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Matches List Column */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Select Match to View ({filteredMatches.length})
            </h3>

            <div className="space-y-3">
              {filteredMatches.map(m => {
                const isSelected = activeMatch?.id === m.id;
                const isLive = m.status === 'Live';
                const isCompleted = m.status === 'Completed';

                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMatchId(m.id);
                      setScorecardInnings(m.currentInnings);
                    }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#0B1E38] text-white border-amber-500 shadow-lg'
                        : 'bg-white text-slate-800 hover:border-slate-400 hover:shadow-sm'
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className={`font-semibold uppercase tracking-wider ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                        {m.format} • {m.tournamentName}
                      </span>
                      {isLive && (
                        <span className="flex items-center gap-1 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                          <Flame className="w-3 h-3 text-amber-300" /> LIVE
                        </span>
                      )}
                      {isCompleted && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isSelected ? 'bg-emerald-900/60 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          Completed
                        </span>
                      )}
                      {m.status === 'Scheduled' && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isSelected ? 'bg-blue-900/60 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          Upcoming
                        </span>
                      )}
                    </div>

                    {/* Team A */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <img src={m.teamA.logoUrl} alt="" className="w-6 h-6 rounded-full object-cover border" />
                        <span className="font-bold text-sm">{m.teamA.name}</span>
                      </div>
                      <span className="font-mono font-bold text-sm">
                        {m.innings1 ? `${m.innings1.totalRuns}/${m.innings1.wickets} (${m.innings1.overs} ov)` : '-'}
                      </span>
                    </div>

                    {/* Team B */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <img src={m.teamB.logoUrl} alt="" className="w-6 h-6 rounded-full object-cover border" />
                        <span className="font-bold text-sm">{m.teamB.name}</span>
                      </div>
                      <span className="font-mono font-bold text-sm">
                        {m.innings2 ? `${m.innings2.totalRuns}/${m.innings2.wickets} (${m.innings2.overs} ov)` : '-'}
                      </span>
                    </div>

                    {/* Status Note */}
                    <div className="mt-2 pt-2 border-t border-slate-700/30 text-xs">
                      {isLive && m.target && (
                        <p className={`font-semibold ${isSelected ? 'text-amber-300' : 'text-blue-700'}`}>
                          {m.teamB.shortName} needs {m.target - (m.innings2?.totalRuns || 0)} runs to win (RRR: {m.requiredRunRate})
                        </p>
                      )}
                      {isCompleted && m.resultSummary && (
                        <p className={`font-semibold ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                          {m.resultSummary}
                        </p>
                      )}
                      {m.status === 'Scheduled' && (
                        <p className={`flex items-center gap-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          <Clock className="w-3 h-3 text-amber-500" />
                          {m.matchDate} at {m.matchTime} • {m.venue}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Active Match Display */}
          <div className="lg:col-span-8">
            {activeMatch ? (
              <div className="space-y-6">
                {/* Grand Scoreboard Card */}
                <div className="bg-[#0B1E38] text-white rounded-2xl shadow-xl border-2 border-amber-500/40 overflow-hidden">
                  {/* Tournament and Venue Bar */}
                  <div className="bg-[#071326] px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      {activeMatch.tournamentName} ({activeMatch.format})
                    </span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {activeMatch.venue}
                    </span>
                  </div>

                  {/* Scoreboard Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* Team A */}
                      <div className={`p-4 rounded-xl border ${activeMatch.currentInnings === 1 && activeMatch.status === 'Live' ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-900/40 border-slate-700'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={activeMatch.teamA.logoUrl} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />
                            <div>
                              <h4 className="font-bold text-base text-white">{activeMatch.teamA.name}</h4>
                              <span className="text-[11px] text-slate-400">1st Innings</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-teko text-3xl font-bold text-amber-400 leading-none">
                              {activeMatch.innings1 ? `${activeMatch.innings1.totalRuns}/${activeMatch.innings1.wickets}` : '0/0'}
                            </div>
                            <span className="text-xs text-slate-300 font-mono">
                              {activeMatch.innings1 ? `${activeMatch.innings1.overs} / ${activeMatch.innings1.maxOvers} ov` : '0 ov'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Team B */}
                      <div className={`p-4 rounded-xl border ${activeMatch.currentInnings === 2 && activeMatch.status === 'Live' ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-900/40 border-slate-700'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={activeMatch.teamB.logoUrl} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />
                            <div>
                              <h4 className="font-bold text-base text-white">{activeMatch.teamB.name}</h4>
                              <span className="text-[11px] text-slate-400">2nd Innings</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-teko text-3xl font-bold text-amber-400 leading-none">
                              {activeMatch.innings2 ? `${activeMatch.innings2.totalRuns}/${activeMatch.innings2.wickets}` : 'Yet to Bat'}
                            </div>
                            <span className="text-xs text-slate-300 font-mono">
                              {activeMatch.innings2 ? `${activeMatch.innings2.overs} / ${activeMatch.innings2.maxOvers} ov` : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Match State metrics */}
                    {activeMatch.status === 'Live' && (
                      <div className="mt-6 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Current RR:</span>
                            <span className="font-bold text-white font-mono text-sm">{activeMatch.currentRunRate || '7.50'}</span>
                          </div>
                          {activeMatch.requiredRunRate && (
                            <div>
                              <span className="text-slate-400 block text-[10px]">Required RR:</span>
                              <span className="font-bold text-amber-400 font-mono text-sm">{activeMatch.requiredRunRate}</span>
                            </div>
                          )}
                          {activeMatch.target && (
                            <div>
                              <span className="text-slate-400 block text-[10px]">Target:</span>
                              <span className="font-bold text-white font-mono text-sm">{activeMatch.target} runs</span>
                            </div>
                          )}
                          {activeMatch.partnershipRuns !== undefined && (
                            <div>
                              <span className="text-slate-400 block text-[10px]">Partnership:</span>
                              <span className="font-bold text-emerald-400 font-mono text-sm">
                                {activeMatch.partnershipRuns} ({activeMatch.partnershipBalls || 0}b)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Current batsmen & bowler */}
                        <div className="text-right text-xs">
                          <p className="text-slate-300">
                            Striker: <strong className="text-amber-300 font-semibold">{activeMatch.currentStriker || 'Striker'} *</strong>
                          </p>
                          <p className="text-slate-400">
                            Bowler: <strong className="text-slate-200">{activeMatch.currentBowler || 'Bowler'}</strong>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Completed summary */}
                    {activeMatch.status === 'Completed' && (
                      <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          <span className="text-sm font-bold text-white">
                            {activeMatch.resultSummary}
                          </span>
                        </div>
                        {activeMatch.playerOfTheMatch && (
                          <span className="text-xs text-amber-300 font-semibold">
                            Player of the Match: {activeMatch.playerOfTheMatch}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Officials footer */}
                  <div className="bg-slate-950 px-5 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap justify-between">
                    <span>Umpires: {activeMatch.umpires.join(', ')}</span>
                    <span>Scorer: {activeMatch.scorer}</span>
                  </div>
                </div>

                {/* SCORER INTERACTIVE KEYPAD CONSOLE (Visible for authorized roles or testing live ball updates) */}
                {activeMatch.status === 'Live' && (
                  <div className="bg-white rounded-2xl p-5 border border-slate-300 shadow-md">
                    <div className="flex items-center justify-between pb-3 border-b mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-red-600 rounded text-white">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 uppercase">
                            Authorized Live Scorer Quick-Console
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Ball-by-ball entry updates the public scoreboard immediately.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => undoLastBall(activeMatch.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Undo Last Ball
                        </button>
                      </div>
                    </div>

                    {/* Scorer Controls */}
                    <div className="space-y-4">
                      {/* Striker & Bowler inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-600 font-bold uppercase mb-1">
                            Current Striker:
                          </label>
                          <input
                            type="text"
                            value={activeMatch.currentStriker || ''}
                            onChange={e => {
                              // can edit on the fly
                            }}
                            className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-semibold"
                            placeholder="Batsman on strike"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-bold uppercase mb-1">
                            Current Bowler:
                          </label>
                          <input
                            type="text"
                            value={activeMatch.currentBowler || ''}
                            onChange={e => {
                              // can edit on the fly
                            }}
                            className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-semibold"
                            placeholder="Bowler name"
                          />
                        </div>
                      </div>

                      {/* Runs buttons */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                          Runs Scored:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[0, 1, 2, 3, 4, 6].map(runs => (
                            <button
                              key={runs}
                              type="button"
                              onClick={() => setScorerRuns(runs)}
                              className={`w-11 h-11 rounded-xl font-black text-sm flex items-center justify-center transition-all ${
                                scorerRuns === runs
                                  ? 'bg-[#0B1E38] text-amber-400 ring-2 ring-amber-400 scale-105'
                                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                              }`}
                            >
                              {runs}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Extras & Wicket check */}
                      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                        <div className="flex items-center gap-2">
                          <label className="font-bold text-slate-700 uppercase">Extra:</label>
                          <select
                            value={extraType}
                            onChange={e => setExtraType(e.target.value as any)}
                            className="px-2.5 py-1.5 border rounded-lg bg-slate-50 font-semibold"
                          >
                            <option value="none">Legal Ball (None)</option>
                            <option value="wide">Wide (+1 Run)</option>
                            <option value="no-ball">No Ball (+1 Run)</option>
                            <option value="bye">Bye</option>
                            <option value="leg-bye">Leg Bye</option>
                          </select>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                          <input
                            type="checkbox"
                            checked={isWicket}
                            onChange={e => setIsWicket(e.target.checked)}
                            className="w-4 h-4 rounded text-rose-600"
                          />
                          WICKET FALL!
                        </label>

                        {isWicket && (
                          <select
                            value={wicketType}
                            onChange={e => setWicketType(e.target.value)}
                            className="px-2.5 py-1.5 border border-rose-300 rounded-lg bg-rose-50 text-rose-900 font-semibold text-xs"
                          >
                            <option value="bowled">Bowled</option>
                            <option value="caught">Caught</option>
                            <option value="lbw">LBW</option>
                            <option value="run out">Run Out</option>
                            <option value="stumped">Stumped</option>
                          </select>
                        )}
                      </div>

                      {/* Commentary snippet */}
                      <div>
                        <input
                          type="text"
                          value={commentaryText}
                          onChange={e => setCommentaryText(e.target.value)}
                          placeholder="Optional short ball commentary (e.g. Crisp drive through cover-point)..."
                          className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none"
                        />
                      </div>

                      {/* Commit Ball Button */}
                      <button
                        type="button"
                        onClick={() => handleRecordBall(activeMatch.id)}
                        className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        SUBMIT BALL (
                        {scorerRuns} runs {extraType !== 'none' ? `+ ${extraType}` : ''} {isWicket ? `+ WICKET (${wicketType})` : ''}
                        )
                      </button>
                    </div>
                  </div>
                )}

                {/* Recent Commentary & Ball Feeds */}
                {activeMatch.recentBalls && activeMatch.recentBalls.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span>Ball-by-Ball Timeline</span>
                      <span className="text-[10px] text-slate-500 font-normal">Last {activeMatch.recentBalls.length} balls</span>
                    </h4>
                    <div className="space-y-2">
                      {activeMatch.recentBalls.map((b, idx) => (
                        <div
                          key={b.id || idx}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-xs ${
                            b.isWicket
                              ? 'bg-rose-600 text-white'
                              : b.runsScored >= 4
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-200 text-slate-800'
                          }`}>
                            {b.isWicket ? 'W' : b.runsScored}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">
                                Over {b.overNumber}.{b.ballNumber}
                              </span>
                              <span className="text-[10px] text-slate-400">{b.timestamp}</span>
                            </div>
                            <p className="text-slate-600 mt-0.5">{b.commentary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scorecard Tabs: Batting, Bowling, Fall of Wickets */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-base font-bold text-slate-900 uppercase font-teko text-xl tracking-wide">
                      DETAILED MATCH SCORECARD
                    </h3>

                    {/* Innings Selector */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setScorecardInnings(1)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          scorecardInnings === 1
                            ? 'bg-[#0B1E38] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        1st Innings ({activeMatch.teamA.shortName})
                      </button>
                      <button
                        onClick={() => setScorecardInnings(2)}
                        disabled={!activeMatch.innings2}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          scorecardInnings === 2
                            ? 'bg-[#0B1E38] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50'
                        }`}
                      >
                        2nd Innings ({activeMatch.teamB.shortName})
                      </button>
                    </div>
                  </div>

                  {(() => {
                    const currentInn = scorecardInnings === 1 ? activeMatch.innings1 : activeMatch.innings2;
                    if (!currentInn) {
                      return (
                        <p className="text-xs text-slate-500 py-4 text-center">
                          Innings has not commenced yet.
                        </p>
                      );
                    }

                    return (
                      <div className="space-y-6">
                        {/* Batting Table */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Batting — {currentInn.teamName}
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                                <tr>
                                  <th className="py-2 px-3">Batsman</th>
                                  <th className="py-2 px-3">Dismissal</th>
                                  <th className="py-2 px-3 text-right">R</th>
                                  <th className="py-2 px-3 text-right">B</th>
                                  <th className="py-2 px-3 text-right">4s</th>
                                  <th className="py-2 px-3 text-right">6s</th>
                                  <th className="py-2 px-3 text-right">SR</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 font-medium">
                                {currentInn.batting.map((b, i) => (
                                  <tr key={i} className="hover:bg-slate-50">
                                    <td className="py-2 px-3 font-bold text-slate-900">{b.playerName}</td>
                                    <td className="py-2 px-3 text-slate-500 italic">{b.howOut}</td>
                                    <td className="py-2 px-3 text-right font-bold text-slate-900">{b.runs}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{b.balls}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{b.fours}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{b.sixes}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{b.strikeRate}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Extras & Total */}
                          <div className="mt-3 p-3 bg-slate-50 rounded-lg flex flex-wrap justify-between text-xs text-slate-700 font-medium">
                            <span>
                              Extras: <strong className="font-bold">{currentInn.extras.total}</strong> (w {currentInn.extras.wides}, nb {currentInn.extras.noBalls}, b {currentInn.extras.byes}, lb {currentInn.extras.legByes})
                            </span>
                            <span>
                              Total: <strong className="font-bold text-slate-900">{currentInn.totalRuns}/{currentInn.wickets}</strong> ({currentInn.overs} Overs, RR: {(currentInn.overs > 0 ? (currentInn.totalRuns / currentInn.overs).toFixed(2) : 0)})
                            </span>
                          </div>
                        </div>

                        {/* Bowling Table */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Bowling
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                                <tr>
                                  <th className="py-2 px-3">Bowler</th>
                                  <th className="py-2 px-3 text-right">O</th>
                                  <th className="py-2 px-3 text-right">M</th>
                                  <th className="py-2 px-3 text-right">R</th>
                                  <th className="py-2 px-3 text-right">W</th>
                                  <th className="py-2 px-3 text-right">ECON</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 font-medium">
                                {currentInn.bowling.map((bw, i) => (
                                  <tr key={i} className="hover:bg-slate-50">
                                    <td className="py-2 px-3 font-bold text-slate-900">{bw.playerName}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{bw.overs}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{bw.maidens}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{bw.runs}</td>
                                    <td className="py-2 px-3 text-right font-bold text-amber-700">{bw.wickets}</td>
                                    <td className="py-2 px-3 text-right text-slate-600">{bw.economy}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Fall of Wickets */}
                        {currentInn.fallOfWickets && currentInn.fallOfWickets.length > 0 && (
                          <div className="pt-2">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Fall of Wickets
                            </h4>
                            <div className="flex flex-wrap gap-2 text-[11px]">
                              {currentInn.fallOfWickets.map((f, i) => (
                                <span key={i} className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200">
                                  <strong>{f.score}/{f.wicketNumber}</strong> ({f.playerOut}, {f.over} ov)
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border text-slate-500">
                No match selected.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
