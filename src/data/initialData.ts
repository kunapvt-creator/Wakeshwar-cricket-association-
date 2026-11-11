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
  WebsiteSettings 
} from '../types';

export const initialSettings: WebsiteSettings = {
  associationName: "Wakeshwar Cricket Association",
  shortName: "WCA",
  tagline: "Promoting Cricket, Developing Talent and Creating Opportunities",
  officeAddress: "WCA Sports Complex, Main Stadium Road, Wakeshwar, Maharashtra 413501",
  contactPhone: "+91 98230 45678",
  officialEmail: "office@wakeshwarcricket.org",
  announcementTicker: "WCA District Championship 2026 registration is now open! • U-19 Selection Trials scheduled for next weekend • Scorer & Umpire accreditation workshop on Nov 25th",
  heroHeading: "BUILDING THE FUTURE OF CRICKET",
  heroSubheading: "Promoting Cricket, Developing Talent and Creating Opportunities across Wakeshwar and surrounding regions.",
  facebookUrl: "https://facebook.com",
  twitterUrl: "https://twitter.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com"
};

export const initialPlayers: Player[] = [
  {
    id: "WCA-PL-2026-001",
    applicationId: "APP-WCA-1001",
    fullName: "Aarav Sharma",
    dateOfBirth: "2003-05-14",
    gender: "Male",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    mobileNumber: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    residentialAddress: "12 Shivneri Colony, Near Cricket Ground",
    district: "Wakeshwar Region",
    taluka: "Wakeshwar Central",
    village: "Wakeshwar",
    playingRole: "Batsman",
    battingStyle: "Right Hand",
    bowlingStyle: "Right Arm Medium",
    previousClub: "Wakeshwar Youth Academy",
    highestTournamentPlayed: "District Senior Invitational",
    currentClubId: "WCA-CL-001",
    currentClubName: "Wakeshwar Super Kings",
    idProofType: "Aadhaar Card",
    idProofNumber: "XXXX-XXXX-4589",
    status: "Approved",
    adminNotes: "Document verified during zonal registration camp. (DEMO DATA)",
    registeredDate: "2026-01-15",
    approvedDate: "2026-01-18",
    validUntil: "2027-12-31",
    stats: {
      matches: 18,
      innings: 18,
      runs: 742,
      highestScore: "114*",
      battingAverage: 46.38,
      strikeRate: 138.4,
      fifties: 5,
      hundreds: 2,
      wickets: 4,
      oversBowled: 16,
      bestBowling: "2/18",
      economyRate: 6.8,
      bowlingAverage: 27.2,
      fiveWicketHauls: 0,
      catches: 12,
      stumpings: 0
    }
  },
  {
    id: "WCA-PL-2026-002",
    applicationId: "APP-WCA-1002",
    fullName: "Rohan Deshmukh",
    dateOfBirth: "2002-09-22",
    gender: "Male",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    mobileNumber: "+91 98221 11223",
    email: "rohan.deshmukh@example.com",
    residentialAddress: "Plot 45, Greenfield Enclave",
    district: "Wakeshwar Region",
    taluka: "North Wakeshwar",
    village: "Ramnagar",
    playingRole: "Bowler",
    battingStyle: "Right Hand",
    bowlingStyle: "Right Arm Fast",
    previousClub: "Shivaji Cricket Club",
    highestTournamentPlayed: "State Zonal Trophy",
    currentClubId: "WCA-CL-002",
    currentClubName: "Shivaji Cricket Club",
    idProofType: "Aadhaar Card",
    idProofNumber: "XXXX-XXXX-8921",
    status: "Approved",
    adminNotes: "Pace bowler clearance approved. (DEMO DATA)",
    registeredDate: "2026-01-12",
    approvedDate: "2026-01-14",
    validUntil: "2027-12-31",
    stats: {
      matches: 22,
      innings: 14,
      runs: 165,
      highestScore: "34",
      battingAverage: 15.0,
      strikeRate: 112.2,
      fifties: 0,
      hundreds: 0,
      wickets: 38,
      oversBowled: 82.4,
      bestBowling: "5/19",
      economyRate: 5.65,
      bowlingAverage: 12.28,
      fiveWicketHauls: 2,
      catches: 8,
      stumpings: 0
    }
  },
  {
    id: "WCA-PL-2026-003",
    applicationId: "APP-WCA-1003",
    fullName: "Virendra Kulkarni",
    dateOfBirth: "2001-11-05",
    gender: "Male",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    mobileNumber: "+91 97665 99887",
    email: "viren.kulkarni@example.com",
    residentialAddress: "Station Road, Opp Municipal Garden",
    district: "Wakeshwar Region",
    taluka: "Wakeshwar Central",
    village: "Wakeshwar",
    playingRole: "All-rounder",
    battingStyle: "Left Hand",
    bowlingStyle: "Left Arm Orthodox",
    previousClub: "Maratha Warriors CC",
    highestTournamentPlayed: "Division A Inter-Club",
    currentClubId: "WCA-CL-003",
    currentClubName: "Maratha Warriors CC",
    idProofType: "Aadhaar Card",
    idProofNumber: "XXXX-XXXX-1123",
    status: "Approved",
    adminNotes: "All-rounder credentials verified. (DEMO DATA)",
    registeredDate: "2026-01-20",
    approvedDate: "2026-01-22",
    validUntil: "2027-12-31",
    stats: {
      matches: 24,
      innings: 22,
      runs: 620,
      highestScore: "88",
      battingAverage: 34.44,
      strikeRate: 132.8,
      fifties: 4,
      hundreds: 0,
      wickets: 29,
      oversBowled: 74,
      bestBowling: "4/22",
      economyRate: 6.1,
      bowlingAverage: 15.55,
      fiveWicketHauls: 0,
      catches: 15,
      stumpings: 0
    }
  },
  {
    id: "WCA-PL-2026-004",
    applicationId: "APP-WCA-1004",
    fullName: "Prateek Jadhav",
    dateOfBirth: "2004-03-19",
    gender: "Male",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    mobileNumber: "+91 98450 12345",
    email: "prateek.jadhav@example.com",
    residentialAddress: "Behind Shivaji Ground",
    district: "Wakeshwar Region",
    taluka: "South Wakeshwar",
    village: "Kasba",
    playingRole: "Wicketkeeper",
    battingStyle: "Right Hand",
    bowlingStyle: "None",
    previousClub: "Rising Stars Cricket Club",
    highestTournamentPlayed: "U-19 District Championship",
    currentClubId: "WCA-CL-004",
    currentClubName: "Rising Stars CC",
    idProofType: "Aadhaar Card",
    idProofNumber: "XXXX-XXXX-7788",
    status: "Approved",
    adminNotes: "Wicketkeeping trials qualified. (DEMO DATA)",
    registeredDate: "2026-01-25",
    approvedDate: "2026-01-28",
    validUntil: "2027-12-31",
    stats: {
      matches: 16,
      innings: 15,
      runs: 480,
      highestScore: "76*",
      battingAverage: 36.92,
      strikeRate: 128.0,
      fifties: 3,
      hundreds: 0,
      wickets: 0,
      oversBowled: 0,
      bestBowling: "-",
      economyRate: 0,
      bowlingAverage: 0,
      fiveWicketHauls: 0,
      catches: 19,
      stumpings: 8
    }
  },
  {
    id: "WCA-PL-2026-005",
    applicationId: "APP-WCA-1005",
    fullName: "Omkar Patil",
    dateOfBirth: "2005-08-11",
    gender: "Male",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    mobileNumber: "+91 94230 67890",
    email: "omkar.patil@example.com",
    residentialAddress: "Ganesh Nagar, Lane 3",
    district: "Wakeshwar Region",
    taluka: "Wakeshwar Rural",
    village: "Borgaon",
    playingRole: "Bowler",
    battingStyle: "Right Hand",
    bowlingStyle: "Right Arm Leg Spin",
    previousClub: "Wakeshwar Sports Club",
    highestTournamentPlayed: "U-19 Zonal Cup",
    currentClubId: "WCA-CL-001",
    currentClubName: "Wakeshwar Super Kings",
    idProofType: "Aadhaar Card",
    idProofNumber: "XXXX-XXXX-9900",
    status: "Pending",
    adminNotes: "Application received, pending physical document review. (DEMO DATA)",
    registeredDate: "2026-02-02",
    stats: {
      matches: 8,
      innings: 5,
      runs: 42,
      highestScore: "18",
      battingAverage: 10.5,
      strikeRate: 85.0,
      fifties: 0,
      hundreds: 0,
      wickets: 14,
      oversBowled: 28,
      bestBowling: "3/15",
      economyRate: 5.2,
      bowlingAverage: 10.4,
      fiveWicketHauls: 0,
      catches: 3,
      stumpings: 0
    }
  }
];

