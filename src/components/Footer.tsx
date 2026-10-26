import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCv: () => void;
}

export default function Footer({ onOpenCv }: FooterProps) {
  const [bdTime, setBdTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Bangladesh Standard Time (UTC+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setBdTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#02050e] border-t border-slate-900 text-slate-400 py-16 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Identity */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors inline-block"
            >
              MD. JAMIUR RAHMAN KHAN AKASH
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Technology-focused entrepreneur from Gazipur, Bangladesh. Mobile phone engineering, diagnostic hardware troubleshooting, and responsive digital web interfaces.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-xs pt-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Gazipur, Bangladesh (BST, UTC+6) — {bdTime || '12:00 PM'}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#home" className="hover:text-cyan-400 transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">
                About Me
              </a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">
                Technical Skills
              </a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">
                Featured Projects
              </a>
              <a href="#credentials" className="hover:text-cyan-400 transition-colors">
                Credentials & Trade
              </a>
              <a href="#vision" className="hover:text-cyan-400 transition-colors">
                Guiding Vision
              </a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">
                Direct Contact
              </a>
              <button
                onClick={onOpenCv}
                className="text-left hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Curriculum Vitae
              </button>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Direct Inquiries
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-cyan-300 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-cyan-300 transition-colors">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="text-slate-400">
                Gazipur, Dhaka Division, Bangladesh
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Md. Jamiur Rahman Khan Akash (Akash Khan). All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
