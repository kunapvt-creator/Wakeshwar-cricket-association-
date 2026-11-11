import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { UserRole } from '../../types';
import { Shield, Lock, Mail, CheckCircle, X, KeyRound, UserCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAs } = useWca();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Super Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole, email || undefined);
    onSuccess();
    onClose();
  };

  const handleQuickDemoRole = (role: UserRole) => {
    loginAs(role);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black font-teko uppercase text-amber-400 text-2xl tracking-wide">
            ASSOCIATION STAFF AUTHENTICATION
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Restricted access for WCA governing officials, scorers, and club managers.
          </p>
        </div>

        {/* Quick Reviewer One-Click Access */}
        <div className="mb-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
            <KeyRound className="w-3.5 h-3.5" />
            Instant Role Authentication:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoRole('Super Admin')}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-left border border-slate-700 flex items-center justify-between group"
            >
              <span className="font-bold">Super Admin</span>
              <span className="text-[10px] text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            <button
              onClick={() => handleQuickDemoRole('Official Scorer')}
              className="px-2.5 py-2 bg-red-950/60 hover:bg-red-900/60 text-red-200 rounded-lg text-left border border-red-700/50 flex items-center justify-between group"
            >
              <span className="font-bold">Official Scorer</span>
              <span className="text-[10px] text-red-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            <button
              onClick={() => handleQuickDemoRole('Tournament Manager')}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-left border border-slate-700 flex items-center justify-between group"
            >
              <span className="font-bold">Tournament Mgr</span>
              <span className="text-[10px] text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            <button
              onClick={() => handleQuickDemoRole('Club Manager')}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-left border border-slate-700 flex items-center justify-between group"
            >
              <span className="font-bold">Club Manager</span>
              <span className="text-[10px] text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">
              Select Designation / Role:
            </label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold focus:outline-none"
            >
              <option value="Super Admin">Super Admin (President / Full Access)</option>
              <option value="Association Admin">Association Admin (Honorary Secretary)</option>
              <option value="Tournament Manager">Tournament Manager (Fixtures & Tables)</option>
              <option value="Official Scorer">Official Scorer (Live Ball Entry)</option>
              <option value="Club Manager">Club Manager (Squad Submissions)</option>
              <option value="Player">Player Portal</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">
              Authorized Email / Officer ID:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. admin@wakeshwarcricket.org"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 uppercase font-bold mb-1">
              Secret Passkey:
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              Authenticate & Enter Console
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
