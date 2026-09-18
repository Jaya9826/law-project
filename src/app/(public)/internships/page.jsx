'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'
import InternshipSection from '@/components/home/internship-section'
import {
  ChevronRight, Sparkles, BookOpen, Users, Scale, FileText, CheckCircle2,
  Clock, Award, Calendar, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react'

export default function InternshipsPage() {
  const triggerApplicationModal = (domain = 'Civil & Criminal Litigation') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-internship-modal', { detail: { domain } }))
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-zinc-100 font-sans selection:bg-[#dfab31] selection:text-black overflow-x-hidden">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 bg-[#0a0a0c] border-b border-zinc-800/80 overflow-hidden min-h-[480px] flex items-center justify-center">
        {/* Background Image with Home-Page Style Lighting & Warm Shadows */}
        <div className="absolute inset-0 z-0 bg-[#0d0d0f]">
          <Image
            src="/court_hero_banner.jpg"
            alt="Courtroom Gavel and Scales of Justice"
            fill
            className="object-cover select-none brightness-100 contrast-105"
            priority
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-black/35 rounded-full blur-[80px] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-600/20 pointer-events-none z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#dfab31]/12 rounded-full blur-[120px] pointer-events-none z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#dfab31]/40 text-[#dfab31] text-xs font-mono font-semibold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#dfab31]" />
            Student Internship Cohort 2026–2027
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Legal Internship Program
          </h1>
          
          <p className="text-zinc-200 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Fostering the next generation of legal luminaries through hands-on courtroom advocacy, corporate transaction advisory, and direct senior advocate mentorship.
          </p>

          {/* Prominent Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => triggerApplicationModal('Civil & Criminal Litigation')}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#dfab31] hover:bg-[#c89926] text-black text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.35)] hover:shadow-[0_6px_30px_rgba(223,171,49,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-xs"
            >
              <span>Apply for Internship</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#program-details"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black/60 hover:bg-black/80 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-[#dfab31] text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 rounded-xs backdrop-blur-sm"
            >
              Explore Program Details
            </a>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-300 pt-2 drop-shadow-md">
            <Link href="/" className="hover:text-[#dfab31] transition-colors text-zinc-300">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-zinc-400">Careers</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#dfab31]" />
            <span className="text-[#dfab31] font-semibold">Legal Internships</span>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM AT-A-GLANCE STRIP */}
      <section className="bg-[#0f0f13] border-b border-zinc-800/90 py-6 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#dfab31]/10 text-[#dfab31] border border-[#dfab31]/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#dfab31] uppercase tracking-wider font-semibold">Duration</div>
              <div className="text-sm font-bold text-white">4 to 12 Weeks</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#dfab31]/10 text-[#dfab31] border border-[#dfab31]/30 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#dfab31] uppercase tracking-wider font-semibold">Eligibility</div>
              <div className="text-sm font-bold text-white">3rd-5th Yr LL.B / LL.M</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#dfab31]/10 text-[#dfab31] border border-[#dfab31]/30 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#dfab31] uppercase tracking-wider font-semibold">Location</div>
              <div className="text-sm font-bold text-white">Indore & High Court</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#dfab31]/10 text-[#dfab31] border border-[#dfab31]/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#dfab31] uppercase tracking-wider font-semibold">Credentials</div>
              <div className="text-sm font-bold text-white">Certificate & LOR</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EMBEDDED INTERNSHIP SECTION COMPONENT (Quote, Domain Cards & Interactive Modal) */}
      <InternshipSection />

      {/* 4. COMPREHENSIVE PROGRAM DETAILS (Eligibility, Responsibilities, Benefits) */}
      <section id="program-details" className="py-24 px-6 md:px-12 bg-white text-zinc-900 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfab31]/10 text-[#b5851b] text-xs font-mono font-semibold uppercase tracking-wider">
              Curriculum & Guidelines
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-zinc-900 tracking-tight">
              Internship Structure & Requirements
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto mt-2" />
            <p className="text-zinc-600 text-sm sm:text-base font-light pt-2 max-w-2xl mx-auto leading-relaxed">
              We offer serious law students an unvarnished immersion into active Indian courtrooms, chamber research, and real dispute resolution.
            </p>
          </div>

          {/* 3 Pillars: Eligibility, Responsibilities, Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Eligibility */}
            <div className="p-8 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#dfab31] transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#dfab31]/15 text-[#b5851b] flex items-center justify-center font-bold text-xl">
                  01
                </div>
                <h3 className="text-2xl font-bold font-serif text-zinc-900">
                  Eligibility & Criteria
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  Open to sincere students enrolled in recognized law colleges with strong research aptitude.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-zinc-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span><strong>5-Year Integrated LL.B:</strong> 3rd, 4th, or 5th-year students.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span><strong>3-Year LL.B:</strong> 2nd or final-year students.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span><strong>LL.M Scholars:</strong> Corporate, Cyber, or Criminal specialization.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Familiarity with SCC Online, Manupatra, and legal drafting fundamentals.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
                Minimum commitment: 4 Consecutive Weeks
              </div>
            </div>

            {/* Card 2: Responsibilities */}
            <div className="p-8 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#dfab31] transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#dfab31]/15 text-[#b5851b] flex items-center justify-center font-bold text-xl">
                  02
                </div>
                <h3 className="text-2xl font-bold font-serif text-zinc-900">
                  Daily Responsibilities
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  Interns are treated as junior colleagues and participate in actual client matter preparation.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-zinc-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Daily courtroom visits at the High Court Bench & District Courts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Case law research and preparation of comprehensive briefing notes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Assisting senior counsel in drafting writ petitions, plaints, and notices.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Organizing case files, index records, and registry filing documentation.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
                Chamber Hours: 10:00 AM – 6:30 PM (Mon–Sat)
              </div>
            </div>

            {/* Card 3: Benefits & Perks */}
            <div className="p-8 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#dfab31] transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#dfab31]/15 text-[#b5851b] flex items-center justify-center font-bold text-xl">
                  03
                </div>
                <h3 className="text-2xl font-bold font-serif text-zinc-900">
                  Benefits & Recognition
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  Tangible career milestones that distinguish your CV for top law firms and judicial clerkships.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-zinc-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span><strong>Official Certificate:</strong> Formally authenticated chamber certificate.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span><strong>Letter of Recommendation:</strong> Detailed LOR for exemplary performance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Direct personal mentorship under High Court advocates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dfab31] shrink-0 mt-0.5" />
                    <span>Priority consideration for future <strong>Junior Associate</strong> roles upon graduation.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
                Stipend: Merit & performance-based stipend
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHAT INTERNS LEARN & EXPERIENCE (Dark Card Grid) */}
      <section className="py-24 px-6 md:px-12 bg-[#09090c] text-zinc-100 border-t border-zinc-800/90">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Core Practical Skills Gained
            </h2>
            <div className="w-16 h-0.5 bg-[#dfab31] mx-auto mt-2" />
            <p className="text-zinc-400 text-sm sm:text-base font-light pt-2 max-w-2xl mx-auto leading-relaxed">
              Real cases, real judges, and actual litigation briefs. Our interns gain courtroom confidence that textbooks cannot teach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 bg-[#121217] border border-zinc-800 rounded-xl hover:border-[#dfab31] shadow-xl hover:-translate-y-1 transition-all duration-300 group space-y-3.5">
              <div className="w-11 h-11 bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center rounded-lg group-hover:bg-[#dfab31] group-hover:text-black transition-colors duration-300">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#dfab31] transition-colors">
                Court Proceedings
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Attend High Court, District Court, and Tribunal hearings alongside senior advocates daily.
              </p>
            </div>

            <div className="p-7 bg-[#121217] border border-zinc-800 rounded-xl hover:border-[#dfab31] shadow-xl hover:-translate-y-1 transition-all duration-300 group space-y-3.5">
              <div className="w-11 h-11 bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center rounded-lg group-hover:bg-[#dfab31] group-hover:text-black transition-colors duration-300">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#dfab31] transition-colors">
                Pleadings & Drafting
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Draft writ petitions, affidavits, commercial contracts, notices, and written submissions.
              </p>
            </div>

            <div className="p-7 bg-[#121217] border border-zinc-800 rounded-xl hover:border-[#dfab31] shadow-xl hover:-translate-y-1 transition-all duration-300 group space-y-3.5">
              <div className="w-11 h-11 bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center rounded-lg group-hover:bg-[#dfab31] group-hover:text-black transition-colors duration-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#dfab31] transition-colors">
                Legal Research
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Master SCC Online, Manupatra, Westlaw, and case law analytics for complex briefs.
              </p>
            </div>

            <div className="p-7 bg-[#121217] border border-zinc-800 rounded-xl hover:border-[#dfab31] shadow-xl hover:-translate-y-1 transition-all duration-300 group space-y-3.5">
              <div className="w-11 h-11 bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center rounded-lg group-hover:bg-[#dfab31] group-hover:text-black transition-colors duration-300">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#dfab31] transition-colors">
                Client Briefings
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Participate in client consultation meetings and strategic corporate advisory sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMINENT BOTTOM CTA BANNER */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#0e0e13] to-black border-t border-zinc-800 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#dfab31]/12 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfab31]/10 border border-[#dfab31]/30 text-[#dfab31] text-xs font-mono uppercase tracking-widest">
            Applications Open for Upcoming Cohort
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Ready to Accelerate Your Legal Career?
          </h2>
          
          <p className="text-zinc-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Apply online in less than 2 minutes. Our internship intake committee reviews applications rolling weekly.
          </p>

          <div className="pt-3">
            <button
              onClick={() => triggerApplicationModal('Civil & Criminal Litigation')}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#dfab31] hover:bg-[#c89926] text-black text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,49,0.4)] hover:shadow-[0_6px_35px_rgba(223,171,49,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-xs"
            >
              <span>Apply for Internship</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
