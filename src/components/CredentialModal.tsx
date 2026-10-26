import React, { useEffect } from 'react';
import { Credential } from '../types/portfolio';
import { X, ShieldCheck, Lock, CheckCircle2, Calendar, Building, Award } from 'lucide-react';

interface CredentialModalProps {
  credential: Credential | null;
  onClose: () => void;
}

export default function CredentialModal({ credential, onClose }: CredentialModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (credential) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [credential, onClose]);

  if (!credential) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          aria-label="Close credential viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Verification Header */}
        <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-400 mb-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>VERIFIED CREDENTIAL ARCHIVE</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          {credential.title}
        </h3>

        <div className="text-sm font-semibold text-slate-300 mb-1">
          {credential.institution}
        </div>
        {credential.boardOrProvider && (
          <div className="text-xs text-slate-400 mb-4">
            {credential.boardOrProvider}
          </div>
        )}

        {/* Grade / Score Highlight */}
        {credential.gradeOrScore && (
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-slate-300">Certified Evaluation Result:</span>
            <span className="text-sm sm:text-base font-mono font-bold text-cyan-300">
              {credential.gradeOrScore}
            </span>
          </div>
        )}

        {/* IELTS Breakdown if available */}
        {credential.scoreBreakdown && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase mb-3">
              Official Component Band Breakdown
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {credential.scoreBreakdown.map((s) => (
                <div key={s.label} className="p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                  <div className="text-[11px] font-mono text-slate-400">{s.label}</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono tabular-nums">{s.score}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Details Checklist */}
        <div className="mb-6">
          <div className="text-xs font-mono text-slate-400 uppercase mb-3">
            Certificate & Document Parameters
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            {credential.verifiedDetails.map((detail) => (
              <div key={detail} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">
            Program Description
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {credential.description}
          </p>
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{credential.privacyNote}</span>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
}
