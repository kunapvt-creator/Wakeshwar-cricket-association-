import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Player } from '../../types';
import { WcaLogo } from './WcaLogo';
import { ShieldCheck, Download, CheckCircle, Calendar, MapPin, Award, Printer } from 'lucide-react';

interface DigitalIdCardProps {
  player: Player;
  onClose?: () => void;
}

export const DigitalIdCard: React.FC<DigitalIdCardProps> = ({ player, onClose }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate QR pointing to the public verification anchor/route
    const verificationUrl = `${window.location.origin}/#verify/${player.id}`;
    QRCode.toDataURL(
      verificationUrl,
      {
        width: 180,
        margin: 1,
        color: {
          dark: '#0B192C',
          light: '#FFFFFF'
        }
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeDataUrl(url);
        }
      }
    );
  }, [player.id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Action buttons */}
      <div className="flex items-center gap-3 mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shadow transition-all"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          Print Card
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-all"
          >
            Close
          </button>
        )}
      </div>

      {/* Actual ID Card (Credit card aspect ratio / Badge format) */}
      <div
        ref={cardRef}
        className="w-full max-w-[380px] bg-gradient-to-br from-[#071326] via-[#0B1E38] to-[#040C1A] text-white rounded-2xl shadow-2xl overflow-hidden border-2 border-amber-500/60 relative print:shadow-none print:border-slate-800"
      >
        {/* Holographic accent stripe */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        {/* Top Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-[#0B1E38] to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <WcaLogo size="sm" variant="icon" />
            <div>
              <h4 className="text-xs font-black tracking-wider text-amber-400 uppercase font-teko text-lg leading-none">
                WAKESHWAR CRICKET ASSOCIATION
              </h4>
              <p className="text-[9px] text-slate-300 font-semibold tracking-widest uppercase">
                Official Player Identity Card
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded font-mono font-bold">
              SESSION 2026-27
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 relative">
          {/* Subtle watermark crest */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none scale-150">
            <WcaLogo size="xl" variant="icon" />
          </div>

          <div className="flex gap-4">
            {/* Player Photograph */}
            <div className="relative shrink-0">
              <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-amber-400/80 shadow-md bg-slate-800">
                <img
                  src={player.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={player.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full border border-emerald-400 shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                VERIFIED
              </div>
            </div>

            {/* Core Details */}
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-amber-400 tracking-wider font-mono">
                {player.id}
              </span>
              <h3 className="text-lg font-bold text-white leading-snug truncate">
                {player.fullName}
              </h3>

              <div className="mt-2 space-y-1.5 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] w-14">Role:</span>
                  <span className="font-semibold text-amber-300">{player.playingRole}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] w-14">Club:</span>
                  <span className="font-semibold truncate text-white">
                    {player.currentClubName || player.previousClub || 'Affiliated Club'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] w-14">Batting:</span>
                  <span className="text-slate-200">{player.battingStyle}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] w-14">District:</span>
                  <span className="text-slate-200">{player.district || 'Wakeshwar'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lower section with QR code & Signature */}
          <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            {/* QR Verification Code */}
            <div className="flex items-center gap-3">
              {qrCodeDataUrl ? (
                <div className="p-1 bg-white rounded-lg shadow-sm border border-amber-300">
                  <img src={qrCodeDataUrl} alt="Verify QR" className="w-14 h-14" />
                </div>
              ) : (
                <div className="w-14 h-14 bg-slate-800 rounded animate-pulse" />
              )}
              <div className="text-[9px] text-slate-400 leading-tight">
                <p className="font-semibold text-slate-300">Scan to Verify</p>
                <p>Public Record Check</p>
                <p className="font-mono text-amber-400/80 mt-0.5">{player.applicationId}</p>
              </div>
            </div>

            {/* Authorized Signature representation */}
            <div className="flex flex-col items-center text-center">
              <div className="font-serif italic text-amber-300 text-xs tracking-wider opacity-85 select-none">
                B. K. Patil
              </div>
              <div className="w-20 h-px bg-amber-400/40 my-0.5" />
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold">
                Honorary Secretary
              </span>
              <span className="text-[7px] text-slate-500">Wakeshwar Cricket Assn.</span>
            </div>
          </div>
        </div>

        {/* Card Footer Micro Bar */}
        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
          <span>Valid Thru: <strong className="text-slate-200">{player.validUntil || '31-DEC-2027'}</strong></span>
          <span className="text-amber-400/90 font-medium">www.wakeshwarcricket.org</span>
        </div>
      </div>
    </div>
  );
};
