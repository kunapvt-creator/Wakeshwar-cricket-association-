import React from 'react';
import { useWca } from '../../context/WcaContext';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Award, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Activity,
  UserPlus,
  Play
} from 'lucide-react';
import { WcaLogo } from '../common/WcaLogo';

interface HomePageProps {
  onSelectTab: (tab: string) => void;
  onOpenPlayerRegister: () => void;
  onOpenClubRegister: () => void;
  onViewPlayer: (playerId: string) => void;
  onSelectNews: (newsId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenPlayerRegister,
  onOpenClubRegister,
  onViewPlayer,
  onSelectNews
}) => {
  const { settings, matches, players, clubs, tournaments, news, gallery } = useWca();

  const liveMatch = matches.find(m => m.status === 'Live');
  const recentCompleted = matches.filter(m => m.status === 'Completed').slice(0, 2);
  const upcomingFixtures = matches.filter(m => m.status === 'Scheduled').slice(0, 3);
  const featuredPlayers = players.filter(p => p.status === 'Approved').slice(0, 4);
  const latestNews = news.slice(0, 3);
  const galleryPreview = gallery.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        {/* Stadium Background with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=2000&q=85')`
          }}
        />
        {/* Layered gradients for legibility and rich atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#0B1E38]/85 to-[#071326]/90" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#071326]/40 to-[#071326]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-6 animate-in fade-in slide-in-from-top-4">
            <WcaLogo size="sm" variant="icon" />
            <span>OFFICIAL CRICKET GOVERNING & ORGANIZING ASSOCIATION</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-teko uppercase leading-none drop-shadow-xl">
            {settings.heroHeading}
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
            {settings.heroSubheading}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectTab('tournaments')}
              className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              Explore Tournaments
            </button>

            <button
              onClick={onOpenPlayerRegister}
              className="px-7 py-3.5 bg-[#0B1E38]/90 hover:bg-[#0B1E38] text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-amber-400/50 hover:border-amber-400 shadow-lg backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              Register as Player
            </button>

            <button
              onClick={() => onSelectTab('matches')}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              Match Centre
            </button>
          </div>

          {/* Live Match Mini Banner if match is active */}
          {liveMatch && (
            <div 
              onClick={() => onSelectTab('matches')}
              className="mt-10 max-w-xl mx-auto p-3.5 bg-slate-900/90 hover:bg-slate-900 border border-amber-500/50 rounded-2xl cursor-pointer backdrop-blur-md shadow-2xl transition-all transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-red-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  LIVE NOW: {liveMatch.tournamentName}
                </span>
                <span className="text-amber-400 font-bold text-[11px] underline">
                  View Ball-by-Ball →
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between font-bold text-sm sm:text-base">
                <span>{liveMatch.teamA.shortName}</span>
                <span className="text-amber-300 font-mono">
                  {liveMatch.innings2 
                    ? `${liveMatch.innings2.totalRuns}/${liveMatch.innings2.wickets} (${liveMatch.innings2.overs} ov)` 
                    : `${liveMatch.innings1?.totalRuns}/${liveMatch.innings1?.wickets}`}
                </span>
                <span>vs</span>
                <span>{liveMatch.teamB.shortName}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. STATS & REPUTATION COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="text-3xl sm:text-4xl font-black text-blue-950 font-teko">
              {players.filter(p => p.status === 'Approved').length}+
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Licensed Cricketers
            </p>
          </div>
          <div className="p-3 border-l border-slate-100">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 font-teko">
              {clubs.length}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Affiliated Clubs
            </p>
          </div>
          <div className="p-3 border-l border-slate-100">
            <div className="text-3xl sm:text-4xl font-black text-blue-950 font-teko">
              {tournaments.length}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sanctioned Tournaments
            </p>
          </div>
          <div className="p-3 border-l border-slate-100">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-teko">
              100%
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Digital Verified Scoring
            </p>
          </div>
        </div>
      </section>

      {/* 3. MATCH UPDATES: LIVE & UPCOMING FIXTURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Tournaments & Action
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-teko">
              MATCH FIXTURES & LIVE RESULTS
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('matches')}
            className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
          >
            All Scorecards <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.slice(0, 3).map(m => (
            <div
              key={m.id}
              onClick={() => onSelectTab('matches')}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-3">
                  <span>{m.format} • {m.tournamentName}</span>
                  {m.status === 'Live' ? (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] animate-pulse">
                      LIVE
                    </span>
                  ) : m.status === 'Completed' ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      FINAL
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                      SCHEDULED
                    </span>
                  )}
                </div>

                {/* Team 1 */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2.5">
                    <img src={m.teamA.logoUrl} alt="" className="w-7 h-7 rounded-full object-cover border" />
                    <span className="font-bold text-sm text-slate-900">{m.teamA.name}</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-slate-800">
                    {m.innings1 ? `${m.innings1.totalRuns}/${m.innings1.wickets}` : '-'}
                  </span>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2.5">
                    <img src={m.teamB.logoUrl} alt="" className="w-7 h-7 rounded-full object-cover border" />
                    <span className="font-bold text-sm text-slate-900">{m.teamB.name}</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-slate-800">
                    {m.innings2 ? `${m.innings2.totalRuns}/${m.innings2.wickets}` : '-'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t text-xs text-slate-500 flex items-center justify-between">
                <span className="truncate">{m.venue}</span>
                <span className="font-semibold text-amber-600">Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT WCA INTRO SECTION */}
      <section className="bg-[#0B1E38] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                GOVERNING BODY FOR CRICKET
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-teko leading-tight">
                FOSTERING EXCELLENCE FROM GRASSROOTS TO STATE CRICKET
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The Wakeshwar Cricket Association (WCA) serves as the primary organizing body dedicated to scouting, 
                training, and providing competitive platforms for young cricketers across Wakeshwar and nearby talukas. 
                With strict adherence to official playing standards, verified digital licensing, and certified match officials, 
                WCA paves a clear, merit-first pathway for future cricket champions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Tiered Tournaments</h4>
                    <p className="text-xs text-slate-400">Structured age-group (U-14, U-16, U-19) and senior division leagues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Digital Biometric Cards</h4>
                    <p className="text-xs text-slate-400">QR-code verifiable digital player cards eliminating age fraud.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onSelectTab('about')}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
                >
                  Read About WCA Constitution & Vision →
                </button>
              </div>
            </div>

            {/* Stadium / Match Highlight Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=800&q=80"
                  alt="WCA Cricket Stadium"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                    WCA Main Pavilion
                  </span>
                  <h4 className="text-lg font-bold mt-1 font-teko text-xl">
                    Main Turf Cricket Ground, Wakeshwar
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PLAYERS DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Talent Spotlight
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-teko">
              FEATURED WCA REGISTERED PLAYERS
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('players')}
            className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
          >
            Full Players Directory ({players.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map(p => (
            <div
              key={p.id}
              onClick={() => onViewPlayer(p.id)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                <img
                  src={p.photoUrl}
                  alt={p.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-mono font-bold bg-slate-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-400/40">
                    {p.id}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900/90 text-white px-2 py-0.5 rounded">
                    {p.playingRole}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-base text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                  {p.fullName}
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {p.currentClubName || p.previousClub || 'WCA Affiliated'}
                </p>

                {/* Quick stats pill */}
                <div className="mt-3 pt-3 border-t grid grid-cols-3 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Matches</span>
                    <strong className="text-slate-800">{p.stats.matches}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Runs</span>
                    <strong className="text-amber-700">{p.stats.runs}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Wkts</span>
                    <strong className="text-blue-900">{p.stats.wickets}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST NEWS & OFFICIAL ANNOUNCEMENTS */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Official Bulletins
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-teko">
                NEWS, CIRCULARS & TRIAL NOTIFICATIONS
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('news')}
              className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
            >
              View All Notices <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectNews(item.id)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-200 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B1E38] text-white px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1.5">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      {item.publishedDate}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <span className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                    Read Circular & Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Media & Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-teko">
              PHOTO GALLERY HIGHLIGHTS
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('gallery')}
            className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
          >
            View Complete Gallery <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryPreview.map(g => (
            <div
              key={g.id}
              onClick={() => onSelectTab('gallery')}
              className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer aspect-video md:aspect-[4/3] bg-slate-900"
            >
              <img
                src={g.imageUrl}
                alt={g.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400">
                  {g.category}
                </span>
                <p className="text-xs font-bold truncate leading-tight mt-0.5">
                  {g.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SPONSORS & PARTNERS DISPLAY */}
      <section className="bg-slate-100 py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            ASSOCIATION SUPPORTERS & CRICKET DEVELOPMENT PARTNERS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-xl text-slate-700 tracking-wider font-teko text-2xl">
              WAKESHWAR SPORTS TRUST
            </span>
            <span className="font-black text-xl text-slate-700 tracking-wider font-teko text-2xl">
              SHIVAJI GROUND GYMKHANA
            </span>
            <span className="font-black text-xl text-slate-700 tracking-wider font-teko text-2xl">
              DISTRICT CRICKET SUPPLY CO.
            </span>
            <span className="font-black text-xl text-slate-700 tracking-wider font-teko text-2xl">
              MAHARASHTRA SPORTS ACADEMY
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
