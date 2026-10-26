import React, { useState } from 'react';
import { TIMELINE_MILESTONES, PERSONAL_INFO } from '../data/portfolioData';
import { Award, BookOpen, GraduationCap, Wrench, Globe } from 'lucide-react';

export default function AboutSection() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Academic' | 'Technical Engineering' | 'Web Design' | 'Language'>('All');

  const filteredMilestones = TIMELINE_MILESTONES.filter((m) => {
    if (selectedFilter === 'All') return true;
    return m.category === selectedFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      case 'Technical Engineering':
        return <Wrench className="w-4 h-4 text-sky-400" />;
      case 'Web Design':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Language':
        return <Globe className="w-4 h-4 text-indigo-400" />;
      default:
        return <Award className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            01. Professional Background
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Beyond Technology. Driven by Possibility.
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 to-transparent mb-8" />

          {/* Professional Biography */}
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              I'm Akash Khan, an entrepreneur from Gazipur, Bangladesh, with a background in science education and practical technical training. My learning journey has included mobile phone hardware and software engineering, web design, and English communication.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              I am interested in using technology and creative problem-solving to develop practical solutions, explore business opportunities, and build meaningful digital experiences. I value continuous learning, professional growth, and the ability to adapt to an evolving technological world.
            </p>
          </div>
        </div>

        {/* Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Practical Engineering</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Hands-on training in mobile diagnostics, micro-soldering, and firmware servicing with focus on physical reliability.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-950/50 border border-blue-800/40 flex items-center justify-center text-sky-400 mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Digital Design</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Applying modern UI hierarchy, responsive structures, and accessible typography to communicate ideas clearly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-800/40 flex items-center justify-center text-indigo-400 mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Global Communication</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Certified English proficiency (IELTS 6.5, CEFR B2) enabling seamless technical documentation and collaboration.
            </p>
          </div>
        </div>

        {/* Interactive Timeline Heading & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Verified Achievement Milestones
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Documented educational and trade qualifications presented chronologically.
            </p>
          </div>

          {/* Interactive filter tabs (Buttons allowed as functional interactive filters per constitution) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800 self-start sm:self-auto">
            {(['All', 'Technical Engineering', 'Web Design', 'Language', 'Academic'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'Technical Engineering' ? 'Engineering' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10">
          {filteredMilestones.map((milestone, idx) => (
            <div key={`${milestone.year}-${idx}`} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-950 border border-cyan-500/50 flex items-center justify-center shadow-md shadow-cyan-950/40 group-hover:border-cyan-400 transition-colors">
                {getCategoryIcon(milestone.category)}
              </div>

              {/* Milestone Card */}
              <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700 transition-all">
                {/* Unboxed Metadata Header */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span className="text-cyan-400 font-bold text-sm tabular-nums">{milestone.year}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300">{milestone.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{milestone.organization}</span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  {milestone.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {milestone.summary}
                </p>

                <div className="text-xs font-mono text-cyan-300/90 bg-cyan-950/30 border border-cyan-900/40 rounded-lg p-2.5">
                  {milestone.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
