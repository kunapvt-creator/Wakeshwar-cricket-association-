import React from 'react';
import { WcaLogo } from './WcaLogo';
import { useWca } from '../../context/WcaContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Shield, 
  Award, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenPlayerRegister: () => void;
  onOpenClubRegister: () => void;
  onOpenOfficialRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPlayerRegister,
  onOpenClubRegister,
  onOpenOfficialRegister
}) => {
  const { settings } = useWca();

  return (
    <footer className="bg-[#071326] text-slate-300 border-t-4 border-amber-500 text-sm">
      {/* Top Banner / Grassroots Mission Strip */}
      <div className="bg-[#0B1E38] border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base tracking-wide uppercase font-teko text-xl">
                  {settings.heroHeading}
                </h4>
                <p className="text-xs text-slate-400">
                  {settings.heroSubheading}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenPlayerRegister}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow"
              >
                Register as Player
              </button>
              <button
                onClick={onOpenClubRegister}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow"
              >
                Affiliate Club
              </button>
              <button
                onClick={onOpenOfficialRegister}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-lg transition-all border border-slate-700"
              >
                Umpire / Scorer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <WcaLogo size="lg" variant="full" className="text-white" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The official cricket governing and organizing association in Wakeshwar. 
              Dedicated to promoting competitive spirit, grassroots infrastructure, transparent selection, 
              and player welfare across local and district circuits.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] bg-slate-800/80 text-amber-300 px-3 py-1 rounded-full border border-amber-500/20">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Autonomous Cricket Association
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Organization
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-amber-400 transition-colors">
                  About WCA
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('administration')} className="hover:text-amber-400 transition-colors">
                  Administration & Committee
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('clubs')} className="hover:text-amber-400 transition-colors">
                  Affiliated Clubs & Teams
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('documents')} className="hover:text-amber-400 transition-colors">
                  Constitution & Rules
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('gallery')} className="hover:text-amber-400 transition-colors">
                  Media & Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Cricket Operations */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Cricket Hub
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('matches')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Live Match Centre
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('tournaments')} className="hover:text-amber-400 transition-colors">
                  Tournaments & Fixtures
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('players')} className="hover:text-amber-400 transition-colors">
                  Registered Players Directory
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('rankings')} className="hover:text-amber-400 transition-colors">
                  Player Performance Rankings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('news')} className="hover:text-amber-400 transition-colors">
                  Official Circulars & News
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('track-application')} className="hover:text-amber-400 transition-colors text-amber-400 font-semibold">
                  Track Application Status
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Association Office
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="hover:text-white">
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.officialEmail}`} className="hover:text-white">
                  {settings.officialEmail}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Office Hours: Mon - Sat: 10:00 AM – 6:00 PM IST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar / Regulatory & Demo disclaimer */}
      <div className="bg-slate-950 py-4 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Wakeshwar Cricket Association (WCA). All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-slate-500">
              Demo sample records clearly designated. Real-time local state enabled.
            </span>
            <button
              onClick={() => onSelectTab('admin')}
              className="hover:text-amber-400 font-semibold underline underline-offset-2"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
