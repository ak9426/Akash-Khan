import React from 'react';
import { Globe, CheckCircle, Info, Headphones, BookOpen, PenTool, Mic } from 'lucide-react';

export default function EnglishProficiency() {
  const scores = [
    {
      skill: 'Listening',
      score: 7.5,
      max: 9.0,
      cefr: 'C1 Competence',
      description: 'Understands complex spoken discourse, academic lectures, and nuance with ease.',
      icon: <Headphones className="w-4 h-4 text-cyan-400" />,
    },
    {
      skill: 'Speaking',
      score: 6.5,
      max: 9.0,
      cefr: 'B2 Competence',
      description: 'Communicates clearly on technical and general topics with spontaneous fluency.',
      icon: <Mic className="w-4 h-4 text-sky-400" />,
    },
    {
      skill: 'Writing',
      score: 6.5,
      max: 9.0,
      cefr: 'B2 Competence',
      description: 'Composes structured technical documentation, reports, and clear professional emails.',
      icon: <PenTool className="w-4 h-4 text-blue-400" />,
    },
    {
      skill: 'Reading',
      score: 5.5,
      max: 9.0,
      cefr: 'B1/B2 Competence',
      description: 'Understands factual technical texts, instruction manuals, and documentation.',
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <section className="py-20 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Summary Block */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
                <Globe className="w-4 h-4" />
                <span>Language Credential</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                English Proficiency — IELTS General Training
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Evaluated through the international standard IELTS examination, certifying independent operational fluency for technical work, international documentation, and professional communication.
              </p>

              {/* Overall Band Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    Overall Band Score
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2 mt-1">
                    <span className="text-cyan-400 tabular-nums">6.5</span>
                    <span className="text-sm font-normal text-slate-400">/ 9.0</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    CEFR Benchmark
                  </div>
                  <div className="text-lg font-bold text-sky-300 mt-1">
                    B2 Independent
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Test Date: Sept 20, 2022
                  </div>
                </div>
              </div>

              {/* Honest Contextual Guidance */}
              <div className="flex items-start gap-2 p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Presented as an authentic assessment record. Standard institutional score validity periods apply based on specific receiving organization criteria.
                </span>
              </div>
            </div>

            {/* Right Breakdown Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scores.map((item) => {
                const percentage = Math.round((item.score / item.max) * 100);
                return (
                  <div
                    key={item.skill}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-white">
                          {item.icon}
                          <span>{item.skill}</span>
                        </div>
                        <div className="text-base font-extrabold text-cyan-400 font-mono tabular-nums">
                          {item.score}
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400 mb-2">
                        {item.cefr}
                      </div>

                      {/* Precise Score Meter Bar */}
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
