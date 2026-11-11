import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { 
  Player, 
  Club, 
  Tournament, 
  Match, 
  CommitteeMember, 
  NewsArticle, 
  OfficialDocument, 
  UserRole,
  RegistrationStatus 
} from '../../types';
import { DigitalIdCard } from '../common/DigitalIdCard';
import { 
  Shield, 
  Users, 
  Building2, 
  Trophy, 
  Flame, 
  FileText, 
  Image, 
  Settings, 
  Download, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  ArrowLeft,
  RotateCcw,
  UserCheck,
  Radio,
  FileSpreadsheet,
  AlertTriangle,
  Play,
  Calendar
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    settings,
    updateSettings,
    players,
    updatePlayerStatus,
    updatePlayer,
    deletePlayer,
    clubs,
    updateClubStatus,
    updateClub,
    deleteClub,
    tournaments,
    createTournament,
    updateTournament,
    deleteTournament,
    matches,
    createMatch,
    updateMatch,
    deleteMatch,
    recordBallScore,
    undoLastBall,
    committee,
    addCommitteeMember,
    updateCommitteeMember,
    deleteCommitteeMember,
    news,
    addNewsArticle,
    deleteNewsArticle,
    documents,
    addDocument,
    deleteDocument,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    officials,
    updateOfficialStatus,
    contactMessages,
    markMessageRead,
    currentRole,
    loginAs,
    logout,
    resetAllToDefault,
    showToast
  } = useWca();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'players'
    | 'clubs'
    | 'tournaments'
    | 'matches'
    | 'scoring'
    | 'committee'
    | 'news'
    | 'gallery'
    | 'documents'
    | 'reports'
    | 'settings'
  >('overview');

  // Modals / Selection
  const [selectedPlayerForCard, setSelectedPlayerForCard] = useState<Player | null>(null);
  const [selectedScoringMatchId, setSelectedScoringMatchId] = useState<string>(matches[0]?.id || '');
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // New Tournament Modal State
  const [showNewTournamentModal, setShowNewTournamentModal] = useState(false);
  const [newTrnData, setNewTrnData] = useState({
    name: '',
    bannerUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    category: 'District-Level Tournaments' as any,
    format: 'T20' as any,
    description: '',
    registrationOpenDate: '2026-03-01',
    registrationCloseDate: '2026-03-20',
    startDate: '2026-04-01',
    endDate: '2026-04-20',
    venue: 'WCA Main Stadium',
    entryFee: '₹4,000 per team',
    rules: [
      'Official ICC T20 rules apply.',
      'All players must have valid WCA Digital IDs.'
    ],
    participatingClubs: clubs.map(c => c.id).slice(0, 4),
    status: 'Upcoming' as const
  });

  // New Match Fixture State
  const [showNewMatchModal, setShowNewMatchModal] = useState(false);
  const [newMatchData, setNewMatchData] = useState({
    tournamentId: tournaments[0]?.id || '',
    format: 'T20' as any,
    teamAId: clubs[0]?.id || '',
    teamBId: clubs[1]?.id || '',
    venue: 'WCA Main Stadium',
    matchDate: '2026-03-05',
    matchTime: '10:00 IST',
    umpires: ['D. K. Satpute', 'P. G. Thorat'],
    scorer: 'K. R. Jagdale'
  });

  // Settings Edit State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Quick stats
  const totalPlayers = players.length;
  const approvedPlayers = players.filter(p => p.status === 'Approved').length;
  const pendingPlayers = players.filter(p => p.status === 'Pending').length;
  const totalClubs = clubs.length;
  const totalTournaments = tournaments.length;
  const liveMatches = matches.filter(m => m.status === 'Live').length;
  const upcomingMatches = matches.filter(m => m.status === 'Scheduled').length;
  const completedMatches = matches.filter(m => m.status === 'Completed').length;
  const totalOfficials = officials.length;

  // Filtered Players
  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(playerSearchQuery.toLowerCase()) || p.id.toLowerCase().includes(playerSearchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export to CSV helper
  const handleExportCSV = (type: 'players' | 'clubs' | 'matches') => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let filename = `wca_${type}_export.csv`;

    if (type === 'players') {
      csvContent += 'WCA_ID,Application_ID,Name,DOB,Role,Club,Status,Batting_Style,Bowling_Style,District,Mobile,Email\n';
      players.forEach(p => {
        csvContent += `"${p.id}","${p.applicationId}","${p.fullName}","${p.dateOfBirth}","${p.playingRole}","${p.currentClubName || ''}","${p.status}","${p.battingStyle}","${p.bowlingStyle}","${p.district}","${p.mobileNumber}","${p.email}"\n`;
      });
    } else if (type === 'clubs') {
      csvContent += 'Club_ID,Club_Name,Owner,Manager,Captain,Coach,Phone,Email,Home_Ground,Status\n';
      clubs.forEach(c => {
        csvContent += `"${c.id}","${c.name}","${c.ownerName}","${c.teamManager}","${c.captainName}","${c.coachName}","${c.contactNumber}","${c.email}","${c.homeGround}","${c.status}"\n`;
      });
    } else {
      csvContent += 'Match_ID,Tournament,Format,Team_A,Team_B,Date,Venue,Status,Result\n';
      matches.forEach(m => {
        csvContent += `"${m.id}","${m.tournamentName}","${m.format}","${m.teamA.name}","${m.teamB.name}","${m.matchDate}","${m.venue}","${m.status}","${m.resultSummary || 'N/A'}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Export Generated', `Successfully exported ${type} dataset as CSV.`);
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    createTournament(newTrnData);
    setShowNewTournamentModal(false);
  };

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const trn = tournaments.find(t => t.id === newMatchData.tournamentId) || tournaments[0];
    const teamA = clubs.find(c => c.id === newMatchData.teamAId) || clubs[0];
    const teamB = clubs.find(c => c.id === newMatchData.teamBId) || clubs[1];

    createMatch({
      tournamentId: trn?.id || '',
      tournamentName: trn?.name || 'Tournament',
      format: newMatchData.format,
      teamA: {
        id: teamA.id,
        name: teamA.name,
        shortName: teamA.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase(),
        logoUrl: teamA.logoUrl
      },
      teamB: {
        id: teamB.id,
        name: teamB.name,
        shortName: teamB.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase(),
        logoUrl: teamB.logoUrl
      },
      venue: newMatchData.venue,
      matchDate: newMatchData.matchDate,
      matchTime: newMatchData.matchTime,
      status: 'Scheduled',
      currentInnings: 1,
      umpires: newMatchData.umpires,
      scorer: newMatchData.scorer
    });
    setShowNewMatchModal(false);
  };

  const activeScoringMatch = matches.find(m => m.id === selectedScoringMatchId) || matches[0];

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/40">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black uppercase tracking-wider font-teko text-xl text-amber-400 leading-none">
                WCA CENTRAL ADMINISTRATIVE CONSOLE
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-500/30">
                ROLE: {currentRole}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Wakeshwar Cricket Association • Secure Operations Suite
            </p>
          </div>
        </div>

        {/* Role Switcher & Back to Site */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Active Role:</span>
            <select
              value={currentRole}
              onChange={e => loginAs(e.target.value as UserRole)}
              className="bg-slate-900 border border-slate-700 text-amber-300 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Association Admin">Association Admin</option>
              <option value="Tournament Manager">Tournament Manager</option>
              <option value="Official Scorer">Official Scorer</option>
              <option value="Club Manager">Club Manager</option>
              <option value="Player">Player</option>
            </select>
          </div>

          <button
            onClick={resetAllToDefault}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
            title="Reset data back to pristine initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Exit to Public Site
          </button>
        </div>
      </header>

      {/* Admin Layout: Nav Sidebar + Content Panel */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950/70 border-r border-slate-800 p-4 space-y-1.5 shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            ADMINISTRATIVE MODULES
          </p>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab('players')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'players'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              Player Management
            </span>
            {pendingPlayers > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {pendingPlayers}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('clubs')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'clubs'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Club Management
          </button>

          <button
            onClick={() => setActiveTab('tournaments')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'tournaments'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Tournaments & Fixtures
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'matches'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Match Management
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'scoring'
                ? 'bg-red-600 text-white font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            Live Scorer Console
          </button>

          <button
            onClick={() => setActiveTab('committee')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'committee'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Committee Governance
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'news'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            News & Circulars
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Image className="w-4 h-4" />
            Media Gallery
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'documents'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Official Documents
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'reports'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Reports & CSV Export
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            Website Settings
          </button>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW STATS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                  OPERATIONAL OVERVIEW & METRICS
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time status of associations registrations, fixtures, and database records.
                </p>
              </div>

              {/* 8 Overview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Total Players</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-white">{totalPlayers}</div>
                  <span className="text-[10px] text-emerald-400">Enrolled Cricketers</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Approved Players</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-emerald-400">{approvedPlayers}</div>
                  <span className="text-[10px] text-slate-400">Digital IDs Active</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Pending Applications</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-amber-400">{pendingPlayers}</div>
                  <span className="text-[10px] text-amber-300">Awaiting Verification</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Registered Clubs</span>
                    <Building2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-white">{totalClubs}</div>
                  <span className="text-[10px] text-slate-400">Affiliated Teams</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Tournaments</span>
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-white">{totalTournaments}</div>
                  <span className="text-[10px] text-slate-400">Sanctioned Cups</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Live Matches</span>
                    <Flame className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-red-400">{liveMatches}</div>
                  <span className="text-[10px] text-red-300">Active Ball-by-Ball</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Upcoming Matches</span>
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-white">{upcomingMatches}</div>
                  <span className="text-[10px] text-slate-400">Scheduled Fixtures</span>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase">Umpires & Scorers</span>
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black font-teko text-white">{totalOfficials}</div>
                  <span className="text-[10px] text-slate-400">Accredited Panel</span>
                </div>
              </div>

              {/* Quick Actions & Recent Enquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Player Applications */}
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <h4 className="text-sm font-bold uppercase text-white">
                      Recent Player Enrollments
                    </h4>
                    <button
                      onClick={() => setActiveTab('players')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      View All ({players.length}) →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {players.slice(0, 4).map(p => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                          <div>
                            <span className="font-bold text-white block">{p.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{p.id} • {p.playingRole}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.status === 'Approved' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                          }`}>
                            {p.status}
                          </span>
                          <button
                            onClick={() => setSelectedPlayerForCard(p)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-[10px] font-semibold"
                          >
                            Card
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Received Public Contact Inquiries */}
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <h4 className="text-sm font-bold uppercase text-white">
                      Secretariat Public Inquiries
                    </h4>
                    <span className="text-xs text-slate-400">{contactMessages.length} Messages</span>
                  </div>
                  {contactMessages.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      No pending messages in the secretariat inbox.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {contactMessages.map(msg => (
                        <div key={msg.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                          <div className="flex justify-between font-bold text-slate-200">
                            <span>{msg.name} ({msg.mobile})</span>
                            <span className="text-[10px] text-slate-500">{msg.submittedAt}</span>
                          </div>
                          <p className="text-amber-400 font-semibold">{msg.subject}</p>
                          <p className="text-slate-400 text-[11px]">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLAYER MANAGEMENT */}
          {activeTab === 'players' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                    PLAYER LICENSING & VERIFICATION MODULE
                  </h3>
                  <p className="text-xs text-slate-400">
                    Review applications, verify identity documents, approve digital licenses, and inspect statistics.
                  </p>
                </div>
                <button
                  onClick={() => handleExportCSV('players')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-slate-700"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  Export Players CSV
                </button>
              </div>

              {/* Search & Status Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={playerSearchQuery}
                    onChange={e => setPlayerSearchQuery(e.target.value)}
                    placeholder="Search player name, WCA ID, or village..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Players Table */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Player & ID</th>
                        <th className="py-3 px-4">Role & Style</th>
                        <th className="py-3 px-4">Club</th>
                        <th className="py-3 px-4">Identity Doc</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-medium text-slate-200">
                      {filteredPlayers.map(p => (
                        <tr key={p.id} className="hover:bg-slate-700/40">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-600" />
                              <div>
                                <span className="font-bold text-white block">{p.fullName}</span>
                                <span className="text-[10px] font-mono text-amber-400">{p.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-200 block">{p.playingRole}</span>
                            <span className="text-[10px] text-slate-400">{p.battingStyle}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {p.currentClubName || p.previousClub || 'Unassigned'}
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-[11px]">
                            {p.idProofType} ({p.idProofNumber || 'N/A'})
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={p.status}
                              onChange={e => updatePlayerStatus(p.id, e.target.value as RegistrationStatus)}
                              className={`px-2 py-1 rounded text-[10px] font-bold uppercase bg-slate-900 border ${
                                p.status === 'Approved'
                                  ? 'text-emerald-400 border-emerald-500/50'
                                  : p.status === 'Rejected'
                                  ? 'text-rose-400 border-rose-500/50'
                                  : 'text-amber-400 border-amber-500/50'
                              }`}
                            >
                              <option value="Approved">Approved</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedPlayerForCard(p)}
                              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-[11px] font-semibold"
                            >
                              Digital ID Card
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete player ${p.fullName}?`)) deletePlayer(p.id);
                              }}
                              className="p-1 hover:text-rose-400 text-slate-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLUB MANAGEMENT */}
          {activeTab === 'clubs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                    AFFILIATED CLUB & SQUAD ROSTERS
                  </h3>
                  <p className="text-xs text-slate-400">
                    Approve cricket clubs, assign squads, and manage team management records.
                  </p>
                </div>
                <button
                  onClick={() => handleExportCSV('clubs')}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  Export Clubs CSV
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clubs.map(c => (
                  <div key={c.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={c.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-amber-400" />
                        <div>
                          <h4 className="font-bold text-base text-white">{c.name}</h4>
                          <span className="text-[10px] font-mono text-amber-400">{c.id} • {c.homeGround}</span>
                        </div>
                      </div>
                      <select
                        value={c.status}
                        onChange={e => updateClubStatus(c.id, e.target.value as any)}
                        className="bg-slate-900 text-xs font-bold uppercase px-2 py-1 rounded border border-slate-700 text-emerald-400"
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
                      <div>Owner: <strong className="text-white">{c.ownerName}</strong></div>
                      <div>Manager: <strong className="text-white">{c.teamManager}</strong></div>
                      <div>Captain: <strong className="text-amber-400">{c.captainName}</strong></div>
                      <div>Coach: <strong className="text-white">{c.coachName}</strong></div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          if (confirm(`Remove club ${c.name}?`)) deleteClub(c.id);
                        }}
                        className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Club
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TOURNAMENTS */}
          {activeTab === 'tournaments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                    TOURNAMENT CREATION & STANDINGS
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sanction new leagues, categories (U-14, U-16, U-19, Senior), and configure points tables.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewTournamentModal(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create Tournament
                </button>
              </div>

              <div className="space-y-4">
                {tournaments.map(t => (
                  <div key={t.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-slate-900 text-amber-300 px-2 py-0.5 rounded">
                            {t.id}
                          </span>
                          <span className="text-xs font-bold text-blue-300">{t.category} ({t.format})</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-1">{t.name}</h4>
                        <p className="text-xs text-slate-400">{t.venue} • {t.startDate} to {t.endDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={t.status}
                          onChange={e => updateTournament(t.id, { status: e.target.value as any })}
                          className="bg-slate-900 text-xs px-2.5 py-1 rounded text-white border border-slate-700"
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Ongoing">Ongoing</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm(`Delete tournament ${t.name}?`)) deleteTournament(t.id);
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MATCH MANAGEMENT & SCHEDULING */}
          {activeTab === 'matches' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                    MATCH SCHEDULING & FIXTURES
                  </h3>
                  <p className="text-xs text-slate-400">
                    Schedule fixtures, assign venues, select certified umpires, and update match statuses.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleExportCSV('matches')}
                    className="px-3.5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    Export CSV
                  </button>
                  <button
                    onClick={() => setShowNewMatchModal(true)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Schedule Match
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {matches.map(m => (
                  <div key={m.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono text-amber-400 font-bold">{m.id}</span>
                        <span>•</span>
                        <span>{m.tournamentName}</span>
                        <span>•</span>
                        <span>{m.matchDate} at {m.matchTime}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {m.teamA.name} vs {m.teamB.name}
                      </h4>
                      <p className="text-xs text-slate-400">{m.venue} | Umpires: {m.umpires.join(', ')}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={m.status}
                        onChange={e => updateMatch(m.id, { status: e.target.value as any })}
                        className={`text-xs font-bold uppercase px-2.5 py-1 rounded bg-slate-900 border ${
                          m.status === 'Live' ? 'text-red-400 border-red-500' : 'text-slate-200 border-slate-700'
                        }`}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Live">Live</option>
                        <option value="Innings Break">Innings Break</option>
                        <option value="Completed">Completed</option>
                        <option value="Abandoned">Abandoned</option>
                      </select>

                      <button
                        onClick={() => {
                          setSelectedScoringMatchId(m.id);
                          setActiveTab('scoring');
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase"
                      >
                        Open Live Console
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove fixture ${m.id}?`)) deleteMatch(m.id);
                        }}
                        className="p-1 hover:text-rose-400 text-slate-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LIVE SCORER CONSOLE */}
          {activeTab === 'scoring' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                  BALL-BY-BALL LIVE SCORER CONSOLE
                </h3>
                <p className="text-xs text-slate-400">
                  Select match and enter real-time runs, wickets, extras, and strike rotations.
                </p>
              </div>

              {/* Match selector */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Active Scoring Fixture:
                </label>
                <select
                  value={selectedScoringMatchId}
                  onChange={e => setSelectedScoringMatchId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-semibold"
                >
                  {matches.map(m => (
                    <option key={m.id} value={m.id}>
                      [{m.status.toUpperCase()}] {m.teamA.shortName} vs {m.teamB.shortName} ({m.tournamentName})
                    </option>
                  ))}
                </select>
              </div>

              {activeScoringMatch && (
                <div className="bg-slate-800/90 p-6 rounded-2xl border-2 border-amber-500/40 space-y-6">
                  {/* Current Score Snapshot */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-700">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase">
                        Current Innings: {activeScoringMatch.currentInnings}
                      </span>
                      <h4 className="text-xl font-black text-white font-teko text-2xl">
                        {activeScoringMatch.currentInnings === 1 ? activeScoringMatch.teamA.name : activeScoringMatch.teamB.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Status: <strong className="text-amber-400">{activeScoringMatch.status}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      {(() => {
                        const inn = activeScoringMatch.currentInnings === 1 ? activeScoringMatch.innings1 : activeScoringMatch.innings2;
                        return (
                          <>
                            <div className="text-4xl font-black font-teko text-amber-400">
                              {inn ? `${inn.totalRuns}/${inn.wickets}` : '0/0'}
                            </div>
                            <span className="text-xs font-mono text-slate-400">
                              ({inn ? inn.overs : 0} / {inn ? inn.maxOvers : 20} Overs)
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Scorer Keypad */}
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold uppercase text-slate-400">
                      Record Next Delivery:
                    </h5>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[0, 1, 2, 3, 4, 6].map(runs => (
                        <button
                          key={runs}
                          onClick={() => {
                            const innKey = activeScoringMatch.currentInnings === 1 ? 'innings1' : 'innings2';
                            const inn = activeScoringMatch[innKey];
                            recordBallScore(activeScoringMatch.id, {
                              runsScored: runs,
                              isWicket: false,
                              strikerName: activeScoringMatch.currentStriker || inn?.batting[0]?.playerName || 'Striker',
                              bowlerName: activeScoringMatch.currentBowler || inn?.bowling[0]?.playerName || 'Bowler'
                            });
                          }}
                          className="py-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black rounded-xl border border-slate-700 text-sm transition-all"
                        >
                          {runs} Run{runs !== 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>

                    {/* Extras & Wicket Triggers */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => {
                          const innKey = activeScoringMatch.currentInnings === 1 ? 'innings1' : 'innings2';
                          const inn = activeScoringMatch[innKey];
                          recordBallScore(activeScoringMatch.id, {
                            runsScored: 0,
                            extraType: 'wide',
                            extraRuns: 0,
                            isWicket: false,
                            strikerName: activeScoringMatch.currentStriker || inn?.batting[0]?.playerName || 'Striker',
                            bowlerName: activeScoringMatch.currentBowler || inn?.bowling[0]?.playerName || 'Bowler'
                          });
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase rounded-lg border border-slate-700"
                      >
                        + Wide Ball
                      </button>

                      <button
                        onClick={() => {
                          const innKey = activeScoringMatch.currentInnings === 1 ? 'innings1' : 'innings2';
                          const inn = activeScoringMatch[innKey];
                          recordBallScore(activeScoringMatch.id, {
                            runsScored: 0,
                            extraType: 'no-ball',
                            extraRuns: 0,
                            isWicket: false,
                            strikerName: activeScoringMatch.currentStriker || inn?.batting[0]?.playerName || 'Striker',
                            bowlerName: activeScoringMatch.currentBowler || inn?.bowling[0]?.playerName || 'Bowler'
                          });
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase rounded-lg border border-slate-700"
                      >
                        + No Ball
                      </button>

                      <button
                        onClick={() => {
                          const innKey = activeScoringMatch.currentInnings === 1 ? 'innings1' : 'innings2';
                          const inn = activeScoringMatch[innKey];
                          recordBallScore(activeScoringMatch.id, {
                            runsScored: 0,
                            isWicket: true,
                            wicketType: 'bowled',
                            strikerName: activeScoringMatch.currentStriker || inn?.batting[0]?.playerName || 'Striker',
                            bowlerName: activeScoringMatch.currentBowler || inn?.bowling[0]?.playerName || 'Bowler'
                          });
                        }}
                        className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs uppercase rounded-lg shadow"
                      >
                        WICKET FALL (BOWLED)
                      </button>

                      <button
                        onClick={() => {
                          const innKey = activeScoringMatch.currentInnings === 1 ? 'innings1' : 'innings2';
                          const inn = activeScoringMatch[innKey];
                          recordBallScore(activeScoringMatch.id, {
                            runsScored: 0,
                            isWicket: true,
                            wicketType: 'caught',
                            strikerName: activeScoringMatch.currentStriker || inn?.batting[0]?.playerName || 'Striker',
                            bowlerName: activeScoringMatch.currentBowler || inn?.bowling[0]?.playerName || 'Bowler'
                          });
                        }}
                        className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs uppercase rounded-lg shadow"
                      >
                        WICKET FALL (CAUGHT)
                      </button>

                      <button
                        onClick={() => undoLastBall(activeScoringMatch.id)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs uppercase rounded-lg ml-auto flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Undo Ball
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: COMMITTEE GOVERNANCE */}
          {activeTab === 'committee' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                    EXECUTIVE & SUB-COMMITTEE ROSTER
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add, edit, or adjust management committee designations and member profiles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {committee.map(mem => (
                  <div key={mem.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-start gap-3">
                    <img src={mem.photoUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-amber-400">{mem.designation}</span>
                      <h4 className="font-bold text-white text-sm">{mem.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{mem.biography}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove member ${mem.name}?`)) deleteCommitteeMember(mem.id);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: NEWS & CIRCULARS */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                    NEWS & OFFICIAL CIRCULARS REPOSITORY
                  </h3>
                  <p className="text-xs text-slate-400">
                    Publish trials notices, official press releases, and tournament bulletins.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {news.map(art => (
                  <div key={art.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-400 bg-slate-900 px-2 py-0.5 rounded">
                        {art.category} • {art.publishedDate}
                      </span>
                      <h4 className="font-bold text-white text-base mt-1">{art.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{art.summary}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete article ${art.title}?`)) deleteNewsArticle(art.id);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                  MEDIA & PHOTOGRAPHY MANAGEMENT
                </h3>
                <p className="text-xs text-slate-400">
                  Manage albums, match photography, and trophy celebration imagery.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map(img => (
                  <div key={img.id} className="relative rounded-xl overflow-hidden group bg-slate-800 border border-slate-700">
                    <img src={img.imageUrl} alt="" className="w-full h-36 object-cover" />
                    <div className="p-2 text-xs">
                      <p className="font-bold text-white truncate">{img.title}</p>
                      <span className="text-[10px] text-amber-400">{img.category}</span>
                    </div>
                    <button
                      onClick={() => deleteGalleryItem(img.id)}
                      className="absolute top-2 right-2 p-1.5 bg-rose-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: OFFICIAL DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                  OFFICIAL DOCUMENTS & BY-LAWS
                </h3>
                <p className="text-xs text-slate-400">
                  Upload and oversee PDF documents, constitutions, circulars, and downloadable application templates.
                </p>
              </div>

              <div className="space-y-3">
                {documents.map(d => (
                  <div key={d.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs text-amber-400">{d.documentNumber} ({d.category})</span>
                      <h4 className="font-bold text-white text-sm">{d.title}</h4>
                      <p className="text-xs text-slate-400">{d.fileName} • {d.fileSize}</p>
                    </div>
                    <button
                      onClick={() => deleteDocument(d.id)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: REPORTS & DATA EXPORT */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                  ADMINISTRATIVE AUDIT & EXPORT REPORTS
                </h3>
                <p className="text-xs text-slate-400">
                  Export verified rosters, match score summaries, and club registries to standard CSV/Excel format.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
                  <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
                  <h4 className="text-lg font-bold text-white">Player Registration Dossier</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Complete list of licensed cricketers with WCA IDs, contact records, clubs, and batting/bowling roles.
                  </p>
                  <button
                    onClick={() => handleExportCSV('players')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    Export Players CSV
                  </button>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
                  <FileSpreadsheet className="w-8 h-8 text-blue-400" />
                  <h4 className="text-lg font-bold text-white">Club Affiliation Roster</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Directory of registered cricket clubs, owners, managers, coaches, and assigned home venues.
                  </p>
                  <button
                    onClick={() => handleExportCSV('clubs')}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    Export Clubs CSV
                  </button>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
                  <FileSpreadsheet className="w-8 h-8 text-amber-400" />
                  <h4 className="text-lg font-bold text-white">Match & Tournament Log</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tournament fixtures, verified match results, and scorecard summaries across all age divisions.
                  </p>
                  <button
                    onClick={() => handleExportCSV('matches')}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    Export Matches CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-2xl font-black font-teko text-amber-400 text-3xl uppercase tracking-wide">
                  ASSOCIATION & WEBSITE CONFIGURATION
                </h3>
                <p className="text-xs text-slate-400">
                  Update association title, official headquarters contact details, notice tickers, and homepage texts.
                </p>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateSettings(settingsForm);
                }}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Association Official Name:
                  </label>
                  <input
                    type="text"
                    value={settingsForm.associationName}
                    onChange={e => setSettingsForm({ ...settingsForm, associationName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Announcement Ticker Line:
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.announcementTicker}
                    onChange={e => setSettingsForm({ ...settingsForm, announcementTicker: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Helpline Mobile:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.contactPhone}
                      onChange={e => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Official Email:
                    </label>
                    <input
                      type="email"
                      value={settingsForm.officialEmail}
                      onChange={e => setSettingsForm({ ...settingsForm, officialEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Headquarters Office Address:
                  </label>
                  <input
                    type="text"
                    value={settingsForm.officeAddress}
                    onChange={e => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow"
                  >
                    Save Website Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* DIGITAL ID CARD POPUP MODAL */}
      {selectedPlayerForCard && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 border-2 border-amber-500 max-w-md w-full relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedPlayerForCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <DigitalIdCard
              player={selectedPlayerForCard}
              onClose={() => setSelectedPlayerForCard(null)}
            />
          </div>
        </div>
      )}

      {/* CREATE TOURNAMENT MODAL */}
      {showNewTournamentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-xl w-full p-6 space-y-4 my-8">
            <h3 className="text-xl font-bold font-teko uppercase text-amber-400 text-2xl">
              SANCTION NEW CRICKET TOURNAMENT
            </h3>
            <form onSubmit={handleCreateTournament} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Tournament Name *</label>
                <input
                  type="text"
                  required
                  value={newTrnData.name}
                  onChange={e => setNewTrnData({ ...newTrnData, name: e.target.value })}
                  placeholder="e.g. WCA Summer Invitational Trophy 2026"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Category *</label>
                  <select
                    value={newTrnData.category}
                    onChange={e => setNewTrnData({ ...newTrnData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="District-Level Tournaments">District-Level Tournaments</option>
                    <option value="Under-19">Under-19</option>
                    <option value="Under-16">Under-16</option>
                    <option value="Under-14">Under-14</option>
                    <option value="Senior Category">Senior Category</option>
                    <option value="Open Category">Open Category</option>
                    <option value="Women's Cricket">Women's Cricket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Format *</label>
                  <select
                    value={newTrnData.format}
                    onChange={e => setNewTrnData({ ...newTrnData, format: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="T10">T10</option>
                    <option value="T20">T20</option>
                    <option value="30 Overs">30 Overs</option>
                    <option value="40 Overs">40 Overs</option>
                    <option value="50 Overs">50 Overs</option>
                    <option value="Test Format">Test Format</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newTrnData.description}
                  onChange={e => setNewTrnData({ ...newTrnData, description: e.target.value })}
                  placeholder="Tournament objective and rules overview..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTrnData.startDate}
                    onChange={e => setNewTrnData({ ...newTrnData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Venue</label>
                  <input
                    type="text"
                    value={newTrnData.venue}
                    onChange={e => setNewTrnData({ ...newTrnData, venue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTournamentModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase rounded-lg"
                >
                  Save Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE MATCH MODAL */}
      {showNewMatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-lg w-full p-6 space-y-4 my-8">
            <h3 className="text-xl font-bold font-teko uppercase text-amber-400 text-2xl">
              SCHEDULE MATCH FIXTURE
            </h3>
            <form onSubmit={handleCreateMatch} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Tournament *</label>
                <select
                  value={newMatchData.tournamentId}
                  onChange={e => setNewMatchData({ ...newMatchData, tournamentId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  {tournaments.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Team A *</label>
                  <select
                    value={newMatchData.teamAId}
                    onChange={e => setNewMatchData({ ...newMatchData, teamAId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    {clubs.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Team B *</label>
                  <select
                    value={newMatchData.teamBId}
                    onChange={e => setNewMatchData({ ...newMatchData, teamBId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    {clubs.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Match Date</label>
                  <input
                    type="date"
                    value={newMatchData.matchDate}
                    onChange={e => setNewMatchData({ ...newMatchData, matchDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Time</label>
                  <input
                    type="text"
                    value={newMatchData.matchTime}
                    onChange={e => setNewMatchData({ ...newMatchData, matchTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Ground / Pitch</label>
                <input
                  type="text"
                  value={newMatchData.venue}
                  onChange={e => setNewMatchData({ ...newMatchData, venue: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewMatchModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase rounded-lg"
                >
                  Schedule Fixture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
