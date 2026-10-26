import React, { useState } from 'react';
import { VISION_PILLARS } from '../data/portfolioData';
import { Wrench, Sparkles, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function EntrepreneurialVision() {
  const [activePillar, setActivePillar] = useState(0);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-blue-400" />;
      default:
        return <Wrench className="w-6 h-6 text-cyan-400" />;
    }
  };

  const selected = VISION_PILLARS[activePillar];

  return (
    <section id="vision" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            05. Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Think Creatively. Build Practically. Grow Continuously.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            The three guiding tenets that inform Akash Khan's approach to technical diagnostics, digital web design, and exploratory ventures.
          </p>
        </div>

        {/* 3 Interactive Feature Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {VISION_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              onClick={() => setActivePillar(idx)}
              className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                activePillar === idx
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
                  {pillar.subtitle}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>{activePillar === idx ? 'Currently Viewing' : 'Select Pillar'}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${activePillar === idx ? 'translate-x-1 text-cyan-300' : 'text-slate-400'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Focus Deep Dive Area */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950/80 border border-slate-800/90 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <span>Deep-Dive Focus Area</span>
              <span aria-hidden="true">·</span>
              <span>{selected.title}</span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {selected.subtitle}
            </h4>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {selected.detail}
            </p>

            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Core Operational Disciplines
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selected.disciplines.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
