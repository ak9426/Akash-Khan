import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ExternalLink, Layers, CheckCircle, ArrowRight, ShieldCheck, Cpu, Briefcase } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'hardware' | 'software' | 'web'>('all');

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'Verified Trade Training':
        return 'text-emerald-400 bg-emerald-950/30 border-emerald-500/40';
      case 'Applied Case Study':
        return 'text-cyan-400 bg-cyan-950/30 border-cyan-500/40';
      case 'Concept Project':
        return 'text-amber-400 bg-amber-950/30 border-amber-500/40';
      case 'Coming Soon':
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              03. Featured Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              From Technical Knowledge to Practical Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Real-world diagnostic case studies and responsive interface design frameworks. Every project clearly distinguishes verifiable trade work from exploratory applications.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-end">
            {(['all', 'hardware', 'software', 'web'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Works' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
            >
              {/* Media Container with Measured Scrim */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-800/60 flex items-center justify-center">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-950 via-[#040816] to-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-tech-grid">
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 shadow-lg shadow-cyan-950/40">
                      {project.category === 'hardware' ? (
                        <Cpu className="w-6 h-6" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-sky-400" />
                      )}
                    </div>
                    <div className="relative z-10 text-xs font-mono font-semibold text-slate-200">
                      {project.category === 'hardware'
                        ? 'Hardware Diagnostics & Circuit Analysis'
                        : 'Entrepreneurial Initiative & Service Blueprint'}
                    </div>
                    <div className="relative z-10 text-[11px] font-mono text-cyan-400/80 mt-1">
                      Case Study & Specifications Available
                    </div>
                  </div>
                )}

                {/* Number & Status Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-slate-800 backdrop-blur-sm">
                    {project.number}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${getStatusBadgeClass(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Category label */}
                <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300 z-10">
                  {project.categoryLabel}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Tools & Techniques Pills */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Tools & Techniques Applied
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.toolsAndTechniques.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.toolsAndTechniques.length > 3 && (
                        <span className="text-[11px] font-mono text-cyan-400 bg-slate-900/90 border border-cyan-900/40 px-2 py-1 rounded">
                          +{project.toolsAndTechniques.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                  <span>Inspect Case Documentation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
