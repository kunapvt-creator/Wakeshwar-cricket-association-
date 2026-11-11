export type PlayerRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
export type BattingStyle = 'Right Hand' | 'Left Hand';
export type BowlingStyle = 
  | 'Right Arm Fast'
  | 'Right Arm Medium'
  | 'Right Arm Off Spin'
  | 'Right Arm Leg Spin'
  | 'Left Arm Fast'
  | 'Left Arm Medium'
  | 'Left Arm Orthodox'
  | 'Left Arm Chinaman'
  | 'None';

export type RegistrationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected';

export interface Player {
  id: string; // e.g. "WCA-PL-2026-001"
  applicationId: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  photoUrl: string;
  mobileNumber: string;
  email: string;
  residentialAddress: string;
  district: string;
  taluka: string;
  village: string;
  playingRole: PlayerRole;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  previousClub: string;
  highestTournamentPlayed: string;
  currentClubId?: string;
  currentClubName?: string;
  idProofType?: string;
  idProofNumber?: string;
  status: RegistrationStatus;
  adminNotes?: string;
  registeredDate: string;
  approvedDate?: string;
  validUntil?: string;
  stats: {
    matches: number;
    innings: number;
    runs: number;
    highestScore: string;
    battingAverage: number;
    strikeRate: number;
    fifties: number;
    hundreds: number;
    wickets: number;
    oversBowled: number;
    bestBowling: string;
    economyRate: number;
    bowlingAverage: number;
    fiveWicketHauls: number;
    catches: number;
    stumpings: number;
  };
}

export interface Club {
  id: string; // e.g. "WCA-CL-001"
  name: string;
  logoUrl: string;
  address: string;
  city: string;
  district: string;
  ownerName: string;
  teamManager: string;
  captainName: string;
  coachName: string;
  contactNumber: string;
  email: string;
  homeGround: string;
  status: RegistrationStatus;
  registeredYear: string;
  playersCount: number;
  playersList?: string[]; // Player IDs
  trophiesWon?: number;
}

export type TournamentCategory = 
  | 'Local Cricket Tournaments'
  | 'District-Level Tournaments'
  | 'Under-14'
  | 'Under-16'
  | 'Under-19'
  | 'Senior Category'
  | 'Open Category'
  | "Women's Cricket";

export type MatchFormat = 'T10' | 'T20' | '30 Overs' | '40 Overs' | '50 Overs' | 'Test Format';

export interface Tournament {
  id: string;
  name: string;
  bannerUrl: string;
  category: TournamentCategory;
  format: MatchFormat;
  description: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  startDate: string;
  endDate: string;
  venue: string;
  entryFee: string;
  rules: string[];
  participatingClubs: string[]; // Club IDs
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  winnerClubId?: string;
  runnerUpClubId?: string;
  playerOfTournament?: string;
  pointsTable: TournamentPoint[];
}

export interface TournamentPoint {
  clubId: string;
  clubName: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  nrr: number; // Net Run Rate
}

export interface BatsmanScorecard {
  playerId: string;
  playerName: string;
  howOut: string; // "b Patel", "c & b Sharma", "not out", "run out"
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

export interface BowlerScorecard {
  playerId: string;
  playerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface FallOfWicket {
  wicketNumber: number;
  score: number;
  over: number;
  playerOut: string;
}

export interface InningsData {
  teamId: string;
  teamName: string;
  totalRuns: number;
  wickets: number;
  overs: number;
  maxOvers: number;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    penalty: number;
    total: number;
  };
  batting: BatsmanScorecard[];
  bowling: BowlerScorecard[];
  fallOfWickets: FallOfWicket[];
}

export interface BallRecord {
  id: string;
  overNumber: number;
  ballNumber: number;
  bowlerName: string;
  strikerName: string;
  runsScored: number;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'none';
  extraRuns?: number;
  isWicket: boolean;
  wicketType?: string;
  commentary: string;
  timestamp: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  format: MatchFormat;
  teamA: {
    id: string;
    name: string;
    shortName: string;
    logoUrl: string;
  };
  teamB: {
    id: string;
    name: string;
    shortName: string;
    logoUrl: string;
  };
  venue: string;
  matchDate: string;
  matchTime: string;
  tossWinner?: string;
  tossDecision?: 'bat' | 'bowl';
  status: 'Scheduled' | 'Live' | 'Innings Break' | 'Completed' | 'Abandoned';
  currentInnings: 1 | 2;
  innings1?: InningsData;
  innings2?: InningsData;
  target?: number;
  requiredRunRate?: number;
  currentRunRate?: number;
  partnershipRuns?: number;
  partnershipBalls?: number;
  currentStriker?: string;
  currentNonStriker?: string;
  currentBowler?: string;
  resultSummary?: string;
  playerOfTheMatch?: string;
  umpires: string[];
  scorer: string;
  recentBalls?: BallRecord[];
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  committee: 'Executive Committee' | 'Selection Committee' | 'Tournament Committee' | 'Technical Committee';
  photoUrl: string;
  biography: string;
  contactEmail?: string;
  order: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 
    | 'Association News'
    | 'Tournament Announcements'
    | 'Player Selection'
    | 'Trial Notifications'
    | 'Team Announcements'
    | 'Match Results'
    | 'Important Circulars'
    | 'Cricket Camps'
    | 'Official Events';
  publishedDate: string;
  imageUrl: string;
  summary: string;
  content: string;
  attachmentName?: string;
  attachmentUrl?: string;
  isPinned?: boolean;
}

export interface OfficialDocument {
  id: string;
  title: string;
  category: 'Constitution' | 'Rules & Regulations' | 'Tournament Guidelines' | 'Forms' | 'Circulars' | 'Trial Notices';
  documentNumber: string;
  issueDate: string;
  fileSize: string;
  fileName: string;
  downloadUrl?: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cricket Matches' | 'Tournament Events' | 'Trophy Ceremonies' | 'Award Functions' | 'Cricket Camps' | 'Association Meetings';
  imageUrl: string;
  date: string;
  description: string;
}

export interface OfficialRegistration {
  id: string;
  type: 'Umpire' | 'Scorer';
  fullName: string;
  photoUrl: string;
  contactNumber: string;
  email: string;
  experienceYears: number;
  certification: string;
  matchesOfficiated: number;
  status: RegistrationStatus;
  appliedDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export type UserRole = 
  | 'Super Admin'
  | 'Association Admin'
  | 'Tournament Manager'
  | 'Official Scorer'
  | 'Club Manager'
  | 'Player';

export interface WebsiteSettings {
  associationName: string;
  shortName: string;
  tagline: string;
  officeAddress: string;
  contactPhone: string;
  officialEmail: string;
  announcementTicker: string;
  heroHeading: string;
  heroSubheading: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}
