import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, AlertCircle, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    referenceId: string;
    timestamp: string;
    message: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide message details.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected message.');
      }

      setSubmitSuccess({
        referenceId: data.referenceId,
        timestamp: data.timestamp,
        message: data.message,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setServerError(err.message || 'Unable to transmit message. Please verify network connectivity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#030712] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            06. Direct Communication
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Have an Idea? Let's Build Something Meaningful.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether you're interested in a technical project, a web design collaboration, a business opportunity, or simply connecting professionally, I'd be glad to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase">Direct Email</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-cyan-400 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20-%20Akash%20Khan`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#030712] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-md">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">
                  Telephone Contact
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-cyan-400 transition-colors font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Call Me</span>
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-md">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-2">
                  Base Location
                </div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Timezone: Bangladesh Standard Time (BST, UTC+6)
                </p>
              </div>
            </div>

            {/* Response Commitment Note */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 text-xs text-slate-400 leading-relaxed font-mono">
              Inquiries regarding technical hardware consulting, mobile troubleshooting, or responsive web design are acknowledged within 24-48 hours.
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800/90 shadow-2xl relative">
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transmitted via secure backend dispatch to Akash Khan
                  </p>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
                  API Integrated
                </span>
              </div>

              {/* Success State */}
              {submitSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Transmitted</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {submitSuccess.message}
                  </p>

                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-left max-w-md mx-auto space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reference ID:</span>
                      <span className="text-cyan-300 font-semibold">{submitSuccess.referenceId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-slate-300">
                        {new Date(submitSuccess.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="mt-6 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {serverError && (
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 flex items-center gap-3 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Ahmed"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          formErrors.name
                            ? 'border-red-500/80 focus:border-red-400'
                            : 'border-slate-800 focus:border-cyan-500/80'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          formErrors.email
                            ? 'border-red-500/80 focus:border-red-400'
                            : 'border-slate-800 focus:border-cyan-500/80'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject / Topic <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Mobile Engineering Consultation / Web Design Project"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.subject
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-slate-800 focus:border-cyan-500/80'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message Details <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline the scope of your inquiry, device failure symptoms, or project goals..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-y ${
                        formErrors.message
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-slate-800 focus:border-cyan-500/80'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 text-sm font-semibold text-[#030712] bg-gradient-to-r from-cyan-400 to-sky-300 rounded-xl hover:from-cyan-300 hover:to-sky-200 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Inquiries...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
