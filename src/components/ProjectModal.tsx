import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, CheckCircle, Wrench, ShieldCheck, ArrowRight, Cpu, Briefcase } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Media */}
        <div className="relative aspect-[16/9] w-full bg-slate-900 border-b border-slate-800 flex items-center justify-center overflow-hidden">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-[#040816] to-slate-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-tech-grid">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-xl shadow-cyan-950/40">
                {project.category === 'hardware' ? <Cpu className="w-8 h-8" /> : <Briefcase className="w-8 h-8 text-sky-400" />}
              </div>
              <div className="text-sm font-mono text-slate-200 font-semibold">{project.title}</div>
              <div className="text-xs font-mono text-cyan-400 mt-1">Verified Technical Case Study Documentation</div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
              Project {project.number}
            </span>
            <span className="text-xs font-mono px-3 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300">
              {project.status}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              {project.categoryLabel}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Project Overview
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Tools & Techniques */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Tools & Diagnostic Equipment
            </div>
            <div className="flex flex-wrap gap-2">
              {project.toolsAndTechniques.map((tool) => (
                <span
                  key={tool}
                  className="text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Roles & Responsibilities */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Role & Technical Execution
            </div>
            <div className="space-y-2">
              {project.roleAndResponsibilities.map((role) => (
                <div key={role} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <Wrench className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verifiable Outcomes */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Documented & Verifiable Outcomes
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/40 space-y-2">
              {project.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2.5 text-xs sm:text-sm text-cyan-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
