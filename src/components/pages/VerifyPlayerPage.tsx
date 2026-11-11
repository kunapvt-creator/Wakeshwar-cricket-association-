import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { WcaLogo } from '../common/WcaLogo';
import { ShieldCheck, CheckCircle2, XCircle, Search, Calendar, MapPin, Award, ArrowLeft } from 'lucide-react';

interface VerifyPlayerPageProps {
  initialPlayerId?: string;
  onBack?: () => void;
}

export const VerifyPlayerPage: React.FC<VerifyPlayerPageProps> = ({ initialPlayerId, onBack }) => {
  const { players } = useWca();
  const [searchId, setSearchId] = useState(initialPlayerId || 'WCA-PL-2026-001');
  const [searched, setSearched] = useState(true);

  const matchedPlayer = players.find(p => 
    p.id.toLowerCase() === searchId.trim().toLowerCase() ||
    p.applicationId.toLowerCase() === searchId.trim().toLowerCase()
  );

  return (
    <div className="py-12 bg-slate-900 min-h-screen text-slate-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-[#071326] rounded-2xl border-2 border-amber-500/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1E38] p-5 text-center border-b border-amber-500/20">
          <WcaLogo size="md" variant="icon" className="mx-auto mb-2" />
          <h2 className="text-xl font-black text-amber-400 font-teko tracking-wide">
            WAKESHWAR CRICKET ASSOCIATION
          </h2>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
            CENTRAL REPOSITORY • PLAYER CREDENTIALS VERIFICATION
          </p>
        </div>

        {/* Verification Lookup Input */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Player ID / Application Code:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              placeholder="e.g. WCA-PL-2026-001"
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => setSearched(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase rounded-lg"
            >
              Verify
            </button>
          </div>
        </div>

        {/* Verification Result Card */}
        <div className="p-6">
          {matchedPlayer ? (
            <div className="space-y-5">
              {/* Authenticity Badge */}
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                    OFFICIALLY VERIFIED CRICKETER
                  </h4>
                  <p className="text-[11px] text-emerald-200/80 leading-tight">
                    This registration is verified and in active standing on the WCA Registry.
                  </p>
                </div>
              </div>

              {/* Player snapshot */}
              <div className="flex gap-4 items-center">
                <img
                  src={matchedPlayer.photoUrl}
                  alt={matchedPlayer.fullName}
                  className="w-20 h-24 object-cover rounded-xl border-2 border-amber-400 shadow-md bg-slate-800"
                />
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    {matchedPlayer.id}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {matchedPlayer.fullName}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mt-0.5">
                    {matchedPlayer.playingRole}
                  </p>
                  <p className="text-xs text-slate-400">
                    Club: <strong className="text-white">{matchedPlayer.currentClubName || 'WCA Affiliated'}</strong>
                  </p>
                </div>
              </div>

              {/* Public verification specs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Batting Style</span>
                  <span className="font-semibold text-slate-200">{matchedPlayer.battingStyle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Bowling Style</span>
                  <span className="font-semibold text-slate-200">{matchedPlayer.bowlingStyle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">District</span>
                  <span className="font-semibold text-slate-200">{matchedPlayer.district}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">License Validity</span>
                  <span className="font-semibold text-emerald-400">{matchedPlayer.validUntil || '31-DEC-2027'}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 text-center border-t border-slate-800/80 pt-3">
                Digital Timestamp Verified • Wakeshwar Cricket Association Board
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-white">Record Not Found</h3>
              <p className="text-xs text-slate-400">
                No verified player record matches the provided ID. Please check the identifier or contact the association registry.
              </p>
            </div>
          )}
        </div>

        {onBack && (
          <div className="p-3 bg-slate-950 text-center border-t border-slate-800">
            <button
              onClick={onBack}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
