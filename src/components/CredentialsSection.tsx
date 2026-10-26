import React, { useState } from 'react';
import { CREDENTIALS } from '../data/portfolioData';
import { Credential } from '../types/portfolio';
import { ShieldCheck, Award, Lock, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface CredentialsSectionProps {
  onSelectCredential: (cred: Credential) => void;
}

export default function CredentialsSection({ onSelectCredential }: CredentialsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'technical' | 'academic' | 'language' | 'ai'>('all');

  const filteredCredentials = CREDENTIALS.filter((c) => {
    if (filter === 'all') return true;
    return c.category === filter;
  });

  return (
    <section id="credentials" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              04. Academic & Professional Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Verified Qualifications & Trade Accreditations
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Every certificate listed is backed by authentic training records and official boards. Candidate registration numbers and dates of birth are omitted to uphold identity security.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-end">
            {(['all', 'technical', 'language', 'academic', 'ai'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all'
                  ? 'All Credentials'
                  : cat === 'technical'
                  ? 'Technical'
                  : cat === 'language'
                  ? 'Language'
                  : cat === 'academic'
                  ? 'Academic'
                  : 'Gen AI'}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredentials.map((cred) => (
            <div
              key={cred.id}
              onClick={() => onSelectCredential(cred)}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/40 transition-all duration-200 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-cyan-950/30"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>{cred.categoryLabel}</span>
                  </div>
                  {cred.gradeOrScore && (
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
                      {cred.gradeOrScore}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {cred.title}
                </h3>

                {/* Institution & Dates */}
                <div className="text-xs text-slate-300 mb-1 font-medium">
                  {cred.institution}
                </div>
                {cred.boardOrProvider && (
                  <div className="text-xs text-slate-400 mb-3">
                    {cred.boardOrProvider}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-slate-800/80">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{cred.displayDate}</span>
                </div>

                {/* Score Breakdown if IELTS */}
                {cred.scoreBreakdown && (
                  <div className="mb-4 grid grid-cols-4 gap-2 text-center p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    {cred.scoreBreakdown.slice(0, 4).map((s) => (
                      <div key={s.label}>
                        <div className="text-[10px] font-mono text-slate-400">{s.label}</div>
                        <div className="text-xs font-bold text-cyan-300 tabular-nums">{s.score}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Summary */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {cred.description}
                </p>
              </div>

              {/* Security & Action Footer */}
              <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Protected ID</span>
                </span>
                <span className="text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                  <span>Inspect Record</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
