import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, CREDENTIALS, SKILL_CATEGORIES } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 p-6 sm:p-10 text-slate-100 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>OFFICIAL CURRICULUM VITAE · VERIFIED DATA RECORD</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-cyan-400 hover:bg-cyan-300 text-[#030712] rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Header */}
        <div className="border-b border-slate-800 print:border-black/20 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight mb-1">
              {PERSONAL_INFO.fullName}
            </h1>
            <div className="text-base font-semibold text-cyan-400 print:text-slate-800 mb-2">
              Known Professionally as: {PERSONAL_INFO.professionalName}
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-400 print:text-slate-600 mb-4">
              {PERSONAL_INFO.identity}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 print:text-slate-800">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600 print:text-slate-400">·</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>{PERSONAL_INFO.phone}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600 print:text-slate-400">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-cyan-500/40 print:border-slate-400 bg-slate-900 shrink-0 shadow-md">
            <img
              src={PERSONAL_INFO.portraitImage}
              alt={PERSONAL_INFO.fullName}
              className="w-full h-full object-cover object-[center_18%]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-cyan-400 print:text-black uppercase tracking-wider mb-2 font-bold">
            01. Professional Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            {PERSONAL_INFO.fullBio}
          </p>
        </div>

        {/* Technical Trade Qualifications */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-cyan-400 print:text-black uppercase tracking-wider mb-3 font-bold">
            02. Technical Trade Qualifications
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="text-sm font-bold text-white print:text-black">
                  Mobile Phone Engineering — Hardware & Software
                </h3>
                <span className="text-xs font-mono text-cyan-400 print:text-black font-semibold">
                  Result: Grade A
                </span>
              </div>
              <div className="text-xs text-slate-400 print:text-slate-600 mb-2">
                Modern Technical Training Institute · Joydebpur, Gazipur, Bangladesh
              </div>
              <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed mb-2">
                6-Month comprehensive trade course covering smartphone hardware diagnostics, board-level micro-soldering, power management IC analysis, and Android/iOS firmware servicing.
              </p>
              <div className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                Examination Date: March 15, 2025 · Document Notation: May 19, 2026
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="text-sm font-bold text-white print:text-black">
                  Web Design Certification
                </h3>
                <span className="text-xs font-mono text-cyan-400 print:text-black font-semibold">
                  Verified Completion
                </span>
              </div>
              <div className="text-xs text-slate-400 print:text-slate-600 mb-2">
                10 Minute School (Online Platform) · Completed February 27, 2022
              </div>
              <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed">
                Fundamental website design, modern user interface structure, responsive front-end layout principles, and semantic HTML/CSS styling.
              </p>
            </div>
          </div>
        </div>

        {/* Language Proficiency */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-cyan-400 print:text-black uppercase tracking-wider mb-3 font-bold">
            03. International Language Proficiency
          </h2>
          <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <h3 className="text-sm font-bold text-white print:text-black">
                IELTS General Training Examination
              </h3>
              <span className="text-xs font-mono text-cyan-400 print:text-black font-semibold">
                Overall Band: 6.5 (CEFR B2 Level)
              </span>
            </div>
            <div className="text-xs text-slate-400 print:text-slate-600 mb-3">
              Official Testing Partner (IDP / British Council / Cambridge) · Test Date: September 20, 2022
            </div>
            <div className="grid grid-cols-4 gap-2 text-center p-2 rounded-lg bg-slate-950 print:bg-white border border-slate-800 print:border-slate-300 text-xs font-mono">
              <div>
                <span className="text-slate-400 print:text-slate-600 text-[10px] block">Listening</span>
                <span className="font-bold text-cyan-400 print:text-black">7.5</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 text-[10px] block">Speaking</span>
                <span className="font-bold text-cyan-400 print:text-black">6.5</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 text-[10px] block">Writing</span>
                <span className="font-bold text-cyan-400 print:text-black">6.5</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-600 text-[10px] block">Reading</span>
                <span className="font-bold text-cyan-400 print:text-black">5.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Foundations */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-cyan-400 print:text-black uppercase tracking-wider mb-3 font-bold">
            04. Academic Education
          </h2>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/40 print:bg-slate-50 border border-slate-800 print:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs sm:text-sm font-bold text-white print:text-black">
                  Higher Secondary Certificate (HSC) — Science Group
                </div>
                <div className="text-xs text-slate-400 print:text-slate-600">
                  Dhaka Megacity College · Board of Intermediate and Secondary Education, Dhaka (2016)
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-cyan-400 print:text-black">
                GPA 3.75 / 5.00
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/40 print:bg-slate-50 border border-slate-800 print:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs sm:text-sm font-bold text-white print:text-black">
                  Secondary School Certificate (SSC) — Science Group
                </div>
                <div className="text-xs text-slate-400 print:text-slate-600">
                  Gawair Adarsha High School · Board of Intermediate and Secondary Education, Dhaka (2014)
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-cyan-400 print:text-black">
                GPA 4.75 / 5.00
              </div>
            </div>
          </div>
        </div>

        {/* Additional Continuous Learning */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-cyan-400 print:text-black uppercase tracking-wider mb-2 font-bold">
            05. Continuing Development
          </h2>
          <div className="p-3.5 rounded-xl bg-slate-900/40 print:bg-slate-50 border border-slate-800 print:border-slate-300">
            <div className="text-xs sm:text-sm font-bold text-white print:text-black">
              Generative AI Mastermind — Certificate of Completion
            </div>
            <div className="text-xs text-slate-400 print:text-slate-600">
              Outskill · Awarded to Akash Khan · Prompt engineering & AI workflow acceleration
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="pt-6 border-t border-slate-800 print:border-black/20 text-[11px] font-mono text-slate-400 print:text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>Identity verified. Candidate registration and roll numbers protected for privacy.</span>
          <span>Gazipur, Bangladesh · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
