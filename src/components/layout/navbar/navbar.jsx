'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Scale, Phone, Facebook, Twitter, Instagram, Linkedin,
  ChevronDown, Menu, X, ArrowRight, GraduationCap, Briefcase
} from 'lucide-react'

// About dropdown links
const aboutLinks = [
  { title: "About Us", href: "/about" },
  { title: "Our Gallery", href: "/about#gallery" },
  { title: "The Team", href: "/team" },
  { title: "FAQ", href: "/faq" }
]

// Area of Expertise list for dropdown mapping
const expertiseAreas = [
  { title: "Industry-wise", href: "/#practice-grid" },
  { title: "Litigation", href: "/#practice-grid" },
  { title: "Non-Litigation", href: "/#practice-grid" }
]

// Services list for dropdown mapping (From Chambers Board)
const serviceLinks = [
  { title: "Civil & Criminal Litigation", href: "/appointment" },
  { title: "Constitutional Law Matters", href: "/appointment" },
  { title: "Employment & Service Matter", href: "/appointment" },
  { title: "IPR (Intellectual Property Rights)", href: "/appointment" },
  { title: "Cyber Security & Technology Law", href: "/appointment" },
  { title: "Corporate Law", href: "/appointment" },
  { title: "Consumer Protection & Real Estate", href: "/appointment" },
  { title: "IBC (Insolvency & Bankruptcy Code)", href: "/appointment" }
]

// Careers dropdown options
const careerLinks = [
  {
    title: "Legal Internships",
    category: "Students / LL.B",
    description: "Courtroom exposure, research & mentorship program for law students",
    href: "/internships",
    icon: GraduationCap
  },
  {
    title: "Junior Advocate Jobs",
    category: "Enrolled Advocates",
    description: "Associate positions, High Court litigation & corporate advisory",
    href: "/junior-advocate-jobs",
    icon: Briefcase
  }
]