export const initialClubs: Club[] = [
  {
    id: "WCA-CL-001",
    name: "Wakeshwar Super Kings",
    logoUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80",
    address: "WCA Stadium Pavilion, Ground Floor",
    city: "Wakeshwar",
    district: "Wakeshwar District",
    ownerName: "Sunil Shinde",
    teamManager: "Rajesh Gaikwad",
    captainName: "Aarav Sharma",
    coachName: "Mahesh Bhosale (NIS Level 1)",
    contactNumber: "+91 98220 98220",
    email: "wsk@wakeshwarcricket.org",
    homeGround: "WCA Main Stadium",
    status: "Approved",
    registeredYear: "2024",
    playersCount: 16,
    trophiesWon: 2
  },
  {
    id: "WCA-CL-002",
    name: "Shivaji Cricket Club",
    logoUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=300&q=80",
    address: "Shivaji Nagar Ground, North Ward",
    city: "Wakeshwar",
    district: "Wakeshwar District",
    ownerName: "Dattatray Pawar",
    teamManager: "Vinod Jagtap",
    captainName: "Rohan Deshmukh",
    coachName: "Santosh Salunkhe",
    contactNumber: "+91 98221 44556",
    email: "contact@shivajicc.org",
    homeGround: "Shivaji Memorial Ground",
    status: "Approved",
    registeredYear: "2023",
    playersCount: 18,
    trophiesWon: 3
  },
  {
    id: "WCA-CL-003",
    name: "Maratha Warriors CC",
    logoUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=300&q=80",
    address: "Sports Complex, Ring Road",
    city: "Wakeshwar",
    district: "Wakeshwar District",
    ownerName: "Anil More",
    teamManager: "Sachin Kadam",
    captainName: "Virendra Kulkarni",
    coachName: "Pravin Ingle",
    contactNumber: "+91 98500 77112",
    email: "warriors@marathacc.in",
    homeGround: "Ring Road Gymkhana",
    status: "Approved",
    registeredYear: "2024",
    playersCount: 15,
    trophiesWon: 1
  },
  {
    id: "WCA-CL-004",
    name: "Rising Stars CC",
    logoUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=300&q=80",
    address: "East Suburb Academy, Near Lake",
    city: "Wakeshwar",
    district: "Wakeshwar District",
    ownerName: "Kishor Raut",
    teamManager: "Dipak Sawant",
    captainName: "Prateek Jadhav",
    coachName: "Rahul Chavan",
    contactNumber: "+91 94220 33441",
    email: "info@risingstarscc.com",
    homeGround: "Lakeview Ground",
    status: "Approved",
    registeredYear: "2025",
    playersCount: 14,
    trophiesWon: 0
  }
];

