import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { Club } from '../../types';
import { 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Trophy, 
  Users, 
  ShieldCheck, 
  X,
  ArrowRight
} from 'lucide-react';

export const ClubsPage: React.FC<{ onOpenClubRegister?: () => void; onViewPlayer?: (pId: string) => void }> = ({
  onOpenClubRegister,
  onViewPlayer
}) => {
  const { clubs, players, tournaments } = useWca();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-900/10 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
              <Building2 className="w-4 h-4 text-blue-800" />
              Affiliated Cricket Institutions
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-teko uppercase tracking-wide">
              AFFILIATED CLUBS & CRICKET TEAMS
            </h1>
            <p className="text-xs text-slate-600">
              Official roster of accredited cricket clubs, coaching academies, and team managements under WCA governance.
            </p>
          </div>

          {onOpenClubRegister && (
            <button
              onClick={onOpenClubRegister}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0"
            >
              Affiliate New Club
            </button>
          )}
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map(club => {
            const clubSquad = players.filter(p => p.currentClubId === club.id || p.currentClubName === club.name);

            return (
              <div
                key={club.id}
                onClick={() => setSelectedClub(club)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Banner / Logo Area */}
                  <div className="h-40 bg-gradient-to-br from-[#0B1E38] to-slate-900 p-5 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                        {club.id}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded font-bold uppercase">
                        {club.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={club.logoUrl}
                        alt={club.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow bg-white"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-base truncate group-hover:text-amber-400 transition-colors font-teko text-xl">
                          {club.name}
                        </h3>
                        <p className="text-[11px] text-slate-300 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          {club.city}, {club.district}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Club info summary */}
                  <div className="p-4 space-y-2.5 text-xs text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Captain:</span>
                      <span className="font-bold text-slate-800">{club.captainName || 'TBA'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Head Coach:</span>
                      <span className="font-semibold text-slate-800">{club.coachName || 'TBA'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Home Ground:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[140px] text-right">{club.homeGround}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Active Squad:</span>
                      <span className="font-bold text-blue-900">{clubSquad.length || club.playersCount} Players</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <span className="text-xs font-bold text-amber-600 group-hover:underline flex items-center justify-between">
                    <span>View Club Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CLUB PROFILE MODAL */}
        {selectedClub && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in zoom-in-95">
              <div className="bg-[#0B1E38] text-white p-5 flex items-center justify-between border-b border-amber-500/30">
                <div className="flex items-center gap-3">
                  <img src={selectedClub.logoUrl} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                  <div>
                    <h3 className="text-xl font-black font-teko uppercase text-amber-400 text-2xl tracking-wide">
                      {selectedClub.name}
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      AFFILIATION CODE: {selectedClub.id} • REGISTERED {selectedClub.registeredYear}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClub(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Executive Directory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Club President / Owner:</span>
                    <strong className="text-slate-900 font-bold text-sm">{selectedClub.ownerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Team Manager:</span>
                    <strong className="text-slate-900 font-bold text-sm">{selectedClub.teamManager}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Captain:</span>
                    <strong className="text-amber-700 font-bold text-sm">{selectedClub.captainName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Head Coach:</span>
                    <strong className="text-slate-900 font-bold text-sm">{selectedClub.coachName}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase">Home Ground & Training Nets:</span>
                    <span className="text-slate-800 font-semibold">{selectedClub.homeGround}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Contact Number:</span>
                    <span className="text-slate-800 font-semibold">{selectedClub.contactNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Email:</span>
                    <span className="text-slate-800 font-semibold">{selectedClub.email}</span>
                  </div>
                </div>

                {/* Registered Club Squad */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                    <span>Registered Team Squad Roster</span>
                    <span className="text-xs text-slate-500 font-normal">
                      Verified players linked to this club
                    </span>
                  </h4>

                  {(() => {
                    const clubSquad = players.filter(p => p.currentClubId === selectedClub.id || p.currentClubName === selectedClub.name);
                    if (clubSquad.length === 0) {
                      return (
                        <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-lg border text-center">
                          Squad submission pending physical verification for upcoming tournament season.
                        </p>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {clubSquad.map(sqPlayer => (
                          <div
                            key={sqPlayer.id}
                            className="flex items-center gap-3 p-3 bg-white border rounded-xl hover:border-amber-400 transition-colors"
                          >
                            <img
                              src={sqPlayer.photoUrl}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs text-slate-900 truncate">
                                {sqPlayer.fullName}
                              </h5>
                              <span className="text-[10px] text-amber-700 font-semibold">
                                {sqPlayer.playingRole} • {sqPlayer.id}
                              </span>
                            </div>
                            {onViewPlayer && (
                              <button
                                onClick={() => {
                                  setSelectedClub(null);
                                  onViewPlayer(sqPlayer.id);
                                }}
                                className="text-[10px] text-blue-700 font-bold hover:underline"
                              >
                                Stats →
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="bg-slate-100 p-4 border-t flex justify-end">
                <button
                  onClick={() => setSelectedClub(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
