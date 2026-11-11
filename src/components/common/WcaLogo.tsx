import React from 'react';

interface WcaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'monochrome';
  className?: string;
}

export const WcaLogo: React.FC<WcaLogoProps> = ({ size = 'md', variant = 'full', className = '' }) => {
  const dimensions = {
    sm: { w: 36, h: 36, text: 'text-sm', sub: 'text-[9px]' },
    md: { w: 48, h: 48, text: 'text-lg', sub: 'text-[10px]' },
    lg: { w: 64, h: 64, text: 'text-2xl', sub: 'text-xs' },
    xl: { w: 84, h: 84, text: 'text-3xl', sub: 'text-sm' }
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Crest */}
      <div 
        className="relative shrink-0 flex items-center justify-center drop-shadow-md transition-transform duration-300 hover:scale-105"
        style={{ width: dimensions.w, height: dimensions.h }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B192C" />
              <stop offset="50%" stopColor="#1E3E62" />
              <stop offset="100%" stopColor="#0B192C" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="ballGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
          </defs>

          {/* Shield Base */}
          <path
            d="M50 5 L88 18 C88 56 68 85 50 95 C32 85 12 56 12 18 Z"
            fill="url(#shieldGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
          />

          {/* Inner decorative border */}
          <path
            d="M50 11 L81 22 C81 53 64 78 50 87 C36 78 19 53 19 22 Z"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity="0.7"
          />

          {/* Crossed Cricket Bats */}
          {/* Bat 1 */}
          <g transform="rotate(-30 50 48)">
            <rect x="47" y="24" width="6" height="34" rx="2" fill="#D97706" />
            <rect x="48.5" y="16" width="3" height="10" rx="1" fill="#FEF08A" />
            <path d="M47 52 L53 52 L51 58 L49 58 Z" fill="#92400E" />
          </g>
          {/* Bat 2 */}
          <g transform="rotate(30 50 48)">
            <rect x="47" y="24" width="6" height="34" rx="2" fill="#D97706" />
            <rect x="48.5" y="16" width="3" height="10" rx="1" fill="#FEF08A" />
            <path d="M47 52 L53 52 L51 58 L49 58 Z" fill="#92400E" />
          </g>

          {/* Stumps / Wickets & Bails */}
          <rect x="42" y="34" width="3" height="26" rx="0.8" fill="#FDE68A" />
          <rect x="48.5" y="32" width="3" height="28" rx="0.8" fill="#FDE68A" />
          <rect x="55" y="34" width="3" height="26" rx="0.8" fill="#FDE68A" />
          {/* Bails */}
          <rect x="41" y="32" width="8" height="2" rx="0.5" fill="#F59E0B" />
          <rect x="51" y="32" width="8" height="2" rx="0.5" fill="#F59E0B" />

          {/* Cricket Ball */}
          <circle cx="50" cy="56" r="11" fill="url(#ballGrad)" stroke="#FEE2E2" strokeWidth="1" />
          {/* Cricket Ball Seam */}
          <path
            d="M42 56 Q50 51 58 56"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeDasharray="1.5,1"
          />
          <path
            d="M42 56 Q50 61 58 56"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeDasharray="1.5,1"
          />

          {/* Stars */}
          <path d="M50 17 L52 21 L56 21 L53 23 L54 27 L50 24 L46 27 L47 23 L44 21 L48 21 Z" fill="#FCD34D" />
          <path d="M33 23 L34.5 26 L38 26 L35 28 L36 31 L33 29 L30 31 L31 28 L28 26 L31.5 26 Z" fill="#FCD34D" />
          <path d="M67 23 L68.5 26 L72 26 L69 28 L70 31 L67 29 L64 31 L65 28 L62 26 L65.5 26 Z" fill="#FCD34D" />

          {/* Ribbon / Banner */}
          <path
            d="M26 73 L74 73 L68 81 L32 81 Z"
            fill="#B45309"
            stroke="#FDE68A"
            strokeWidth="0.8"
          />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="7"
            fontWeight="bold"
            letterSpacing="1"
          >
            WCA
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      {variant === 'full' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-wider text-slate-900 uppercase font-teko text-2xl md:text-3xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-900 to-amber-600`}>
              WAKESHWAR
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-widest -mt-1">
            CRICKET ASSOCIATION
          </span>
          <span className="text-[9px] text-slate-500 font-medium tracking-tight hidden sm:block">
            Official Cricket Governing Body
          </span>
        </div>
      )}
    </div>
  );
};