export const initialTournaments: Tournament[] = [
  {
    id: "WCA-TRN-2026-01",
    name: "WCA District Championship Trophy 2026",
    bannerUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=1200&q=80",
    category: "District-Level Tournaments",
    format: "T20",
    description: "The flagship annual T20 tournament organized by Wakeshwar Cricket Association featuring top affiliated clubs and teams.",
    registrationOpenDate: "2026-01-01",
    registrationCloseDate: "2026-01-20",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    venue: "WCA Main Stadium, Wakeshwar",
    entryFee: "₹5,000 per team",
    rules: [
      "Official ICC T20 standard rules apply with local WCA playing conditions.",
      "Squad must contain minimum 14 and maximum 18 registered WCA players.",
      "Matches played with approved white cricket balls and colored clothing.",
      "Powerplay rules: First 6 overs (max 2 fielders outside 30-yard circle)."
    ],
    participatingClubs: ["WCA-CL-001", "WCA-CL-002", "WCA-CL-003", "WCA-CL-004"],
    status: "Ongoing",
    pointsTable: [
      { clubId: "WCA-CL-001", clubName: "Wakeshwar Super Kings", played: 3, won: 2, lost: 1, tied: 0, noResult: 0, points: 4, nrr: +0.650 },
      { clubId: "WCA-CL-002", clubName: "Shivaji Cricket Club", played: 3, won: 2, lost: 1, tied: 0, noResult: 0, points: 4, nrr: +0.420 },
      { clubId: "WCA-CL-003", clubName: "Maratha Warriors CC", played: 3, won: 1, lost: 2, tied: 0, noResult: 0, points: 2, nrr: -0.210 },
      { clubId: "WCA-CL-004", clubName: "Rising Stars CC", played: 3, won: 1, lost: 2, tied: 0, noResult: 0, points: 2, nrr: -0.860 }
    ]
  },
  {
    id: "WCA-TRN-2026-02",
    name: "WCA Under-19 Youth Cup 2026",
    bannerUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    category: "Under-19",
    format: "50 Overs",
    description: "Grassroots development tournament to scout and prepare youth talent for regional and zonal representation.",
    registrationOpenDate: "2026-02-15",
    registrationCloseDate: "2026-03-05",
    startDate: "2026-03-12",
    endDate: "2026-03-25",
    venue: "Shivaji Memorial Ground & Lakeview Ground",
    entryFee: "₹2,500 per team",
    rules: [
      "Strict age verification via birth certificate and school records.",
      "Cut-off date: Born on or after September 1, 2007.",
      "Red leather four-piece ball, traditional whites."
    ],
    participatingClubs: ["WCA-CL-001", "WCA-CL-002", "WCA-CL-004"],
    status: "Upcoming",
    pointsTable: []
  }
];

