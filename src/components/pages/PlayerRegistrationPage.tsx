import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { PlayerRole, BattingStyle, BowlingStyle } from '../../types';
import { DigitalIdCard } from '../common/DigitalIdCard';
import confetti from 'canvas-confetti';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Clock, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';

interface PlayerRegistrationPageProps {
  initialMode?: 'register' | 'track';
  onViewPlayer?: (playerId: string) => void;
}

export const PlayerRegistrationPage: React.FC<PlayerRegistrationPageProps> = ({ 
  initialMode = 'register',
  onViewPlayer 
}) => {
  const { registerPlayer, players, clubs } = useWca();
  const [activeTab, setActiveTab] = useState<'register' | 'track'>(initialMode);

  // Registration Form State
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    mobileNumber: '',
    email: '',
    residentialAddress: '',
    district: 'Wakeshwar Region',
    taluka: 'Wakeshwar Central',
    village: 'Wakeshwar',
    playingRole: 'Batsman' as PlayerRole,
    battingStyle: 'Right Hand' as BattingStyle,
    bowlingStyle: 'Right Arm Medium' as BowlingStyle,
    previousClub: '',
    highestTournamentPlayed: 'District Senior Invitational',
    currentClubId: clubs[0]?.id || '',
    idProofType: 'Aadhaar Card',
    idProofNumber: ''
  });

  const [registeredResult, setRegisteredResult] = useState<{ id: string; applicationId: string } | null>(null);

  // Tracker State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedPlayer, setTrackedPlayer] = useState<(typeof players)[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      // Submit registration
      const selectedClub = clubs.find(c => c.id === formData.currentClubId);
      const res = registerPlayer({
        ...formData,
        currentClubName: selectedClub?.name || 'Unassigned Club',
        adminNotes: 'Registered via official WCA online portal.'
      });
      setRegisteredResult(res);
      setStep(4);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const clean = trackQuery.trim().toLowerCase();
    if (!clean) {
      setTrackedPlayer(null);
      return;
    }

    const match = players.find(p => 
      p.id.toLowerCase() === clean ||
      p.applicationId.toLowerCase() === clean ||
      p.mobileNumber.replace(/\D/g, '').includes(clean.replace(/\D/g, '')) ||
      p.fullName.toLowerCase().includes(clean)
    );

    setTrackedPlayer(match || null);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Official WCA Player Enrollment Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-teko">
            CENTRALIZED CRICKETER REGISTRATION & LICENSING
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Get officially registered with Wakeshwar Cricket Association to participate in district leagues, selection trials, and receive your digital biometric player ID.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('register')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                activeTab === 'register'
                  ? 'bg-[#0B1E38] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              New Player Registration
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                activeTab === 'track'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Track Application Status
            </button>
          </div>
        </div>

        {/* REGISTER TAB */}
        {activeTab === 'register' && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Step Progress Bar */}
            {step < 4 && (
              <div className="bg-[#0B1E38] p-4 text-white">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                  <span className={step >= 1 ? 'text-amber-400' : 'text-slate-400'}>
                    1. Personal Info
                  </span>
                  <span className={step >= 2 ? 'text-amber-400' : 'text-slate-400'}>
                    2. Cricket Profile
                  </span>
                  <span className={step >= 3 ? 'text-amber-400' : 'text-slate-400'}>
                    3. Identity & Documents
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* STEP 1: PERSONAL DETAILS */}
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-amber-500" />
                      Step 1: Personal Details
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Enter official credentials matching your government identity documents.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Full Name (As on ID Proof) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g. Aarav Vinod Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={e => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={e => handleInputChange('gender', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobileNumber}
                        onChange={e => handleInputChange('mobileNumber', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder="player@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Residential Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={formData.residentialAddress}
                        onChange={e => handleInputChange('residentialAddress', e.target.value)}
                        placeholder="House / Flat No, Street, Landmark"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        District *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={e => handleInputChange('district', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Taluka / Sub-division *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.taluka}
                        onChange={e => handleInputChange('taluka', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Village / City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.village}
                        onChange={e => handleInputChange('village', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#0B1E38] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all"
                    >
                      Next: Cricket Profile
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: CRICKET PROFILE */}
              {step === 2 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      Step 2: Cricket Specialization & History
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Specify your core roles, playing styles, and affiliated club.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Playing Role *
                      </label>
                      <select
                        value={formData.playingRole}
                        onChange={e => handleInputChange('playingRole', e.target.value as PlayerRole)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="All-rounder">All-rounder</option>
                        <option value="Wicketkeeper">Wicketkeeper</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Batting Style *
                      </label>
                      <select
                        value={formData.battingStyle}
                        onChange={e => handleInputChange('battingStyle', e.target.value as BattingStyle)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="Right Hand">Right Hand</option>
                        <option value="Left Hand">Left Hand</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Bowling Style *
                      </label>
                      <select
                        value={formData.bowlingStyle}
                        onChange={e => handleInputChange('bowlingStyle', e.target.value as BowlingStyle)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="Right Arm Fast">Right Arm Fast</option>
                        <option value="Right Arm Medium">Right Arm Medium</option>
                        <option value="Right Arm Off Spin">Right Arm Off Spin</option>
                        <option value="Right Arm Leg Spin">Right Arm Leg Spin</option>
                        <option value="Left Arm Fast">Left Arm Fast</option>
                        <option value="Left Arm Medium">Left Arm Medium</option>
                        <option value="Left Arm Orthodox">Left Arm Orthodox</option>
                        <option value="Left Arm Chinaman">Left Arm Chinaman</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Registered / Represented Club *
                      </label>
                      <select
                        value={formData.currentClubId}
                        onChange={e => handleInputChange('currentClubId', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        {clubs.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.id})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Previous Club / Academy
                      </label>
                      <input
                        type="text"
                        value={formData.previousClub}
                        onChange={e => handleInputChange('previousClub', e.target.value)}
                        placeholder="e.g. Wakeshwar Youth Coaching Centre"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Highest Tournament Played
                      </label>
                      <input
                        type="text"
                        value={formData.highestTournamentPlayed}
                        onChange={e => handleInputChange('highestTournamentPlayed', e.target.value)}
                        placeholder="e.g. Inter-College Trophy / District Zonal"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#0B1E38] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all"
                    >
                      Next: ID & Photo
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: IDENTITY & DOCUMENTS */}
              {step === 3 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-amber-500" />
                      Step 3: Identity Verification & Photo
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload portrait photograph for your official digital player ID card.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Identity Proof Document *
                      </label>
                      <select
                        value={formData.idProofType}
                        onChange={e => handleInputChange('idProofType', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="Aadhaar Card">Aadhaar Card</option>
                        <option value="Voter ID Card">Voter ID Card</option>
                        <option value="Birth Certificate (for U-14/16/19)">Birth Certificate (for U-14/16/19)</option>
                        <option value="Passport">Passport</option>
                        <option value="School / College ID">School / College ID</option>
                      </select>

                      <div className="mt-3">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Document Identification Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.idProofNumber}
                          onChange={e => handleInputChange('idProofNumber', e.target.value)}
                          placeholder="XXXX-XXXX-XXXX"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          Document Privacy Notice
                        </p>
                        <p className="text-[11px] text-amber-800">
                          Your physical identity copies are strictly inspected by authorized WCA administrators only for eligibility and anti-fraud enforcement.
                        </p>
                      </div>
                    </div>

                    {/* Photo selector & preview */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border rounded-xl">
                      <div className="w-28 h-32 rounded-xl overflow-hidden border-2 border-amber-500 shadow-md mb-3 bg-slate-200">
                        <img
                          src={formData.photoUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="text-xs font-bold text-slate-700 uppercase mb-1">
                        Profile Photo URL / Avatar
                      </label>
                      <input
                        type="url"
                        value={formData.photoUrl}
                        onChange={e => handleInputChange('photoUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange('photoUrl', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')}
                          className="text-[10px] text-blue-700 underline"
                        >
                          Preset 1
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('photoUrl', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')}
                          className="text-[10px] text-blue-700 underline"
                        >
                          Preset 2
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('photoUrl', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80')}
                          className="text-[10px] text-blue-700 underline"
                        >
                          Preset 3
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all"
                    >
                      Complete & Submit Registration
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: SUCCESS CONFIRMATION & DIGITAL ID PREVIEW */}
              {step === 4 && registeredResult && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                      APPLICATION ID: {registeredResult.applicationId}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 uppercase font-teko mt-2">
                      REGISTRATION APPLICATION SUBMITTED!
                    </h2>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Your credentials have been securely stored in the WCA central database. Your assigned registration code is{' '}
                      <strong className="text-slate-900">{registeredResult.id}</strong>.
                    </p>
                  </div>

                  {/* Render the preview ID Card */}
                  {(() => {
                    const generatedPlayer = players.find(p => p.id === registeredResult.id);
                    if (!generatedPlayer) return null;
                    return (
                      <div className="pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Provisional Digital Player Card Preview
                        </p>
                        <DigitalIdCard player={generatedPlayer} />
                      </div>
                    );
                  })()}

                  <div className="flex flex-wrap justify-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        setStep(1);
                        setRegisteredResult(null);
                        setFormData({
                          fullName: '',
                          dateOfBirth: '',
                          gender: 'Male',
                          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                          mobileNumber: '',
                          email: '',
                          residentialAddress: '',
                          district: 'Wakeshwar Region',
                          taluka: 'Wakeshwar Central',
                          village: 'Wakeshwar',
                          playingRole: 'Batsman',
                          battingStyle: 'Right Hand',
                          bowlingStyle: 'Right Arm Medium',
                          previousClub: '',
                          highestTournamentPlayed: '',
                          currentClubId: clubs[0]?.id || '',
                          idProofType: 'Aadhaar Card',
                          idProofNumber: ''
                        });
                      }}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Register Another Player
                    </button>
                    <button
                      onClick={() => setActiveTab('track')}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Track Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRACK APPLICATION TAB */}
        {activeTab === 'track' && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-teko text-2xl tracking-wide flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-500" />
                CHECK VERIFICATION & LICENSE STATUS
              </h3>
              <p className="text-xs text-slate-500">
                Search using your Application ID (e.g. <code>APP-WCA-1001</code>), Player ID (e.g. <code>WCA-PL-2026-001</code>), or registered Mobile Number.
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={trackQuery}
                onChange={e => setTrackQuery(e.target.value)}
                placeholder="Enter WCA ID / Application No / Mobile Number..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B1E38] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
              >
                Track Now
              </button>
            </form>

            {/* Search Results */}
            {hasSearched && (
              <div className="pt-4 border-t">
                {trackedPlayer ? (
                  <div className="space-y-6">
                    {/* Status overview card */}
                    <div className="p-4 sm:p-5 rounded-xl border bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">
                            {trackedPlayer.fullName}
                          </h4>
                          <span className="font-mono text-xs text-slate-500">
                            ({trackedPlayer.id})
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Application ID: <strong className="text-slate-800">{trackedPlayer.applicationId}</strong> • Applied on {trackedPlayer.registeredDate}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          Role: <span className="font-semibold text-amber-700">{trackedPlayer.playingRole}</span> | Club: <span className="font-semibold">{trackedPlayer.currentClubName || trackedPlayer.previousClub || 'Direct WCA'}</span>
                        </p>
                      </div>

                      {/* Status Tag */}
                      <div className="flex flex-col items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          trackedPlayer.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : trackedPlayer.status === 'Under Review'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : trackedPlayer.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          <Clock className="w-3.5 h-3.5" />
                          Status: {trackedPlayer.status}
                        </span>
                        {trackedPlayer.adminNotes && (
                          <span className="text-[11px] text-slate-500 mt-1 italic max-w-xs text-right">
                            {trackedPlayer.adminNotes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* If Approved, show ID card */}
                    {trackedPlayer.status === 'Approved' && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                            Official Approved Digital ID Card
                          </h5>
                          {onViewPlayer && (
                            <button
                              onClick={() => onViewPlayer(trackedPlayer.id)}
                              className="text-xs font-semibold text-blue-700 hover:underline"
                            >
                              View Career Profile →
                            </button>
                          )}
                        </div>
                        <DigitalIdCard player={trackedPlayer} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No application found matching "{trackQuery}"</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Please verify your Application ID or mobile number. You can also contact WCA registration desk at {players[0]?.mobileNumber || 'the office'}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
