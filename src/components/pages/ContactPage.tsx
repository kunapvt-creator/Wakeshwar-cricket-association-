import React, { useState } from 'react';
import { useWca } from '../../context/WcaContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, submitContactMessage } = useWca();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'Player Registration Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactMessage(formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Mail className="w-4 h-4 text-amber-600" />
            Association Secretariat & Communications
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-teko uppercase tracking-tight">
            CONTACT WAKESHWAR CRICKET ASSOCIATION
          </h1>
          <p className="text-sm text-slate-600">
            For tournament registrations, affiliation verification, grievance redressal, and media inquiries, reach our official secretariat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1E38] text-white p-7 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-6">
              <h3 className="text-2xl font-black font-teko text-amber-400 uppercase tracking-wide">
                ASSOCIATION HEADQUARTERS
              </h3>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Office Address</span>
                    <strong className="text-sm text-white font-medium leading-relaxed block mt-0.5">
                      {settings.officeAddress}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Helpline</span>
                    <a href={`tel:${settings.contactPhone}`} className="text-sm text-white font-medium hover:text-amber-400">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Correspondence</span>
                    <a href={`mailto:${settings.officialEmail}`} className="text-sm text-white font-medium hover:text-amber-400">
                      {settings.officialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Secretariat Working Hours</span>
                    <p className="text-slate-200 text-xs mt-0.5">
                      Monday to Saturday: 10:00 AM – 6:00 PM IST (Closed on National Holidays)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Representation */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-100 p-3 text-xs font-bold text-slate-700 flex items-center justify-between border-b">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-900" />
                  Interactive Stadium & Headquarters Location
                </span>
                <span className="text-[10px] text-slate-500">Wakeshwar, Maharashtra</span>
              </div>
              <div className="h-52 bg-slate-200 relative flex items-center justify-center overflow-hidden">
                <iframe
                  title="WCA Location Map"
                  src="https://maps.google.com/maps?q=Wakeshwar,Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-xl font-black font-teko uppercase text-slate-900 text-2xl flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                SEND OFFICIAL COMMUNICATION
              </h3>
              <p className="text-xs text-slate-500">
                Messages submitted here are routed directly to the association secretariat desk.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-4 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-900 font-teko text-2xl">
                  MESSAGE DISPATCHED TO WCA DESK!
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for reaching out. An authorized officer will respond to your registered mobile number or email address.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91..."
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Subject / Dept *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    >
                      <option value="Player Registration Inquiry">Player Registration Inquiry</option>
                      <option value="Club Affiliation Application">Club Affiliation Application</option>
                      <option value="Tournament Entry & Fixtures">Tournament Entry & Fixtures</option>
                      <option value="Selection Trials Clarification">Selection Trials Clarification</option>
                      <option value="Umpiring / Scoring Clinic">Umpiring / Scoring Clinic</option>
                      <option value="General Administration / Other">General Administration / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query, club name, or registration ID..."
                    className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0B1E38] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    Submit Official Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