export const initialMatches: Match[] = [
  {
    id: "WCA-M-2026-05",
    tournamentId: "WCA-TRN-2026-01",
    tournamentName: "WCA District Championship Trophy 2026",
    format: "T20",
    teamA: {
      id: "WCA-CL-001",
      name: "Wakeshwar Super Kings",
      shortName: "WSK",
      logoUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=100&q=80"
    },
    teamB: {
      id: "WCA-CL-002",
      name: "Shivaji Cricket Club",
      shortName: "SCC",
      logoUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=100&q=80"
    },
    venue: "WCA Main Stadium, Ground A",
    matchDate: "2026-02-18",
    matchTime: "14:30 IST",
    tossWinner: "Shivaji Cricket Club",
    tossDecision: "bat",
    status: "Live",
    currentInnings: 2,
    target: 168,
    requiredRunRate: 8.45,
    currentRunRate: 8.85,
    partnershipRuns: 42,
    partnershipBalls: 26,
    currentStriker: "Aarav Sharma",
    currentNonStriker: "Pooja/Kishan Verma",
    currentBowler: "Rohan Deshmukh",
    umpires: ["D. K. Satpute (State Accredited)", "M. V. Shinde (WCA Official)"],
    scorer: "K. R. Jagdale",
    innings1: {
      teamId: "WCA-CL-002",
      teamName: "Shivaji Cricket Club",
      totalRuns: 167,
      wickets: 7,
      overs: 20,
      maxOvers: 20,
      extras: { wides: 8, noBalls: 2, byes: 1, legByes: 3, penalty: 0, total: 14 },
      batting: [
        { playerId: "SCC-01", playerName: "Siddhesh Mane", howOut: "c Sharma b Jadhav", runs: 44, balls: 31, fours: 5, sixes: 2, strikeRate: 141.9 },
        { playerId: "SCC-02", playerName: "Tanmay Joshi", howOut: "b Patil", runs: 28, balls: 24, fours: 3, sixes: 0, strikeRate: 116.6 },
        { playerId: "SCC-03", playerName: "Rohan Deshmukh", howOut: "c & b Sharma", runs: 52, balls: 36, fours: 4, sixes: 3, strikeRate: 144.4 },
        { playerId: "SCC-04", playerName: "Akash Shinde", howOut: "not out", runs: 29, balls: 19, fours: 2, sixes: 1, strikeRate: 152.6 }
      ],
      bowling: [
        { playerId: "WCA-PL-2026-001", playerName: "Aarav Sharma", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.0 },
        { playerId: "WCA-PL-2026-005", playerName: "Omkar Patil", overs: 4, maidens: 0, runs: 28, wickets: 2, economy: 7.0 },
        { playerId: "WSK-03", playerName: "Ganesh More", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.5 }
      ],
      fallOfWickets: [
        { wicketNumber: 1, score: 54, over: 6.2, playerOut: "Tanmay Joshi" },
        { wicketNumber: 2, score: 88, over: 11.4, playerOut: "Siddhesh Mane" },
        { wicketNumber: 3, score: 145, over: 17.5, playerOut: "Rohan Deshmukh" }
      ]
    },
    innings2: {
      teamId: "WCA-CL-001",
      teamName: "Wakeshwar Super Kings",
      totalRuns: 118,
      wickets: 3,
      overs: 13.2,
      maxOvers: 20,
      extras: { wides: 5, noBalls: 1, byes: 0, legByes: 2, penalty: 0, total: 8 },
      batting: [
        { playerId: "WCA-PL-2026-001", playerName: "Aarav Sharma", howOut: "batting", runs: 64, balls: 41, fours: 7, sixes: 3, strikeRate: 156.1 },
        { playerId: "WSK-02", playerName: "Sameer Shaikh", howOut: "lbw b Deshmukh", runs: 18, balls: 16, fours: 2, sixes: 0, strikeRate: 112.5 },
        { playerId: "WSK-04", playerName: "Kishan Verma", howOut: "batting", runs: 28, balls: 23, fours: 3, sixes: 1, strikeRate: 121.7 }
      ],
      bowling: [
        { playerId: "WCA-PL-2026-002", playerName: "Rohan Deshmukh", overs: 3.2, maidens: 0, runs: 26, wickets: 2, economy: 7.8 },
        { playerId: "SCC-05", playerName: "Prakash Pawar", overs: 3, maidens: 0, runs: 31, wickets: 1, economy: 10.3 }
      ],
      fallOfWickets: [
        { wicketNumber: 1, score: 32, over: 3.5, playerOut: "Sameer Shaikh" },
        { wicketNumber: 2, score: 76, over: 8.1, playerOut: "Rahul Shinde" }
      ]
    },
    recentBalls: [
      { id: "b1", overNumber: 13, ballNumber: 1, bowlerName: "Rohan Deshmukh", strikerName: "Aarav Sharma", runsScored: 1, isWicket: false, commentary: "Pushed gently towards mid-off for a single.", timestamp: "16:15" },
      { id: "b2", overNumber: 13, ballNumber: 2, bowlerName: "Rohan Deshmukh", strikerName: "Kishan Verma", runsScored: 4, isWicket: false, commentary: "FOUR! Beautifully punched off the back foot through covers.", timestamp: "16:16" },
      { id: "b3", overNumber: 13, ballNumber: 3, bowlerName: "Rohan Deshmukh", strikerName: "Kishan Verma", runsScored: 1, isWicket: false, commentary: "Worked away past square leg for one.", timestamp: "16:17" },
      { id: "b4", overNumber: 13, ballNumber: 4, bowlerName: "Rohan Deshmukh", strikerName: "Aarav Sharma", runsScored: 6, isWicket: false, commentary: "SIX! Lofted cleanly over long-on! Magnificent hit by Sharma.", timestamp: "16:18" },
      { id: "b5", overNumber: 13, ballNumber: 5, bowlerName: "Rohan Deshmukh", strikerName: "Aarav Sharma", runsScored: 0, isWicket: false, commentary: "Full and straight, solidly defended back to bowler.", timestamp: "16:19" },
      { id: "b6", overNumber: 13, ballNumber: 6, bowlerName: "Rohan Deshmukh", strikerName: "Aarav Sharma", runsScored: 2, isWicket: false, commentary: "Driven wide of deep point, swift running yields two runs.", timestamp: "16:20" }
    ]
  },
  {
    id: "WCA-M-2026-06",
    tournamentId: "WCA-TRN-2026-01",
    tournamentName: "WCA District Championship Trophy 2026",
    format: "T20",
    teamA: {
      id: "WCA-CL-003",
      name: "Maratha Warriors CC",
      shortName: "MWC",
      logoUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=100&q=80"
    },
    teamB: {
      id: "WCA-CL-004",
      name: "Rising Stars CC",
      shortName: "RSC",
      logoUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=100&q=80"
    },
    venue: "Shivaji Memorial Ground, Pitch 2",
    matchDate: "2026-02-21",
    matchTime: "09:30 IST",
    status: "Scheduled",
    currentInnings: 1,
    umpires: ["A. S. Kazi", "B. V. Nimbalkar"],
    scorer: "M. T. Kulkarni"
  },
  {
    id: "WCA-M-2026-04",
    tournamentId: "WCA-TRN-2026-01",
    tournamentName: "WCA District Championship Trophy 2026",
    format: "T20",
    teamA: {
      id: "WCA-CL-001",
      name: "Wakeshwar Super Kings",
      shortName: "WSK",
      logoUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=100&q=80"
    },
    teamB: {
      id: "WCA-CL-003",
      name: "Maratha Warriors CC",
      shortName: "MWC",
      logoUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=100&q=80"
    },
    venue: "WCA Main Stadium",
    matchDate: "2026-02-14",
    matchTime: "10:00 IST",
    status: "Completed",
    currentInnings: 2,
    resultSummary: "Wakeshwar Super Kings won by 24 runs",
    playerOfTheMatch: "Aarav Sharma (78 runs & 2 catches)",
    umpires: ["D. K. Satpute", "P. G. Thorat"],
    scorer: "K. R. Jagdale",
    innings1: {
      teamId: "WCA-CL-001",
      teamName: "Wakeshwar Super Kings",
      totalRuns: 182,
      wickets: 4,
      overs: 20,
      maxOvers: 20,
      extras: { wides: 6, noBalls: 1, byes: 2, legByes: 2, penalty: 0, total: 11 },
      batting: [
        { playerId: "WCA-PL-2026-001", playerName: "Aarav Sharma", howOut: "c Kulkarni b More", runs: 78, balls: 51, fours: 8, sixes: 3, strikeRate: 152.9 },
        { playerId: "WSK-02", playerName: "Sameer Shaikh", howOut: "not out", runs: 56, balls: 42, fours: 5, sixes: 2, strikeRate: 133.3 }
      ],
      bowling: [
        { playerId: "WCA-PL-2026-003", playerName: "Virendra Kulkarni", overs: 4, maidens: 0, runs: 30, wickets: 1, economy: 7.5 }
      ],
      fallOfWickets: []
    },
    innings2: {
      teamId: "WCA-CL-003",
      teamName: "Maratha Warriors CC",
      totalRuns: 158,
      wickets: 8,
      overs: 20,
      maxOvers: 20,
      extras: { wides: 7, noBalls: 2, byes: 1, legByes: 1, penalty: 0, total: 11 },
      batting: [
        { playerId: "WCA-PL-2026-003", playerName: "Virendra Kulkarni", howOut: "b Patil", runs: 49, balls: 35, fours: 5, sixes: 1, strikeRate: 140.0 }
      ],
      bowling: [
        { playerId: "WCA-PL-2026-001", playerName: "Aarav Sharma", overs: 4, maidens: 0, runs: 24, wickets: 2, economy: 6.0 }
      ],
      fallOfWickets: []
    }
  }
];

