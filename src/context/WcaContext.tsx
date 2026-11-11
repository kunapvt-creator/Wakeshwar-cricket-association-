import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Player,
  Club,
  Tournament,
  Match,
  CommitteeMember,
  NewsArticle,
  OfficialDocument,
  GalleryItem,
  OfficialRegistration,
  WebsiteSettings,
  UserRole,
  ContactMessage,
  RegistrationStatus,
  BallRecord,
  InningsData
} from '../types';
import {
  initialPlayers,
  initialClubs,
  initialTournaments,
  initialMatches,
  initialCommittee,
  initialNews,
  initialDocuments,
  initialGallery,
  initialOfficials,
  initialSettings
} from '../data/initialData';

export interface UserSession {
  email: string;
  name: string;
  role: UserRole;
  playerId?: string;
  clubId?: string;
  isAuthenticated: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface WcaContextType {
  // State
  settings: WebsiteSettings;
  players: Player[];
  clubs: Club[];
  tournaments: Tournament[];
  matches: Match[];
  committee: CommitteeMember[];
  news: NewsArticle[];
  documents: OfficialDocument[];
  gallery: GalleryItem[];
  officials: OfficialRegistration[];
  contactMessages: ContactMessage[];
  currentRole: UserRole;
  userSession: UserSession;
  toasts: ToastMessage[];

  // Actions
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Auth
  loginAs: (role: UserRole, email?: string, name?: string) => void;
  logout: () => void;

  // Players
  registerPlayer: (playerData: Omit<Player, 'id' | 'applicationId' | 'status' | 'registeredDate' | 'stats'>) => { id: string; applicationId: string };
  updatePlayerStatus: (playerId: string, status: RegistrationStatus, adminNotes?: string) => void;
  updatePlayer: (playerId: string, updated: Partial<Player>) => void;
  deletePlayer: (playerId: string) => void;

  // Clubs
  registerClub: (clubData: Omit<Club, 'id' | 'status' | 'registeredYear' | 'playersCount'>) => { id: string };
  updateClubStatus: (clubId: string, status: RegistrationStatus) => void;
  updateClub: (clubId: string, updated: Partial<Club>) => void;
  deleteClub: (clubId: string) => void;

  // Tournaments
  createTournament: (trn: Omit<Tournament, 'id' | 'pointsTable'>) => string;
  updateTournament: (tournamentId: string, updated: Partial<Tournament>) => void;
  deleteTournament: (tournamentId: string) => void;

  // Matches & Live Scorer
  createMatch: (matchData: Omit<Match, 'id'>) => string;
  updateMatch: (matchId: string, updated: Partial<Match>) => void;
  deleteMatch: (matchId: string) => void;
  recordBallScore: (
    matchId: string,
    params: {
      runsScored: number;
      extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'none';
      extraRuns?: number;
      isWicket: boolean;
      wicketType?: string;
      strikerName: string;
      bowlerName: string;
      commentary?: string;
    }
  ) => void;
  undoLastBall: (matchId: string) => void;

  // Committee
  addCommitteeMember: (member: Omit<CommitteeMember, 'id'>) => void;
  updateCommitteeMember: (id: string, updated: Partial<CommitteeMember>) => void;
  deleteCommitteeMember: (id: string) => void;

  // News
  addNewsArticle: (newsItem: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  // Documents
  addDocument: (doc: Omit<OfficialDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Officials
  registerOfficial: (officialData: Omit<OfficialRegistration, 'id' | 'status' | 'appliedDate'>) => string;
  updateOfficialStatus: (id: string, status: RegistrationStatus) => void;

  // Contact
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => void;
  markMessageRead: (id: string) => void;

  // Reset to demo data
  resetAllToDefault: () => void;
}

const WcaContext = createContext<WcaContextType | undefined>(undefined);

export const WcaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or default
  const loadState = <T,>(key: string, defaultVal: T): T => {
    try {
      const stored = localStorage.getItem(`WCA_${key}`);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [settings, setSettings] = useState<WebsiteSettings>(() => loadState('settings', initialSettings));
  const [players, setPlayers] = useState<Player[]>(() => loadState('players', initialPlayers));
  const [clubs, setClubs] = useState<Club[]>(() => loadState('clubs', initialClubs));
  const [tournaments, setTournaments] = useState<Tournament[]>(() => loadState('tournaments', initialTournaments));
  const [matches, setMatches] = useState<Match[]>(() => loadState('matches', initialMatches));
  const [committee, setCommittee] = useState<CommitteeMember[]>(() => loadState('committee', initialCommittee));
  const [news, setNews] = useState<NewsArticle[]>(() => loadState('news', initialNews));
  const [documents, setDocuments] = useState<OfficialDocument[]>(() => loadState('documents', initialDocuments));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadState('gallery', initialGallery));
  const [officials, setOfficials] = useState<OfficialRegistration[]>(() => loadState('officials', initialOfficials));
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => loadState('messages', []));

  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [userSession, setUserSession] = useState<UserSession>({
    email: 'admin@wakeshwarcricket.org',
    name: 'WCA Administrator',
    role: 'Super Admin',
    isAuthenticated: true
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent sync
  useEffect(() => { localStorage.setItem('WCA_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('WCA_players', JSON.stringify(players)); }, [players]);
  useEffect(() => { localStorage.setItem('WCA_clubs', JSON.stringify(clubs)); }, [clubs]);
  useEffect(() => { localStorage.setItem('WCA_tournaments', JSON.stringify(tournaments)); }, [tournaments]);
  useEffect(() => { localStorage.setItem('WCA_matches', JSON.stringify(matches)); }, [matches]);
  useEffect(() => { localStorage.setItem('WCA_committee', JSON.stringify(committee)); }, [committee]);
  useEffect(() => { localStorage.setItem('WCA_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('WCA_documents', JSON.stringify(documents)); }, [documents]);
  useEffect(() => { localStorage.setItem('WCA_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('WCA_officials', JSON.stringify(officials)); }, [officials]);
  useEffect(() => { localStorage.setItem('WCA_messages', JSON.stringify(contactMessages)); }, [contactMessages]);

  const showToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('success', 'Settings Updated', 'Association website settings were successfully saved.');
  };

  const loginAs = (role: UserRole, email?: string, name?: string) => {
    setCurrentRole(role);
    setUserSession({
      email: email || `${role.toLowerCase().replace(/\s+/g, '.')}@wakeshwarcricket.org`,
      name: name || `Official ${role}`,
      role: role,
      isAuthenticated: true
    });
    showToast('info', 'Switched Role', `You are now logged in as ${role}.`);
  };

  const logout = () => {
    setUserSession({
      email: '',
      name: 'Guest User',
      role: 'Player',
      isAuthenticated: false
    });
    setCurrentRole('Player');
    showToast('info', 'Logged Out', 'You have been signed out from the administrative session.');
  };

  // Players
  const registerPlayer = (playerData: Omit<Player, 'id' | 'applicationId' | 'status' | 'registeredDate' | 'stats'>) => {
    const nextNum = players.length + 1;
    const padded = String(nextNum).padStart(3, '0');
    const id = `WCA-PL-2026-${padded}`;
    const applicationId = `APP-WCA-${1000 + nextNum}`;

    const newPlayer: Player = {
      ...playerData,
      id,
      applicationId,
      status: 'Pending',
      registeredDate: new Date().toISOString().split('T')[0],
      stats: {
        matches: 0,
        innings: 0,
        runs: 0,
        highestScore: '0',
        battingAverage: 0,
        strikeRate: 0,
        fifties: 0,
        hundreds: 0,
        wickets: 0,
        oversBowled: 0,
        bestBowling: '-',
        economyRate: 0,
        bowlingAverage: 0,
        fiveWicketHauls: 0,
        catches: 0,
        stumpings: 0
      }
    };

    setPlayers(prev => [newPlayer, ...prev]);
    showToast('success', 'Registration Submitted', `Application ID: ${applicationId}. Your WCA Player ID will be active upon approval.`);
    return { id, applicationId };
  };

  const updatePlayerStatus = (playerId: string, status: RegistrationStatus, adminNotes?: string) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return {
          ...p,
          status,
          adminNotes: adminNotes || p.adminNotes,
          approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : p.approvedDate,
          validUntil: status === 'Approved' ? '2027-12-31' : p.validUntil
        };
      }
      return p;
    }));
    showToast('success', 'Status Updated', `Player ${playerId} is now ${status}.`);
  };

  const updatePlayer = (playerId: string, updated: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, ...updated } : p));
    showToast('success', 'Profile Updated', `Updated details for ${playerId}`);
  };

  const deletePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    showToast('info', 'Player Removed', `Player record deleted.`);
  };

  // Clubs
  const registerClub = (clubData: Omit<Club, 'id' | 'status' | 'registeredYear' | 'playersCount'>) => {
    const nextNum = clubs.length + 1;
    const id = `WCA-CL-${String(nextNum).padStart(3, '0')}`;
    const newClub: Club = {
      ...clubData,
      id,
      status: 'Pending',
      registeredYear: new Date().getFullYear().toString(),
      playersCount: 0,
      trophiesWon: 0
    };
    setClubs(prev => [newClub, ...prev]);
    showToast('success', 'Club Registered', `Club registration submitted with ID ${id}. Verification pending.`);
    return { id };
  };

  const updateClubStatus = (clubId: string, status: RegistrationStatus) => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, status } : c));
    showToast('success', 'Club Status Updated', `Club status updated to ${status}.`);
  };

  const updateClub = (clubId: string, updated: Partial<Club>) => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, ...updated } : c));
    showToast('success', 'Club Updated', `Updated club information.`);
  };

  const deleteClub = (clubId: string) => {
    setClubs(prev => prev.filter(c => c.id !== clubId));
    showToast('info', 'Club Removed', `Club record deleted.`);
  };

  // Tournaments
  const createTournament = (trn: Omit<Tournament, 'id' | 'pointsTable'>) => {
    const id = `WCA-TRN-${new Date().getFullYear()}-${String(tournaments.length + 1).padStart(2, '0')}`;
    const newTrn: Tournament = {
      ...trn,
      id,
      pointsTable: trn.participatingClubs.map(cId => {
        const club = clubs.find(c => c.id === cId);
        return {
          clubId: cId,
          clubName: club?.name || 'Club Team',
          played: 0,
          won: 0,
          lost: 0,
          tied: 0,
          noResult: 0,
          points: 0,
          nrr: 0
        };
      })
    };
    setTournaments(prev => [newTrn, ...prev]);
    showToast('success', 'Tournament Created', `Created tournament ${trn.name}`);
    return id;
  };

  const updateTournament = (tournamentId: string, updated: Partial<Tournament>) => {
    setTournaments(prev => prev.map(t => t.id === tournamentId ? { ...t, ...updated } : t));
    showToast('success', 'Tournament Updated', 'Tournament updated successfully.');
  };

  const deleteTournament = (tournamentId: string) => {
    setTournaments(prev => prev.filter(t => t.id !== tournamentId));
    showToast('info', 'Tournament Deleted', 'Tournament removed.');
  };

  // Matches & Live Scorer
  const createMatch = (matchData: Omit<Match, 'id'>) => {
    const id = `WCA-M-2026-${String(matches.length + 1).padStart(2, '0')}`;
    const newMatch: Match = {
      ...matchData,
      id
    };
    setMatches(prev => [newMatch, ...prev]);
    showToast('success', 'Match Scheduled', `Fixture created: ${matchData.teamA.shortName} vs ${matchData.teamB.shortName}`);
    return id;
  };

  const updateMatch = (matchId: string, updated: Partial<Match>) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, ...updated } : m));
  };

  const deleteMatch = (matchId: string) => {
    setMatches(prev => prev.filter(m => m.id !== matchId));
    showToast('info', 'Match Removed', 'Fixture removed.');
  };

  // Interactive Live Scoring
  const recordBallScore = (
    matchId: string,
    params: {
      runsScored: number;
      extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'none';
      extraRuns?: number;
      isWicket: boolean;
      wicketType?: string;
      strikerName: string;
      bowlerName: string;
      commentary?: string;
    }
  ) => {
    setMatches(prev => prev.map(match => {
      if (match.id !== matchId) return match;

      const activeInningsKey = match.currentInnings === 1 ? 'innings1' : 'innings2';
      const inn = match[activeInningsKey];
      if (!inn) return match;

      const extraType = params.extraType || 'none';
      const extraRuns = params.extraRuns || 0;
      const isLegalBall = extraType !== 'wide' && extraType !== 'no-ball';

      // Runs calculation
      const runsFromBat = (extraType === 'wide' || extraType === 'no-ball') ? 0 : params.runsScored;
      const totalBallRuns = params.runsScored + extraRuns + (extraType === 'wide' || extraType === 'no-ball' ? 1 : 0);

      const newTotalRuns = inn.totalRuns + totalBallRuns;
      const newWickets = params.isWicket ? inn.wickets + 1 : inn.wickets;

      // Overs calculation
      let currentOvers = inn.overs;
      let completedOvers = Math.floor(currentOvers);
      let ballsInOver = Math.round((currentOvers - completedOvers) * 10);

      if (isLegalBall) {
        ballsInOver += 1;
        if (ballsInOver >= 6) {
          completedOvers += 1;
          ballsInOver = 0;
        }
      }
      const newOvers = completedOvers + ballsInOver / 10;

      // Update batting scorecard
      let batting = [...inn.batting];
      let striker = batting.find(b => b.playerName.toLowerCase() === params.strikerName.toLowerCase());
      if (!striker) {
        striker = {
          playerId: `P-${Date.now()}`,
          playerName: params.strikerName,
          howOut: 'batting',
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0
        };
        batting.push(striker);
      }

      if (params.isWicket) {
        striker.howOut = params.wicketType ? `${params.wicketType} b ${params.bowlerName}` : `b ${params.bowlerName}`;
      }
      striker.runs += runsFromBat;
      if (isLegalBall) striker.balls += 1;
      if (runsFromBat === 4) striker.fours += 1;
      if (runsFromBat === 6) striker.sixes += 1;
      striker.strikeRate = striker.balls > 0 ? Number(((striker.runs / striker.balls) * 100).toFixed(1)) : 0;

      // Update bowling scorecard
      let bowling = [...inn.bowling];
      let bowler = bowling.find(b => b.playerName.toLowerCase() === params.bowlerName.toLowerCase());
      if (!bowler) {
        bowler = {
          playerId: `B-${Date.now()}`,
          playerName: params.bowlerName,
          overs: 0,
          maidens: 0,
          runs: 0,
          wickets: 0,
          economy: 0
        };
        bowling.push(bowler);
      }
      bowler.runs += totalBallRuns;
      if (params.isWicket && params.wicketType !== 'run out') {
        bowler.wickets += 1;
      }
      if (isLegalBall) {
        let bOvers = Math.floor(bowler.overs);
        let bBalls = Math.round((bowler.overs - bOvers) * 10) + 1;
        if (bBalls >= 6) {
          bOvers += 1;
          bBalls = 0;
        }
        bowler.overs = bOvers + bBalls / 10;
      }
      const totalBowlerBalls = Math.floor(bowler.overs) * 6 + Math.round((bowler.overs - Math.floor(bowler.overs)) * 10);
      bowler.economy = totalBowlerBalls > 0 ? Number(((bowler.runs / totalBowlerBalls) * 6).toFixed(2)) : 0;

      // Extras breakdown
      const extras = { ...inn.extras };
      if (extraType === 'wide') extras.wides += (1 + extraRuns);
      else if (extraType === 'no-ball') extras.noBalls += (1 + extraRuns);
      else if (extraType === 'bye') extras.byes += extraRuns;
      else if (extraType === 'leg-bye') extras.legByes += extraRuns;
      extras.total = extras.wides + extras.noBalls + extras.byes + extras.legByes;

      // Fall of wicket
      const fallOfWickets = [...inn.fallOfWickets];
      if (params.isWicket) {
        fallOfWickets.push({
          wicketNumber: newWickets,
          score: newTotalRuns,
          over: newOvers,
          playerOut: params.strikerName
        });
      }

      // Ball record
      const ballRecord: BallRecord = {
        id: `ball-${Date.now()}`,
        overNumber: completedOvers,
        ballNumber: ballsInOver === 0 ? 6 : ballsInOver,
        bowlerName: params.bowlerName,
        strikerName: params.strikerName,
        runsScored: totalBallRuns,
        extraType,
        extraRuns,
        isWicket: params.isWicket,
        wicketType: params.wicketType,
        commentary: params.commentary || `${params.bowlerName} to ${params.strikerName}, ${params.isWicket ? 'WICKET!' : totalBallRuns + ' runs'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedInnings: InningsData = {
        ...inn,
        totalRuns: newTotalRuns,
        wickets: newWickets,
        overs: newOvers,
        extras,
        batting,
        bowling,
        fallOfWickets
      };

      // Check match status / result
      let newStatus = match.status;
      let resultSummary = match.resultSummary;

      // Target chase check in 2nd innings
      if (match.currentInnings === 2 && match.target) {
        if (newTotalRuns >= match.target) {
          newStatus = 'Completed';
          resultSummary = `${match.teamB.name} won by ${10 - newWickets} wickets`;
        } else if (newWickets >= 10 || (completedOvers >= inn.maxOvers && ballsInOver === 0)) {
          newStatus = 'Completed';
          const margin = match.target - 1 - newTotalRuns;
          if (margin > 0) {
            resultSummary = `${match.teamA.name} won by ${margin} runs`;
          } else {
            resultSummary = 'Match Tied!';
          }
        }
      }

      const totalLegalBalls = completedOvers * 6 + ballsInOver;
      const currentRunRate = totalLegalBalls > 0 ? Number(((newTotalRuns / totalLegalBalls) * 6).toFixed(2)) : 0;
      let requiredRunRate = match.requiredRunRate;
      if (match.currentInnings === 2 && match.target && newStatus === 'Live') {
        const ballsRemaining = (inn.maxOvers * 6) - totalLegalBalls;
        const runsNeeded = match.target - newTotalRuns;
        requiredRunRate = ballsRemaining > 0 ? Number(((runsNeeded / ballsRemaining) * 6).toFixed(2)) : 0;
      }

      return {
        ...match,
        status: newStatus,
        resultSummary,
        currentRunRate,
        requiredRunRate,
        partnershipRuns: (match.partnershipRuns || 0) + totalBallRuns,
        partnershipBalls: (match.partnershipBalls || 0) + (isLegalBall ? 1 : 0),
        [activeInningsKey]: updatedInnings,
        recentBalls: [ballRecord, ...(match.recentBalls || []).slice(0, 19)]
      };
    }));
  };

  const undoLastBall = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId || !m.recentBalls || m.recentBalls.length === 0) return m;
      const [lastBall, ...restBalls] = m.recentBalls;
      const activeInningsKey = m.currentInnings === 1 ? 'innings1' : 'innings2';
      const inn = m[activeInningsKey];
      if (!inn) return m;

      // Reverse runs and wickets
      const newTotal = Math.max(0, inn.totalRuns - lastBall.runsScored);
      const newWickets = lastBall.isWicket ? Math.max(0, inn.wickets - 1) : inn.wickets;

      return {
        ...m,
        recentBalls: restBalls,
        [activeInningsKey]: {
          ...inn,
          totalRuns: newTotal,
          wickets: newWickets
        }
      };
    }));
    showToast('info', 'Score Undone', 'Reverted last recorded ball.');
  };

  // Committee
  const addCommitteeMember = (member: Omit<CommitteeMember, 'id'>) => {
    const id = `COM-${Date.now()}`;
    setCommittee(prev => [...prev, { ...member, id }]);
    showToast('success', 'Committee Member Added', `${member.name} designated as ${member.designation}`);
  };

  const updateCommitteeMember = (id: string, updated: Partial<CommitteeMember>) => {
    setCommittee(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    showToast('success', 'Member Updated', 'Updated committee member.');
  };

  const deleteCommitteeMember = (id: string) => {
    setCommittee(prev => prev.filter(c => c.id !== id));
    showToast('info', 'Member Removed', 'Committee member removed.');
  };

  // News
  const addNewsArticle = (newsItem: Omit<NewsArticle, 'id'>) => {
    const id = `NEWS-${Date.now()}`;
    setNews(prev => [{ ...newsItem, id }, ...prev]);
    showToast('success', 'Article Published', newsItem.title);
  };

  const updateNewsArticle = (id: string, updated: Partial<NewsArticle>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updated } : n));
    showToast('success', 'Article Updated', 'Saved article updates.');
  };

  const deleteNewsArticle = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    showToast('info', 'Article Deleted', 'News item removed.');
  };

  // Documents
  const addDocument = (doc: Omit<OfficialDocument, 'id'>) => {
    const id = `DOC-${Date.now()}`;
    setDocuments(prev => [{ ...doc, id }, ...prev]);
    showToast('success', 'Document Published', doc.title);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('info', 'Document Removed', 'Document deleted.');
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const id = `GAL-${Date.now()}`;
    setGallery(prev => [{ ...item, id }, ...prev]);
    showToast('success', 'Photo Added', item.title);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast('info', 'Photo Removed', 'Gallery item removed.');
  };

  // Officials
  const registerOfficial = (officialData: Omit<OfficialRegistration, 'id' | 'status' | 'appliedDate'>) => {
    const id = `OFF-${Date.now()}`;
    const newOfficial: OfficialRegistration = {
      ...officialData,
      id,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setOfficials(prev => [newOfficial, ...prev]);
    showToast('success', 'Registration Submitted', `${officialData.type} application submitted successfully.`);
    return id;
  };

  const updateOfficialStatus = (id: string, status: RegistrationStatus) => {
    setOfficials(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast('success', 'Official Status Updated', `Status changed to ${status}`);
  };

  // Contact
  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => {
    const id = `MSG-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msg,
      id,
      submittedAt: new Date().toLocaleString(),
      read: false
    };
    setContactMessages(prev => [newMsg, ...prev]);
    showToast('success', 'Message Sent', 'Thank you! WCA Administration has received your inquiry.');
  };

  const markMessageRead = (id: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  // Reset demo
  const resetAllToDefault = () => {
    setSettings(initialSettings);
    setPlayers(initialPlayers);
    setClubs(initialClubs);
    setTournaments(initialTournaments);
    setMatches(initialMatches);
    setCommittee(initialCommittee);
    setNews(initialNews);
    setDocuments(initialDocuments);
    setGallery(initialGallery);
    setOfficials(initialOfficials);
    setContactMessages([]);
    localStorage.clear();
    showToast('info', 'Data Reset', 'All demo records restored to pristine initial state.');
  };

  return (
    <WcaContext.Provider
      value={{
        settings,
        players,
        clubs,
        tournaments,
        matches,
        committee,
        news,
        documents,
        gallery,
        officials,
        contactMessages,
        currentRole,
        userSession,
        toasts,
        updateSettings,
        showToast,
        removeToast,
        loginAs,
        logout,
        registerPlayer,
        updatePlayerStatus,
        updatePlayer,
        deletePlayer,
        registerClub,
        updateClubStatus,
        updateClub,
        deleteClub,
        createTournament,
        updateTournament,
        deleteTournament,
        createMatch,
        updateMatch,
        deleteMatch,
        recordBallScore,
        undoLastBall,
        addCommitteeMember,
        updateCommitteeMember,
        deleteCommitteeMember,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        addDocument,
        deleteDocument,
        addGalleryItem,
        deleteGalleryItem,
        registerOfficial,
        updateOfficialStatus,
        submitContactMessage,
        markMessageRead,
        resetAllToDefault
      }}
    >
      {children}
    </WcaContext.Provider>
  );
};

export const useWca = () => {
  const context = useContext(WcaContext);
  if (!context) {
    throw new Error('useWca must be used within a WcaProvider');
  }
  return context;
};