export default function Navbar() {
  const pathname = usePathname() || ''
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(menu)
    }
  }

  // Active link state checkers based on current route
  const isHomeActive = pathname === '/'
  const isAboutActive = pathname === '/about' || pathname === '/team' || pathname === '/faq'
  const isNewsActive = pathname === '/news' || pathname.startsWith('/news/')
  const isCareersActive = pathname === '/internships' || pathname.startsWith('/internships/') || pathname === '/junior-advocate-jobs' || pathname.startsWith('/junior-advocate-jobs/')
  const isAppointmentActive = pathname === '/appointment' || pathname.startsWith('/appointment/')

  return (
    <div className={`z-50 w-full transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 bg-[#0d0d0f] shadow-2xl' : 'absolute top-0 left-0 right-0 bg-transparent pointer-events-none'}`}>
      
      {/* 1. TOP ANNOUNCEMENT BAR (ENLARGED FONT) */}
      {!isScrolled && (
        <div className="bg-black text-sm sm:text-[15px] py-2.5 px-4 hidden md:block pointer-events-auto">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-zinc-300">
            <div className="flex items-center space-x-5">
              <a href="#" className="flex items-center gap-1.5" aria-label="Facebook">
                <Facebook className="w-4.5 h-4.5 text-zinc-400 hover:text-[#dfab31] transition-colors" />
              </a>
              <a href="#" className="flex items-center gap-1.5" aria-label="Twitter">
                <Twitter className="w-4.5 h-4.5 text-zinc-400 hover:text-[#dfab31] transition-colors" />
              </a>
              <a href="#" className="flex items-center gap-1.5" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5 text-zinc-400 hover:text-[#dfab31] transition-colors" />
              </a>
            </div>
            <div className="flex items-center space-x-7 font-medium text-sm sm:text-[15px]">
              <a href="#" className="hover:text-[#dfab31] transition-colors">Privacy Policy</a>
              <Link href="/appointment" className="hover:text-[#dfab31] transition-colors">Request Quote</Link>
              <Link href="/faq" className="hover:text-[#dfab31] transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN NAVBAR */}
      <header className={`pointer-events-auto transition-all duration-300 ${isScrolled ? 'bg-[#0d0d0f] py-3.5 border-b border-zinc-900' : 'bg-black/30 backdrop-blur-md py-4 md:py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-10 flex justify-between items-center gap-4">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="p-2 border border-[#dfab31] rounded-full text-[#dfab31] transition-all duration-300 group-hover:scale-105">
              <Scale className="w-5 h-5 text-[#dfab31] transition-colors" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-wider text-zinc-100 group-hover:text-[#dfab31] transition-colors leading-none">
                JUSTICA
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.25em] text-zinc-400 font-mono uppercase mt-1">
                COUNSELORS AT LAW
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (REDUCED FONT SIZE & EXPANDED SPACING) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-auto">
            {/* Home */}
            <div className="relative group">
              <Link 
                href="/"
                className={`flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none ${
                  isHomeActive 
                    ? 'text-[#dfab31] border-b-2 border-[#dfab31] pb-1' 
                    : 'text-zinc-200 hover:text-[#dfab31] py-1.5'
                }`}
              >
                Home
              </Link>
            </div>

            {/* About (Active if on /about, /team, or /faq) */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('about')}
                className={`flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none ${
                  isAboutActive 
                    ? 'text-[#dfab31] border-b-2 border-[#dfab31] pb-1' 
                    : 'text-zinc-200 hover:text-white py-1.5'
                }`}
              >
                About <ChevronDown className={`w-3.5 h-3.5 transition-colors ${isAboutActive ? 'text-[#dfab31]' : 'text-zinc-400 group-hover:text-[#dfab31]'}`} />
              </button>
              <div className="absolute left-0 mt-1 w-52 bg-zinc-950 border border-zinc-800/90 rounded-md shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {aboutLinks.map((item, i) => {
                  const isSubActive = pathname === item.href
                  return (
                    <Link 
                      key={i} 
                      href={item.href} 
                      className={`block px-5 py-2.5 text-sm font-medium transition-colors ${
                        isSubActive 
                          ? 'text-[#dfab31] bg-zinc-900 font-bold' 
                          : 'text-zinc-200 hover:text-[#dfab31] hover:bg-zinc-900/80'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Area of Expertise */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('expertise')}
                className="flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap text-zinc-200 hover:text-white py-1.5 focus:outline-none transition-colors"
              >
                Area of Expertise <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#dfab31]" />
              </button>
              <div className="absolute left-0 mt-1 w-56 bg-zinc-950 border border-zinc-800/90 rounded-md shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {expertiseAreas.map((area, i) => (
                  <Link 
                    key={i} 
                    href={area.href} 
                    className="block px-5 py-2.5 text-sm font-medium text-zinc-200 hover:text-[#dfab31] hover:bg-zinc-900/80 transition-colors"
                  >
                    {area.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('services')}
                className="flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap text-zinc-200 hover:text-white py-1.5 focus:outline-none transition-colors"
              >
                Services <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#dfab31]" />
              </button>
              <div className="absolute left-0 mt-1 min-w-[320px] bg-zinc-950 border border-zinc-800/90 rounded-md shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {serviceLinks.map((service, i) => (
                  <Link 
                    key={i} 
                    href={service.href} 
                    className="block px-5 py-2.5 text-sm font-medium text-zinc-200 hover:text-[#dfab31] hover:bg-zinc-900/80 transition-colors whitespace-nowrap"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* News */}
            <Link 
              href="/news" 
              className={`text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                isNewsActive 
                  ? 'text-[#dfab31] border-b-2 border-[#dfab31] pb-1' 
                  : 'text-zinc-200 hover:text-[#dfab31] py-1.5'
              }`}
            >
              News
            </Link>

            {/* Careers Hover Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('careers')}
                className={`flex items-center gap-1 text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap py-1.5 focus:outline-none transition-colors ${
                  isCareersActive 
                    ? 'text-[#dfab31] border-b-2 border-[#dfab31] pb-1' 
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                Careers <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#dfab31] transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-[380px] bg-[#0c0c0f]/98 backdrop-blur-xl border border-zinc-800/90 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(223,171,49,0.12)] p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 divide-y divide-zinc-800/60">
                <div className="pb-1.5 px-2.5 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#dfab31] font-semibold">
                    Opportunities at Justica
                  </span>
                </div>
                
                <div className="pt-1.5 space-y-1">
                  {careerLinks.map((item, i) => {
                    const IconComp = item.icon
                    const isCurrent = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={i}
                        href={item.href}
                        className={`flex items-start gap-3.5 p-3 rounded-lg transition-all duration-200 group/item ${
                          isCurrent 
                            ? 'bg-[#dfab31]/15 border border-[#dfab31]/40' 
                            : 'hover:bg-zinc-900/90 border border-transparent hover:border-zinc-800'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#dfab31]/12 text-[#dfab31] flex items-center justify-center shrink-0 group-hover/item:bg-[#dfab31] group-hover/item:text-black transition-colors duration-300 shadow-xs mt-0.5">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-white group-hover/item:text-[#dfab31] transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 group-hover/item:bg-[#dfab31]/20 group-hover/item:text-[#dfab31] transition-colors border border-zinc-700/50 shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 font-light mt-1 line-clamp-2 group-hover/item:text-zinc-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Appointment */}
            <Link 
              href="/appointment" 
              className={`text-[14px] xl:text-[15px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                isAppointmentActive 
                  ? 'text-[#dfab31] border-b-2 border-[#dfab31] pb-1' 
                  : 'text-zinc-200 hover:text-[#dfab31] py-1.5'
              }`}
            >
              Appointment
            </Link>
          </nav>

          {/* Help Line & Consult Now Section */}
          <div className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 text-left shrink-0">
            <div className="flex items-center space-x-2.5">
              <Phone className="w-5 h-5 text-[#dfab31] flex-shrink-0" />
              <div>
                <span className="block text-[10px] xl:text-[11px] text-zinc-400 uppercase tracking-wider font-mono font-bold">
                  Need Help?
                </span>
                <a href="tel:12003009000" className="block text-sm xl:text-base font-bold text-zinc-100 hover:text-[#dfab31] transition-colors whitespace-nowrap">
                  1 200 300 9000
                </a>
              </div>
            </div>

            <Link
              href="/appointment"
              className="bg-[#dfab31] hover:bg-[#c99522] text-zinc-950 font-bold px-3.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm flex items-center gap-1.5 shadow-[0_4px_18px_rgba(223,171,49,0.25)] hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap group"
            >
              Consult Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#dfab31] transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-zinc-200" /> : <Menu className="w-6 h-6 text-zinc-200" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown (ENLARGED FONT SIZES) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d0f] border-t border-zinc-900 px-5 py-6 space-y-4 animate-in slide-in-from-top duration-300">
            <div className="space-y-2">
              <Link 
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full py-2.5 text-xl font-bold text-left border-b transition-colors ${
                  isHomeActive 
                    ? 'text-[#dfab31] border-[#dfab31]' 
                    : 'text-zinc-200 hover:text-[#dfab31] border-zinc-900'
                }`}
              >
                Home
              </Link>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleDropdown('mob-about')}
                className={`w-full flex justify-between items-center py-2.5 text-xl font-bold text-left focus:outline-none border-b transition-colors ${
                  isAboutActive 
                    ? 'text-[#dfab31] border-[#dfab31]' 
                    : 'text-zinc-200 hover:text-[#dfab31] border-zinc-900'
                }`}
              >
                About <ChevronDown className={`w-5 h-5 ${isAboutActive ? 'text-[#dfab31]' : 'text-zinc-400'}`} />
              </button>
              {activeDropdown === 'mob-about' && (
                <div className="pl-4 py-2 space-y-2 bg-zinc-950/60 rounded-md">
                  {aboutLinks.map((item, i) => {
                    const isSubActive = pathname === item.href
                    return (
                      <Link 
                        key={i} 
                        href={item.href} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className={`block py-2.5 text-base font-medium transition-colors ${
                          isSubActive 
                            ? 'text-[#dfab31] font-bold' 
                            : 'text-zinc-300 hover:text-[#dfab31]'
                        }`}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleDropdown('mob-expertise')}
                className="w-full flex justify-between items-center py-2.5 text-xl font-bold text-zinc-200 hover:text-[#dfab31] text-left focus:outline-none border-b border-zinc-900"
              >
                Area of Expertise <ChevronDown className="w-5 h-5 text-zinc-400" />
              </button>
              {activeDropdown === 'mob-expertise' && (
                <div className="pl-4 py-2 space-y-2 bg-zinc-950/60 rounded-md">
                  {expertiseAreas.map((area, i) => (
                    <Link 
                      key={i} 
                      href={area.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="block py-2.5 text-base font-medium text-zinc-300 hover:text-[#dfab31]"
                    >
                      {area.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleDropdown('mob-services')}
                className="w-full flex justify-between items-center py-2.5 text-xl font-bold text-zinc-200 hover:text-[#dfab31] text-left focus:outline-none border-b border-zinc-900"
              >
                Services <ChevronDown className="w-5 h-5 text-zinc-400" />
              </button>
              {activeDropdown === 'mob-services' && (
                <div className="pl-4 py-2 space-y-2 bg-zinc-950/60 rounded-md">
                  {serviceLinks.map((service, i) => (
                    <Link 
                      key={i} 
                      href={service.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="block py-2.5 text-base font-medium text-zinc-300 hover:text-[#dfab31]"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/news" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-2.5 text-xl font-bold border-b transition-colors ${
                isNewsActive 
                  ? 'text-[#dfab31] border-[#dfab31]' 
                  : 'text-zinc-200 hover:text-[#dfab31] border-zinc-900'
              }`}
            >
              News
            </Link>

            {/* Mobile Careers */}
            <div className="space-y-2">
              <button 
                onClick={() => toggleDropdown('mob-careers')}
                className="w-full flex justify-between items-center py-2.5 text-xl font-bold text-zinc-200 hover:text-[#dfab31] text-left focus:outline-none border-b border-zinc-900"
              >
                Careers <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${activeDropdown === 'mob-careers' ? 'rotate-180 text-[#dfab31]' : ''}`} />
              </button>
              {activeDropdown === 'mob-careers' && (
                <div className="pl-3 py-2 space-y-2.5 bg-zinc-950/70 border-l-2 border-[#dfab31] rounded-r-lg my-1">
                  {careerLinks.map((item, i) => {
                    const IconComp = item.icon
                    return (
                      <Link 
                        key={i} 
                        href={item.href} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="flex items-start gap-3 p-2 rounded hover:bg-zinc-900 text-zinc-300 hover:text-[#dfab31]"
                      >
                        <div className="w-8 h-8 rounded bg-[#dfab31]/15 text-[#dfab31] flex items-center justify-center shrink-0 mt-0.5">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-base flex items-center gap-2">
                            {item.title}
                            <span className="text-[10px] font-mono text-[#dfab31]">{item.category}</span>
                          </div>
                          <div className="text-xs text-zinc-400 font-light mt-0.5">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <Link 
              href="/appointment" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-2.5 text-xl font-bold border-b transition-colors ${
                isAppointmentActive 
                  ? 'text-[#dfab31] border-[#dfab31]' 
                  : 'text-zinc-200 hover:text-[#dfab31] border-zinc-900'
              }`}
            >
              Appointment
            </Link>
            
            <div className="pt-4 flex items-center space-x-3.5">
              <Phone className="w-6 h-6 text-[#dfab31]" />
              <div>
                <span className="block text-xs text-zinc-400 uppercase tracking-widest font-mono font-bold">24/7 Helpline</span>
                <a href="tel:12003009000" className="block text-xl font-extrabold text-zinc-100">1 200 300 9000</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
