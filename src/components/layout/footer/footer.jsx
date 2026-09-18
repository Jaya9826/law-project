'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Scale,
  Phone,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ChevronRight,
  Lock
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#070608] text-zinc-400 pt-20 pb-12 overflow-hidden relative selection:bg-[#dfab31] selection:text-black border-t border-zinc-900/80">

      {/* Right Side: Neoclassical Courthouse Columns with JUSTICE Entablature */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[50%] lg:w-[45%] pointer-events-none overflow-hidden select-none z-0">
        <div className="relative w-full h-full opacity-45 mix-blend-screen">
          <Image
            src="/footer_courthouse_columns.jpg"
            alt="Courthouse Columns"
            fill
            className="object-cover object-right-top"
            priority
          />
        </div>
        {/* Soft Left Gradient Fade so text stays 100% crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070608] via-[#070608]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070608] via-transparent to-[#070608]/70" />
      </div>

      {/* Top Right Golden Volumetric Sunbeam Glow */}
      <div className="absolute -top-12 right-0 w-[550px] h-[350px] bg-gradient-to-b from-[#dfab31]/22 via-amber-600/12 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Bottom Left Curved Golden Accent Glow */}
      <div className="absolute -bottom-24 -left-20 w-[420px] h-[420px] bg-gradient-to-tr from-[#dfab31]/15 via-amber-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Col 1: Logo, Mission Statement & Enhanced Contact Cards */}
          <div className="lg:col-span-4 space-y-5">

            {/* Circular Logo matching reference design */}
            <Link href="/" className="inline-flex items-center gap-3.5 group focus:outline-none">
              <div className="w-11 h-11 rounded-full border border-[#dfab31]/70 flex items-center justify-center text-[#dfab31] bg-black/50 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(223,171,49,0.25)] shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif tracking-wider text-white group-hover:text-[#dfab31] transition-colors">
                  JUSTICA
                </span>
                <span className="block text-[8.5px] tracking-[0.28em] text-[#dfab31] font-mono -mt-0.5 uppercase font-semibold">
                  Counselors at Law
                </span>
              </div>
            </Link>

            {/* Horizontal Gold Line under Logo */}
            <div className="w-12 h-[2px] bg-[#dfab31]" />

            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
              Justica is a premier international law firm dedicated to safeguarding client rights, courtroom litigation, and corporate transaction advisory with unyielding integrity.
            </p>

            {/* Contact Details with Rounded Gold Accent Boxes */}
            <div className="space-y-3 pt-1 text-xs sm:text-[13px]">

              {/* Location Card */}
              <div className="flex items-center gap-3.5 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-[#dfab31]/10 border border-[#dfab31]/30 text-[#dfab31] flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-zinc-300 group-hover:text-white transition-colors leading-relaxed text-xs">
                  120 Wall Street, Financial District,<br />New York, NY 10005
                </span>
              </div>

              {/* Mobile / Phone Card */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-lg bg-[#dfab31]/10 border border-[#dfab31]/30 text-[#dfab31] flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:12003009000" className="text-zinc-300 group-hover:text-[#dfab31] font-medium transition-colors text-xs">
                  +1 200 300 9000 / +91 98765 43210
                </a>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-lg bg-[#dfab31]/10 border border-[#dfab31]/30 text-[#dfab31] flex items-center justify-center shrink-0 group-hover:bg-[#dfab31] group-hover:text-black transition-all duration-300 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@justica-law.com" className="text-zinc-300 group-hover:text-[#dfab31] transition-colors text-xs">
                  info@justica-law.com
                </a>
              </div>

            </div>

            {/* Circular Social Icons with Subtle Dark Borders */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#dfab31] hover:border-[#dfab31] transition-all duration-300 shadow-sm" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#dfab31] hover:border-[#dfab31] transition-all duration-300 shadow-sm" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#dfab31] hover:border-[#dfab31] transition-all duration-300 shadow-sm" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#dfab31] hover:border-[#dfab31] transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#dfab31] font-mono">
                QUICK LINKS
              </h4>
              <div className="w-9 h-[2px] bg-[#dfab31] mt-2 mb-4" />
            </div>

            <ul className="space-y-3 text-xs sm:text-[13px]">
              <li>
                <Link href="/" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Home Page</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">About Firm</span>
                </Link>
              </li>
              <li>
                <Link href="/about#gallery" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Our Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/internships" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Legal Internships</span>
                </Link>
              </li>
              <li>
                <Link href="/junior-advocate-jobs" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Junior Advocate Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Recent News</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Book Intake</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal Services */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#dfab31] font-mono">
                LEGAL SERVICES
              </h4>
              <div className="w-9 h-[2px] bg-[#dfab31] mt-2 mb-4" />
            </div>

            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Civil & Criminal Litigation</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Constitutional Law Matters</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Employment & Service Matter</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">IPR (Intellectual Property)</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Cyber Security & Tech Law</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Corporate Law</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">Consumer Protection & Real Estate</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-zinc-300 hover:text-white flex items-center gap-2 group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#dfab31] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:text-[#dfab31] transition-colors">IBC (Insolvency & Bankruptcy)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal Insights + Law builds a better tomorrow Accent Quote */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#dfab31] font-mono">
                LEGAL INSIGHTS
              </h4>
              <div className="w-9 h-[2px] bg-[#dfab31] mt-2 mb-4" />
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
              Subscribe to our monthly journal of corporate jurisprudence and Supreme Court case summaries.
            </p>

            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 pt-1">
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!') }} className="space-y-3.5 w-full flex-1">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="w-full bg-[#121115]/95 border border-zinc-700/80 rounded-lg pl-10 pr-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#dfab31] focus:ring-1 focus:ring-[#dfab31]/50 transition-colors shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold rounded-lg bg-[#dfab31] hover:bg-[#c89926] text-zinc-950 transition-all duration-300 shadow-[0_4px_20px_rgba(223,171,49,0.35)] hover:shadow-[0_6px_25px_rgba(223,171,49,0.5)] uppercase tracking-wider font-mono cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>SUBSCRIBE NOW</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Privacy Badge with Lock Icon */}
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-0.5">
                  <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>We respect your privacy. No spam, ever.</span>
                </div>
              </form>

              {/* Vertical Golden Bar + Law builds a better tomorrow Quote */}
              <div className="flex items-center gap-3.5 pl-3 border-l-2 border-[#dfab31] shrink-0 self-center py-1">
                <p className="font-serif italic text-amber-100/90 text-sm sm:text-[15px] leading-snug">
                  Law<br />builds a<br />better<br />tomorrow.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Centered Motto Bar: JUSTICE TODAY. A BETTER TOMORROW. */}
        <div className="flex items-center justify-center gap-4 py-8 border-t border-zinc-800/80 mt-14">
          <div className="w-12 sm:w-20 h-[1.5px] bg-[#dfab31]" />
          <span className="text-xs sm:text-[13px] font-mono tracking-[0.25em] text-[#dfab31] uppercase font-bold text-center">
            JUSTICE TODAY. A BETTER TOMORROW.
          </span>
          <div className="w-12 sm:w-20 h-[1.5px] bg-[#dfab31]" />
        </div>

        {/* Footer Bottom Copyright & Legal Links Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400 gap-4 border-t border-zinc-900">
          <p className="text-zinc-400 text-xs">
            © {new Date().getFullYear()} Justica Counselors at Law. All rights reserved. Attorney Advertising.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#" className="hover:text-[#dfab31] transition-colors">Disclosures</a>
            <a href="#" className="hover:text-[#dfab31] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#dfab31] transition-colors">Accessibility</a>
            <a href="#" className="hover:text-[#dfab31] transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
