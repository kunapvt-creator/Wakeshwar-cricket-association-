import React from 'react';
import { useWca } from '../../context/WcaContext';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Trophy, 
  Users, 
  Sparkles, 
  Award, 
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC<{ onExploreTournaments?: () => void }> = ({ onExploreTournaments }) => {
  const { settings } = useWca();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Charter & Governance Profile
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            ABOUT WAKESHWAR CRICKET ASSOCIATION
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The recognized digital platform and governing body promoting sportsmanship, talent nurturing, and high-standard competitive cricket in Wakeshwar and neighboring districts.
          </p>
        </div>

        {/* Vision & Mission Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0B1E38] text-white p-8 rounded-2xl border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl w-fit mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black font-teko text-amber-400 tracking-wide uppercase">
              OUR VISION
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              To establish Wakeshwar as a recognized cricket talent nursery known for exceptional sporting spirit, modern athletic infrastructure, and systematic pathways from school playgrounds to high-level zonal and state representation.
            </p>
          </div>

          <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="p-3 bg-blue-900/10 text-blue-900 rounded-xl w-fit mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black font-teko text-blue-950 tracking-wide uppercase">
              OUR MISSION
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Provide equitable access to sanctioned tournaments, fair and transparent selection trials, accredited umpiring, and certified coaching clinics for all cricket clubs, schools, academies, and aspiring athletes.
            </p>
          </div>
        </div>

        {/* Association Objectives */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 font-teko text-2xl uppercase tracking-wider mb-6 pb-2 border-b">
            CORE ASSOCIATION OBJECTIVES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Grassroots Scouting</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conducting organized taluka and rural camps to uncover raw batting and bowling talent regardless of socioeconomic background.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Institutional Governance</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintaining a centralized digital registry of licensed cricketers, accredited clubs, and verified identity records to prevent age-group fraud.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Tournaments & Standards</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enforcing standard match playing conditions, live digital ball-by-ball scorecards, and high-quality equipment across all fixtures.
              </p>
            </div>
          </div>
        </div>

        {/* Development Initiatives Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-teko uppercase">
              CRICKET DEVELOPMENT INITIATIVES
            </h3>
            <p className="text-xs text-slate-500">
              Long-term strategic programs structured by the WCA Technical & Selection Committees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="font-bold text-sm text-slate-900">Youth Under-14/16/19 Camps</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seasonal high-performance training conducted during summer holidays with certified physical fitness trainers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="font-bold text-sm text-slate-900">Umpire & Scorer Clinics</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Periodic testing and rulebook refresher sessions so local matches maintain professional officiating fidelity.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="font-bold text-sm text-slate-900">Turf Pitch Development</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Investment in standard turf wickets and practice nets to accustom players to bounce and true seam conditions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                04
              </div>
              <h4 className="font-bold text-sm text-slate-900">Welfare & Equipment Grants</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distribution of subsidized cricket kits, balls, and safety gear to emerging village teams and public schools.
              </p>
            </div>
          </div>
        </div>

        {/* Association Statement & Constitution Notice */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-amber-400 font-teko text-xl">
              GOVERNANCE & TRANSPARENCY NOTICE
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              All association operations, tournament selections, and committee members operate under the duly adopted constitution of the Wakeshwar Cricket Association.
            </p>
          </div>
          {onExploreTournaments && (
            <button
              onClick={onExploreTournaments}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shrink-0"
            >
              Explore Tournaments →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
