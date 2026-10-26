import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CredentialsSection from './components/CredentialsSection';
import EnglishProficiency from './components/EnglishProficiency';
import EntrepreneurialVision from './components/EntrepreneurialVision';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CredentialModal from './components/CredentialModal';
import CvModal from './components/CvModal';
import { Project, Credential } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar onOpenCv={() => setIsCvOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive 3D Centerpiece */}
        <HeroSection onOpenCv={() => setIsCvOpen(true)} />

        {/* About Section & Documented Milestone Timeline */}
        <AboutSection />

        {/* Skills & Technical Expertise */}
        <SkillsSection />

        {/* Featured Projects & Practical Work */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Credentials & Certificate Gallery */}
        <CredentialsSection onSelectCredential={(cred) => setSelectedCredential(cred)} />

        {/* Language Proficiency — IELTS Band 6.5 Visualization */}
        <EnglishProficiency />

        {/* Personal Brand & Entrepreneurial Vision */}
        <EntrepreneurialVision />

        {/* Direct Contact & Verified Message Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenCv={() => setIsCvOpen(true)} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CredentialModal
        credential={selectedCredential}
        onClose={() => setSelectedCredential(null)}
      />

      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />
    </div>
  );
}
