import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCv: () => void;
}

export default function Navbar({ onOpenCv }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Vision', href: '#vision' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 border-b border-slate-800/80 shadow-lg shadow-black/40 backdrop-blur-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16 sm:h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="font-mono text-cyan-400 font-normal text-sm tracking-normal">[AK]</span>
            <span>AKASH KHAN</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenCv}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 border border-cyan-500/30 rounded px-2.5 py-1 hover:bg-cyan-500/10 cursor-pointer"
            >
              CV Document
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#030712] bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Progress Indicator */}
      <div className="h-[2px] w-full bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030712]/98 border-b border-slate-800 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full text-center py-2 text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded-lg bg-cyan-950/20 hover:bg-cyan-900/30 transition-colors cursor-pointer"
              >
                View Full CV Document
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold text-[#030712] bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg transition-all"
              >
                Let's Connect
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