export const initialCommittee: CommitteeMember[] = [
  {
    id: "COM-01",
    name: "Balasaheb K. Patil",
    designation: "President",
    committee: "Executive Committee",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    biography: "Distinguished sports administrator committed to modernizing grassroots cricket infrastructure and youth opportunities in Wakeshwar.",
    contactEmail: "president@wakeshwarcricket.org",
    order: 1
  },
  {
    id: "COM-02",
    name: "Suryakant R. Jagtap",
    designation: "Vice President",
    committee: "Executive Committee",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    biography: "Former district player and visionary leader driving inter-school and inter-taluka championship circuits.",
    contactEmail: "vp@wakeshwarcricket.org",
    order: 2
  },
  {
    id: "COM-03",
    name: "Adv. Chandrakant V. More",
    designation: "Honorary Secretary",
    committee: "Executive Committee",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    biography: "Oversees official administrative governance, constitution enforcement, affiliations, and legal integrity of the association.",
    contactEmail: "secretary@wakeshwarcricket.org",
    order: 3
  },
  {
    id: "COM-04",
    name: "Anand M. Shinde",
    designation: "Joint Secretary",
    committee: "Executive Committee",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    biography: "Responsible for field operations, ground maintenance coordination, and regional academy oversight.",
    contactEmail: "jointsec@wakeshwarcricket.org",
    order: 4
  },
  {
    id: "COM-05",
    name: "CA Rajesh D. Deshmukh",
    designation: "Treasurer",
    committee: "Executive Committee",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    biography: "Handles financial oversight, annual balance audits, tournament prize disbursements, and development grants.",
    contactEmail: "treasurer@wakeshwarcricket.org",
    order: 5
  },
  {
    id: "COM-06",
    name: "Pravin K. Bhosale",
    designation: "Chairman - Selection Committee",
    committee: "Selection Committee",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    biography: "Former Ranji Trophy probable; directs fair, merit-first selection protocols for U-16, U-19 and Senior district squads.",
    contactEmail: "selection@wakeshwarcricket.org",
    order: 6
  },
  {
    id: "COM-07",
    name: "Dilip S. Pawar",
    designation: "Convenor - Tournament Committee",
    committee: "Tournament Committee",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    biography: "Manages tournament fixtures, venue readiness, umpire assignments, and live scoring operations.",
    contactEmail: "tournaments@wakeshwarcricket.org",
    order: 7
  },
  {
    id: "COM-08",
    name: "Capt. Nitin Jadhav",
    designation: "Head - Technical & Umpires Committee",
    committee: "Technical Committee",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    biography: "Curates standard playing conditions, pitch inspection guidelines, and certified scorer/umpire refresher workshops.",
    contactEmail: "technical@wakeshwarcricket.org",
    order: 8
  }
];

