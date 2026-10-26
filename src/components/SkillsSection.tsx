import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Layout, Briefcase, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { SkillItem } from '../types/portfolio';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-sky-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getLevelBadgeClass = (level: SkillItem['level']) => {
    switch (level) {
      case 'Practical Skills':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
      case 'Technical Training':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
      case 'Developing Expertise':
        return 'text-sky-300 border-sky-500/30 bg-sky-950/20';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-900';
    }
  };

  const currentCategory = SKILL_CATEGORIES[activeTab];

  return (
    <section id="skills" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            02. Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Skills & Technical Expertise
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Distinguished by practical vocational qualification and honest capability ratings. No artificial percentages—only concrete proficiencies validated through training and project work.
          </p>
        </div>

        {/* Domain Segmented Tabs (Functional interactive buttons per constitution) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800/80 mb-10">
          {SKILL_CATEGORIES.map((category, idx) => (
            <button
              key={category.title}
              onClick={() => {
                setActiveTab(idx);
                setSelectedSkill(null);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-slate-900 text-white border border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {getCategoryIcon(category.iconName)}
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Active Domain Overview Banner */}
        <div className="mb-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span>{currentCategory.title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentCategory.subtitle}</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Practical Skills</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technical Training</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Developing Expertise</span>
            </span>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.skills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all duration-200 flex flex-col justify-between group cursor-pointer shadow-md hover:shadow-cyan-950/20"
            >
              <div>
                {/* Level Tag Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${getLevelBadgeClass(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Skill Name */}
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {skill.name}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Focus Points List */}
              <div className="pt-4 border-t border-slate-800/70">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                  Key Capabilities
                </div>
                <div className="space-y-1.5">
                  {skill.focusAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Quick Detail Modal / Drawer */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span
                  className={`text-xs font-mono font-medium px-3 py-1 rounded-full border ${getLevelBadgeClass(
                    selectedSkill.level
                  )}`}
                >
                  {selectedSkill.level}
                </span>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{selectedSkill.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{selectedSkill.description}</p>

              <div className="mb-6">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">
                  Verified Hands-On Components
                </div>
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  {selectedSkill.focusAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-start gap-2 p-3 bg-cyan-950/20 border border-cyan-900/40 rounded-lg">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Proficiency documented through practical coursework at Modern Technical Training Institute, Gazipur or recognized trade courses.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
