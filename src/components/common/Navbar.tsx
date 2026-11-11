import React, { useState } from 'react';
import { WcaLogo } from './WcaLogo';
import { useWca } from '../../context/WcaContext';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Shield, 
  UserPlus, 
  Users, 
  Trophy, 
  Flame, 
  Bell, 
  LogOut,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenPlayerRegister: () => void;
  onOpenClubRegister: () => void;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenPlayerRegister,
  onOpenClubRegister,
  onOpenAdminLogin
}) => {
  const { settings, userSession, logout, currentRole } = useWca();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'administration', label: 'ADMINISTRATION' },
    { id: 'players', label: 'PLAYERS' },
    { id: 'clubs', label: 'CLUBS & TEAMS' },
    { id: 'tournaments', label: 'TOURNAMENTS' },
    { id: 'matches', label: 'MATCH CENTRE' },
    { id: 'rankings', label: 'RANKINGS' },
    { id: 'news', label: 'NEWS & UPDATES' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'documents', label: 'DOCUMENTS' },
    { id: 'contact', label: 'CONTACT US' }
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md">
      {/* Top micro bar with contact info & news ticker */}
      <div className="bg-[#071326] text-slate-300 text-[11px] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Ticker preview */}
          <div className="flex items-center gap-2 overflow-hidden flex-1 max-w-2xl">
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase shrink-0 flex items-center gap-1">
              <Bell className="w-3 h-3" /> OFFICIAL NOTICE
            </span>
            <div className="truncate text-slate-300 font-medium">
              {settings.announcementTicker}
            </div>
          </div>

          {/* Right: Contact & Quick Links */}
          <div className="flex items-center gap-4 shrink-0 text-slate-300">
            <a 
              href={`tel:${settings.contactPhone}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{settings.contactPhone}</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a 
              href={`mailto:${settings.officialEmail}`} 
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{settings.officialEmail}</span>
            </a>

            {/* Quick tracker modal link */}
            <button
              onClick={() => handleNavClick('track-application')}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 ml-2"
            >
              Track Application Status
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar with Logo, Association Title, Prominent Action Buttons */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo and title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none"
          >
            <WcaLogo size="md" variant="full" />
          </button>

          {/* Prominent Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onOpenPlayerRegister}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              Register as Player
            </button>

            <button
              onClick={onOpenClubRegister}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4 text-amber-400" />
              Club Registration
            </button>

            {userSession.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-amber-400 font-bold text-xs uppercase tracking-wider hover:bg-slate-800 border border-amber-500/30 transition-all shadow"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Admin Panel ({currentRole})</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 shadow hover:shadow-md transition-all"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                Admin Login
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPlayerRegister}
              className="px-2.5 py-1.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links Bar (Desktop) */}
      <nav className="bg-[#0B1E38] text-white border-b border-amber-500/20 shadow-inner hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-0">
            <div className="flex items-center space-x-1">
              {navItems.map(item => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-3 text-[12px] font-bold tracking-wider transition-all whitespace-nowrap border-b-2 ${
                      isActive
                        ? 'text-amber-400 border-amber-400 bg-white/5'
                        : 'text-slate-200 border-transparent hover:text-amber-300 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Live Match pulse indicator in nav */}
            <button
              onClick={() => handleNavClick('matches')}
              className="flex items-center gap-2 text-[11px] bg-red-600/90 text-white font-bold px-3 py-1.5 rounded-full hover:bg-red-500 transition-all uppercase tracking-wider shadow-sm animate-pulse"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              LIVE MATCHES
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 text-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          {/* Quick Action buttons */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlayerRegister();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase text-center"
            >
              Player Registration
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClubRegister();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-blue-700 text-white font-bold text-xs uppercase text-center"
            >
              Club Registration
            </button>
          </div>

          <div className="flex flex-col space-y-1 pt-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-md text-xs font-bold tracking-wider uppercase transition-colors ${
                  currentTab === item.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-amber-400'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('track-application')}
              className="text-left px-3 py-2 rounded-md text-xs font-bold tracking-wider uppercase text-amber-400 hover:bg-slate-800"
            >
              TRACK APPLICATION
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (userSession.isAuthenticated) {
                  handleNavClick('admin');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className="text-left px-3 py-2 rounded-md text-xs font-bold tracking-wider uppercase text-blue-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              {userSession.isAuthenticated ? `ADMIN DASHBOARD (${currentRole})` : 'ADMIN LOGIN'}
            </button>

            {userSession.isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-md text-xs font-bold tracking-wider uppercase text-rose-400 hover:bg-slate-800 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                LOGOUT
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