export const initialNews: NewsArticle[] = [
  {
    id: "NEWS-2026-01",
    title: "WCA Announces District Championship 2026 Fixtures and Venues",
    category: "Tournament Announcements",
    publishedDate: "2026-02-05",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    summary: "The executive committee has officially published the match schedule for the prestigious WCA District Trophy 2026 across three premier cricket grounds.",
    content: "The Wakeshwar Cricket Association (WCA) has unveiled the complete schedule for the WCA District Championship Trophy 2026. A total of 12 registered clubs will compete across group stages, semi-finals, and the grand final at the WCA Main Stadium. All matches will adhere to official T20 rules with live digital scoring on the WCA web platform.\n\nAll participating clubs have been directed to ensure team squad submissions are finalized through the club management portal by Friday.",
    attachmentName: "WCA_Tournament_Schedule_2026.pdf",
    attachmentUrl: "#download-schedule",
    isPinned: true
  },
  {
    id: "NEWS-2026-02",
    title: "Open Trials for Under-19 District Cricket Squad on March 1st",
    category: "Trial Notifications",
    publishedDate: "2026-02-10",
    imageUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=800&q=80",
    summary: "WCA Selection Committee invites registered youth cricketers born on or after September 1, 2007 for the upcoming zonal representation trials.",
    content: "Talented young cricketers are invited to attend open selection trials at Shivaji Memorial Ground, Wakeshwar. Registered players must bring their digital WCA Player ID card, age verification certificate, and full white cricket kit.\n\nSelection will be overseen by former first-class cricketers and certified coaches.",
    attachmentName: "U19_Trial_Notice_and_Eligibility.pdf",
    attachmentUrl: "#download-u19-notice",
    isPinned: true
  },
  {
    id: "NEWS-2026-03",
    title: "Official Umpire and Digital Scorer Accreditation Clinic",
    category: "Association News",
    publishedDate: "2026-02-12",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    summary: "A two-day certified clinic for match officials and digital scorers will be hosted at the WCA Pavilion auditorium.",
    content: "To maintain the highest level of officiating in local and district cricket, WCA Technical Committee is conducting an intensive rulebook and ball-by-ball digital scoring workshop. Candidates passing the final evaluation will receive official WCA Match Official licenses.",
    attachmentName: "Scorers_Workshop_Registration.pdf",
    attachmentUrl: "#download-scorer-clinic"
  }
];

