import React from 'react';
import { ArrowDown, ExternalLink, ShieldCheck, FileText, MapPin } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenCv: () => void;
}

export default function HeroSection({ onOpenCv }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 lg:pt-32 flex flex-col justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Main 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typographic Branding & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Location & Status Marker (unboxed clean text) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-4 tracking-wide">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{PERSONAL_INFO.coordinates}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-300">Verified Technical Training</span>
            </div>

            {/* Subtitle / Professional Identity */}
            <p className="text-sm sm:text-base font-semibold tracking-wider uppercase text-cyan-400 mb-2 font-mono">
              {PERSONAL_INFO.identity}
            </p>

            {/* Primary Name Display */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              AKASH KHAN
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-lg sm:text-xl font-medium text-slate-200 mb-4 leading-snug">
              {PERSONAL_INFO.headline}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
              {PERSONAL_INFO.bioSummary}
            </p>

            {/* Action Buttons & Links */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#030712] bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
              >
                Explore My Work
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all whitespace-nowrap cursor-pointer"
              >
                Let's Connect
              </a>

              {/* View Credentials */}
              <a
                href="#credentials"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Credentials</span>
              </a>

              {/* CV Modal Trigger */}
              <button
                onClick={onOpenCv}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View CV</span>
              </button>
            </div>

            {/* Unboxed Metadata Strip */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-mono">
              <span>Mobile Phone Engineering (Grade A)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>IELTS Band 6.5 (B2)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Web Design (10MS)</span>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece Viewport */}
          <div className="lg:col-span-6 relative">
            <Hero3DCanvas />

            {/* Floating Interface Markers */}
            <div className="absolute -top-3 -right-2 hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-cyan-500/30 rounded-md text-[10px] font-mono text-cyan-300 shadow-xl backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>DIGITAL DESIGN</span>
            </div>

            <div className="absolute bottom-16 -left-3 hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-cyan-500/30 rounded-md text-[10px] font-mono text-cyan-300 shadow-xl backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>ENGINEERING</span>
            </div>

            <div className="absolute -bottom-3 right-8 hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-blue-500/30 rounded-md text-[10px] font-mono text-sky-300 shadow-xl backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>ENTREPRENEURSHIP</span>
            </div>
          </div>
        </div>

        {/* Lower Strip: Verified Identity & Portrait Card */}
        <div className="mt-14 pt-8 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Portrait & Formal Identity */}
          <div className="md:col-span-7 flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 shrink-0 shadow-lg shadow-cyan-950/40">
              <img
                src={PERSONAL_INFO.portraitImage}
                alt="Md. Jamiur Rahman Khan Akash (Akash Khan)"
                className="w-full h-full object-cover object-[center_18%]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-0.5">
                Official Identity
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {PERSONAL_INFO.fullName}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                Gazipur, Bangladesh · Mobile Hardware & Software Trade Specialist · Web Design Enthusiast
              </p>
            </div>
          </div>

          {/* Quick Metrics / Verified Foundations (Tabular unboxed figures) */}
          <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-6 text-xs text-slate-400 font-mono">
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg tabular-nums">6 Months</span>
              <span className="text-[11px] text-slate-400">Trade Training</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-cyan-400 font-bold text-base sm:text-lg tabular-nums">6.5 Band</span>
              <span className="text-[11px] text-slate-400">IELTS B2 Level</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg tabular-nums">4.75 GPA</span>
              <span className="text-[11px] text-slate-400">SSC Science</span>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-mono"
            aria-label="Scroll to About section"
          >
            <span>DISCOVER</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