export const initialDocuments: OfficialDocument[] = [
  {
    id: "DOC-001",
    title: "Wakeshwar Cricket Association Constitution & Bylaws",
    category: "Constitution",
    documentNumber: "WCA/ADM/CONST/2024-v2",
    issueDate: "2024-04-10",
    fileSize: "1.4 MB",
    fileName: "WCA_Constitution_and_Bylaws.pdf",
    description: "Official foundational charter, governing objectives, membership regulations, and democratic electoral procedures of the Wakeshwar Cricket Association."
  },
  {
    id: "DOC-002",
    title: "Official Playing Conditions and Tournament Code of Conduct",
    category: "Rules & Regulations",
    documentNumber: "WCA/TECH/RULES/2026",
    issueDate: "2026-01-05",
    fileSize: "850 KB",
    fileName: "WCA_Playing_Conditions_2026.pdf",
    description: "Detailed match rules, penalty point allocations, anti-doping policies, and disciplinary codes governing all official WCA tournaments."
  },
  {
    id: "DOC-003",
    title: "Player Registration and Transfer Guidelines 2026-27",
    category: "Tournament Guidelines",
    documentNumber: "WCA/REG/GUIDELINES/26",
    issueDate: "2026-01-10",
    fileSize: "520 KB",
    fileName: "Player_Registration_Guidelines_WCA.pdf",
    description: "Eligibility criteria, residency norms, inter-club transfer windows, and digital ID card verification procedures."
  },
  {
    id: "DOC-004",
    title: "Club Affiliation and Renewal Application Form (Printable)",
    category: "Forms",
    documentNumber: "WCA/FORM/CLUB-2026",
    issueDate: "2026-01-02",
    fileSize: "340 KB",
    fileName: "WCA_Club_Affiliation_Form.pdf",
    description: "Physical application document for newly established cricket clubs seeking official affiliation with WCA."
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "GAL-01",
    title: "Inaugural Ceremony - District Championship 2026",
    category: "Tournament Events",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    date: "2026-02-01",
    description: "Opening match atmosphere with enthusiastic local crowd and dignitaries at WCA Main Stadium."
  },
  {
    id: "GAL-02",
    title: "Match Day Action: High-Flying Catch at Mid-wicket",
    category: "Cricket Matches",
    imageUrl: "https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=800&q=80",
    date: "2026-02-08",
    description: "Spectacular athleticism displayed during the match between WCA Super Kings and Maratha Warriors."
  },
  {
    id: "GAL-03",
    title: "Youth Summer Coaching Camp Felicitation",
    category: "Cricket Camps",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    date: "2025-05-28",
    description: "Young trainees presented with cricket equipment and participation certificates by the President."
  },
  {
    id: "GAL-04",
    title: "Annual Sports Awards Ceremony & Gala",
    category: "Award Functions",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    date: "2025-12-20",
    description: "Honoring the Best Batsman, Best Bowler, and Lifetime Cricket Achievement recipients."
  },
  {
    id: "GAL-05",
    title: "Championship Trophy Display & Team Captains Meet",
    category: "Trophy Ceremonies",
    imageUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80",
    date: "2026-01-28",
    description: "Official unveiling of the golden trophy by club captains prior to tournament commencement."
  },
  {
    id: "GAL-06",
    title: "Executive Committee Annual General Meeting",
    category: "Association Meetings",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    date: "2025-11-15",
    description: "Key resolutions passed regarding rural cricket grounds development and tournament expansion."
  }
];

export const initialOfficials: OfficialRegistration[] = [
  {
    id: "OFF-001",
    type: "Umpire",
    fullName: "D. K. Satpute",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    contactNumber: "+91 98221 00011",
    email: "satpute.umpire@example.com",
    experienceYears: 8,
    certification: "State Level Umpiring Panel B",
    matchesOfficiated: 142,
    status: "Approved",
    appliedDate: "2025-01-10"
  },
  {
    id: "OFF-002",
    type: "Scorer",
    fullName: "K. R. Jagdale",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    contactNumber: "+91 98221 00022",
    email: "jagdale.scorer@example.com",
    experienceYears: 5,
    certification: "Certified Digital & Manual Scorer Level 2",
    matchesOfficiated: 98,
    status: "Approved",
    appliedDate: "2025-02-14"
  }
];
